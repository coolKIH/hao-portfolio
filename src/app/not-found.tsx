import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-start justify-center py-20">
            <h2 className="text-2xl font-bold text-foreground">
                404 – Page Not Found
            </h2>
            <p className="mt-4 text-muted-foreground">
                Sorry, the page you are looking for might have been moved, deleted, or never existed.
            </p>
            <Link
                href="/"
                className="mt-12 text-sm font-medium hover:underline text-foreground hover:text-foreground"
            >
                ← Back to Home
            </Link>
        </div>
    );
}