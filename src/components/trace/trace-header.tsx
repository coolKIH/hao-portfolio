import { Wifi, Loader, WifiOff } from "lucide-react";
import { ConnectionStatus } from "./types";
import { cn } from "@/lib/utils";

export function TraceHeader({ status, error }: { status: ConnectionStatus; error: string | null }) {
    return (
        <div className="mb-12">
            <h1 className="text-4xl font-semibold text-foreground tracking-tight">Footprints</h1>
            <div className="flex items-baseline gap-2">
                <div
                    className="transition-all duration-1000"
                    title={status === 'connected' ? "Connected to the stream" : status === 'connecting' ? "Awakening..." : "Offline"}
                >
                    {status === 'connected' && (
                        <Wifi size={16} strokeWidth={1.5} className="text-stone-500 dark:text-stone-400 animate-in fade-in zoom-in duration-500" />
                    )}
                    {status === 'connecting' && (
                        <Loader size={16} strokeWidth={1.5} className="text-stone-500 dark:text-stone-400 animate-pulse" />
                    )}
                    {status === 'error' && (
                        <WifiOff size={16} strokeWidth={1.5} className="text-red-500/80" />
                    )}
                </div>
                <p className="mt-2 text-lg text-muted-foreground/80 leading-relaxed max-w-2xl">
                    A collection of moments from those who passed by.
                </p>
            </div>
            {error && (
                <p className={cn(
                    "mt-4 text-xs max-w-xl p-3 text-center rounded-sm leading-relaxed",
                    "animate-in fade-in slide-in-from-left-2 font-medium",
                    // Light Mode: High contrast red on light red
                    "bg-red-100 text-red-600",
                    // Dark Mode: Soft coral/rose text on a very subtle deep red tint
                    "dark:bg-red-500/10 dark:text-red-400"
                )}>
                    {error}
                </p>
            )}
        </div>
    );
}