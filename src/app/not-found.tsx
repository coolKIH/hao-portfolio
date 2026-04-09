import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
            <h1 className="text-[120px] font-bold leading-none tracking-tighter text-foreground mb-2">
                404
            </h1>

            <p className="text-2xl font-medium text-foreground mb-8">
                Page Not Found
            </p>

            <p className="max-w-sm text-muted-foreground mb-12">
                Sorry, the page you&rsquo;re looking for might have been moved, deleted, or never existed.
            </p>

            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
            </Link>
        </div>
    );
}