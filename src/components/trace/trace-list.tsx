import ZonedTime from "@/components/zoned-time";
import { Footprint } from "./types";

export function TraceList({ messages }: { messages: Footprint[] }) {
    if (messages.length === 0) return (
        <div className="mt-12 max-w-xl rounded-sm border border-stone-200 dark:border-stone-800 p-12 text-center text-muted-foreground/60">
            <p className="font-medium italic">The sands are currently empty.</p>
            <p className="mt-2 text-sm tracking-wide">
                Be the first to leave a trace in this week&lsquo;s history.
            </p>
        </div>
    );

    return (
        <div className="space-y-12 max-w-xl">
            <div className="flex justify-center pb-6">
                <div className="h-px w-24 bg-linear-to-r from-transparent via-stone-400 dark:via-stone-600 to-transparent" />
            </div>
            <div className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
                {messages.map((msg) => (
                    <article
                        key={msg.id}
                        className="py-10 first:pt-0 animate-in fade-in slide-in-from-bottom-2 duration-1000 ease-out fill-mode-both"
                    >
                        <div className="flex items-center gap-2 text-sm text-muted-foreground/70 mb-3">
                            <span className="font-medium text-foreground/60">
                                {msg.nickname || "anonymous"}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                            <ZonedTime dateStr={msg.created_at} mode="datetime" />
                        </div>
                        <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                            {msg.content}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    );
}