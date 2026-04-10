'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { TraceHeader } from './trace/trace-header';
import { TraceForm } from './trace/trace-form';
import { TraceList } from './trace/trace-list';
import { Footprint, ConnectionStatus } from './trace/types';

export default function TraceClient({ initialData }: { initialData: Footprint[] }) {
    const [messages, setMessages] = useState<Footprint[]>(initialData);
    const [status, setStatus] = useState<ConnectionStatus>('connecting');
    const [serverError, setServerError] = useState<string | null>(null);

    // UI state for the transaction lifecycle
    const [isSubmitting, setIsSubmitting] = useState(false);

    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);
    const ackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Tracks the current message nonce to ensure we only ACK our own actions
    const pendingNonceRef = useRef<string | null>(null);
    // Stores the reset callback provided by the form for the current transaction
    const onSuccessRef = useRef<(() => void) | null>(null);

    const connect = useCallback<() => () => void>(() => {
        let isCancelled = false;

        async function executeConnect() {
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);

            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
            }

            setStatus('connecting');

            try {
                // Wake-up call for cold-start environments (like Render free tier)
                await fetch('https://hao-portfolio-socket.onrender.com/', {
                    mode: 'no-cors',
                    signal: AbortSignal.timeout(5000)
                });
            } catch (err) {
                console.warn('Wake-up ping failed:', err);
            }

            if (isCancelled) return;

            const isDev = process.env.NODE_ENV === 'development';
            const accessKey = process.env.NEXT_PUBLIC_SOCKET_ACCESS_KEY;
            const socketUrl = `wss://hao-portfolio-socket.onrender.com${isDev ? `?accessKey=${accessKey}` : ''}`;

            const socket = new WebSocket(socketUrl);
            socketRef.current = socket;

            socket.onopen = () => {
                setStatus('connected');
                setServerError(null);
            };

            socket.onmessage = (event) => {
                try {
                    const payload = JSON.parse(event.data);

                    // 1. Handle Broadcasts
                    if (payload.type === 'HISTORY') {
                        setMessages(payload.data);
                    }

                    if (payload.type === 'NEW_MESSAGE') {
                        setMessages((prev) => [payload.data, ...prev]);
                    }

                    // 2. Handle Transactional ACKs using nonces
                    if (payload.nonce && payload.nonce === pendingNonceRef.current) {
                        if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);

                        if (payload.type === 'ACK') {
                            setIsSubmitting(false); // Success!
                            setServerError(null);
                            // Execute the form reset now that we have server confirmation
                            onSuccessRef.current?.();
                            onSuccessRef.current = null;
                            pendingNonceRef.current = null;
                        }

                        if (payload.type === 'ERROR') {
                            setServerError(payload.message);
                            setIsSubmitting(false); // Unlock so user can edit
                            onSuccessRef.current = null;
                            pendingNonceRef.current = null;
                            setTimeout(() => setServerError(null), 5000);
                        }
                    }
                } catch (err) {
                    console.error("Payload error:", err);
                }
            };

            socket.onclose = () => {
                setStatus('error');
                setIsSubmitting(false);
                reconnectTimerRef.current = setTimeout(executeConnect, 5000);
            };

            socket.onerror = () => {
                setStatus('error');
                setIsSubmitting(false);
            };
        }
        executeConnect();

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        const cancelConnect = connect();

        const handleReactivate = () => {
            const socket = socketRef.current;
            const isDead = !socket ||
                socket.readyState === WebSocket.CLOSED ||
                socket.readyState === WebSocket.CLOSING;

            // Check if we are actually able to connect
            if (document.visibilityState === 'visible' && navigator.onLine) {
                if (isDead) {
                    // Explicitly set status to 'connecting' immediately 
                    // so the UI reflects the attempt to fix the 'error' state.
                    setStatus('connecting');
                    connect();
                } else if (socket.readyState === WebSocket.OPEN) {
                    // If the socket was actually alive but the UI was stuck in error, sync it.
                    setStatus('connected');
                }
            }
        };

        const handleOffline = () => setStatus('error');

        document.addEventListener('visibilitychange', handleReactivate);
        window.addEventListener('online', handleReactivate);
        window.addEventListener('offline', handleOffline);

        return () => {
            cancelConnect();
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
            }
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);
            document.removeEventListener('visibilitychange', handleReactivate);
            window.removeEventListener('online', handleReactivate);
            window.removeEventListener('offline', handleOffline);
        };
    }, [connect]);

    const handleSendMessage = (content: string, nickname: string, onReset: () => void): void => {
        const socket = socketRef.current;

        // 1. Initial State Check
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            setServerError("Connection lost. Please wait for reconnection.");
            return;
        }

        const nonce = Date.now().toString();
        pendingNonceRef.current = nonce;
        onSuccessRef.current = onReset; // Save the callback for the onmessage handler
        setIsSubmitting(true);

        // 2. Set Safety Timeout (Handles "Silent" failures)
        if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);
        ackTimeoutRef.current = setTimeout(() => {
            if (pendingNonceRef.current === nonce) {
                setIsSubmitting(false);
                setServerError("Server response timed out. Please try again.");
                pendingNonceRef.current = null;
                onSuccessRef.current = null;

                // If the connection is a "zombie," closing it triggers our auto-reconnect logic
                if (socket.readyState === WebSocket.OPEN) socket.close();
            }
        }, 8000);

        try {
            // 3. Attempt to push to the network buffer
            socket.send(JSON.stringify({
                type: 'MESSAGE',
                content,
                nickname: nickname || undefined,
                nonce
            }));

            // Clear any previous errors if the send was accepted by the browser
            setServerError(null);
        } catch (err) {
            // 4. Handle "Loud" failures (Immediate feedback)
            console.error("WebSocket Send Exception:", err);

            setIsSubmitting(false);
            pendingNonceRef.current = null;
            onSuccessRef.current = null;

            if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);

            // Inform the user immediately instead of letting them wait for the timeout
            setServerError("Failed to send: The connection was interrupted.");
        }
    };

    return (
        <div className="space-y-4">
            <TraceHeader status={status} error={serverError} />
            <div className="space-y-12">
                <TraceForm
                    onSubmit={handleSendMessage}
                    status={status}
                    isSubmitting={isSubmitting}
                />
                <TraceList messages={messages} />
            </div>
        </div>
    );
}