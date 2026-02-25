"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
/* We use buttonVariants to keep font sizes and link behaviors consistent */
import { buttonVariants } from "@/components/ui/button";

export function Nav() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "HOME", matchRule: /^\/$/ },
        { href: "/about", label: "ABOUT", matchRule: /^\/about$/ },
        { href: "/projects", label: "PROJECTS", matchRule: /^\/projects$/ },
        { href: "/blog", label: "BLOG", matchRule: /^\/blog(\/[^/]+)?$/ },
    ];

    return (
        <nav className="flex items-center gap-8">
            {links.map((link) => {
                const isActive = link.matchRule.test(pathname);

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            /* Base styles from shadcn, but we reset background hover effects */
                            buttonVariants({ variant: "ghost", size: "sm" }),
                            "relative px-0 py-1 h-auto hover:bg-transparent transition-all duration-300",
                            /* Typography refinement: 
                               1. tracking-widest: adds the "breath" between letters.
                               2. text-xs: smaller text often looks more elegant for nav.
                               3. font-medium: provides enough weight to read easily.
                            */
                            "tracking-[0.2em] text-xs font-medium",
                            isActive
                                ? "text-brand" // Use your #441 brand brown
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {link.label}

                        {/* Visual Anchor: 
                            A tiny dot representing your brand's "earthy" essence.
                            The animation adds a subtle 'pop' when switching pages.
                        */}
                        {isActive && (
                            <span
                                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand animate-in fade-in zoom-in duration-500"
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}