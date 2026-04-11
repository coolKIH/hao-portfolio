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
                if (isCancelled) return;
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
        // cancelConnectRef tracks the latest connect() cancel handle.
        // Stored as a plain object (not useRef) since it only lives within this effect.
        const cancelConnectRef = { current: connect() };

        // Records when the tab was hidden, to avoid reconnecting on quick tab switches.
        const hiddenAtRef = { current: 0 };
        const ZOMBIE_THRESHOLD_MS = 30000;

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                hiddenAtRef.current = Date.now();
                return;
            }
            // Only reconnect if the tab was hidden long enough for the OS to have
            // killed the TCP socket — short switches (alt-tab, minimize) are harmless.
            const wasAwayLong = Date.now() - hiddenAtRef.current > ZOMBIE_THRESHOLD_MS;
            if (navigator.onLine && wasAwayLong) {
                setStatus('connecting');
                cancelConnectRef.current();
                cancelConnectRef.current = connect();
            }
        };

        const handleOnline = () => {
            // Coming back online always warrants a reconnect regardless of duration.
            setStatus('connecting');
            cancelConnectRef.current();
            cancelConnectRef.current = connect();
        };

        const handleOffline = () => setStatus('error');

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            cancelConnectRef.current();
            if (socketRef.current) {
                socketRef.current.onclose = null;
                socketRef.current.close();
            }
            if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
            if (ackTimeoutRef.current) clearTimeout(ackTimeoutRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('online', handleOnline);
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