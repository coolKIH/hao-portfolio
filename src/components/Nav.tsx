"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
    const pathname = usePathname();

    const links = [
        {
            href: "/",
            label: "首页",
            matchRule: /^\/$/
        },
        {
            href: "/about",
            label: "关于",
            matchRule: /^\/about$/
        },
        {
            href: "/projects",
            label: "项目",
            matchRule: /^\/projects$/
        },
        {
            href: "/blog",
            label: "博客",
            matchRule: /^\/blog(\/[^/]+)?$/
        },
    ];

    return (
        <nav className="flex gap-8 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => {
                const isActive = link.matchRule.test(pathname);

                return <Link
                    key={link.href}
                    href={link.href}
                    className={
                        isActive
                            ? "font-semibold text-black dark:text-zinc-50 transition-colors"
                            : "hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                    }
                >
                    {link.label}
                </Link>
            })}
        </nav>
    );
}
