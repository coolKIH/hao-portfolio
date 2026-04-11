'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils";
import { ConnectionStatus } from "./types";
import { SendHorizonal } from "lucide-react";


interface TraceFormProps {
    // Parent now receives the reset callback to execute on 'ACK'
    onSubmit: (content: string, nickname: string, onSuccess: () => void) => void;
    status: ConnectionStatus;
    isSubmitting: boolean;
}

const MAX_LENGTH = 200;

export function TraceForm({ onSubmit, status, isSubmitting }: TraceFormProps) {
    const [input, setInput] = useState('');
    const [nickname, setNickname] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize ONLY when focused
    useEffect(() => {
        const el = textareaRef.current;
        if (!el || !isFocused) return;

        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight + 2}px`;
    }, [input, isFocused]);

    /**
     * Resets the form to its initial state.
     * This is passed to the parent and called only on successful server ACK.
     */
    const resetForm = () => {
        setInput('');
        setNickname('');
        setIsFocused(false);

        // reset height and blur after submit
        if (textareaRef.current) {
            textareaRef.current.style.height = '';
            textareaRef.current.blur();
        }
    };

    const handleInternalSubmit = (e?: React.SubmitEvent) => {
        e?.preventDefault();

        // Only submit if it's not empty, connected, and not already sending
        if (!input.trim() || status !== 'connected' || isSubmitting) return;

        // Trigger parent submission and provide the reset callback
        onSubmit(input.trim(), nickname.trim(), resetForm);
    };

    const handleCancel = () => {
        if (isSubmitting) return;
        resetForm();
    };

    const charCount = input.length;
    const isNearLimit = charCount > MAX_LENGTH * 0.8;

    return (
        <section className="flex flex-col gap-8">
            <form onSubmit={handleInternalSubmit} className="relative max-w-xl">

                {/* Textarea Container */}
                <div
                    className={cn(
                        "relative transition-all duration-200",
                        isFocused
                            ? "border-foreground"
                            : "border-stone-200 dark:border-stone-800"
                    )}
                >
                    <Textarea
                        ref={textareaRef}
                        name="message"
                        placeholder={isSubmitting ? "Posting your trace..." : "Leave your trace..."}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        maxLength={MAX_LENGTH}
                        rows={1}
                        disabled={status !== 'connected' || isSubmitting}
                        className={cn(
                            "w-full resize-none bg-transparent shadow-none outline-none transition-all duration-200 min-h-0 py-3",
                            isFocused ? "focus:placeholder:not-italic" : "placeholder:italic",
                            isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                        style={{ transition: 'height 0.1s ease' }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                e.preventDefault();
                                if (input.trim() && status === 'connected' && !isSubmitting) {
                                    handleInternalSubmit();
                                }
                            } else if (e.key === 'Escape') {
                                e.preventDefault();
                                handleCancel();
                            }
                        }}
                    />

                    {/* Floating Character Counter */}
                    <div
                        className={cn(
                            "absolute right-1 -bottom-5 text-xs transition-opacity duration-200",
                            isFocused && !isSubmitting
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        )}
                    >
                        <span
                            className={cn(
                                charCount === MAX_LENGTH
                                    ? "text-red-500"
                                    : isNearLimit
                                        ? "text-orange-500 dark:text-orange-200"
                                        : "text-muted-foreground/60"
                            )}
                        >
                            {charCount}/{MAX_LENGTH}
                        </span>
                    </div>
                </div>

                {/* Expanded Controls */}
                <div
                    className={cn(
                        "flex flex-col md:flex-row items-stretch md:items-center mt-8 transition-all duration-300 gap-4 md:gap-6",
                        isFocused
                            ? "max-h-32 opacity-100"
                            : "max-h-0 opacity-0 pointer-events-none"
                    )}
                >
                    {/* Nickname: Full width on mobile, fixed width on desktop */}
                    <Input
                        placeholder="Your nickname (Optional)"
                        className="w-full md:w-48"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        maxLength={50}
                        disabled={status !== 'connected' || isSubmitting}
                    />

                    {/* Actions: Space-between on mobile, end-aligned on desktop */}
                    <div className="flex items-center justify-between flex-row-reverse md:flex-row md:justify-between md:flex-1 gap-6">
                        <Button
                            type="submit"
                            disabled={!input.trim() || status !== 'connected' || isSubmitting}
                            className="flex-1 md:flex-none md:w-48"
                        >
                            {isSubmitting ? "Posting..." : "Post trace"}
                            <SendHorizonal className="ml-2" />
                        </Button>
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={handleCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
}