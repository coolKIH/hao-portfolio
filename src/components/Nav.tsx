"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "首页" },
        { href: "/about", label: "关于" },
        { href: "/projects", label: "项目" },
        { href: "/blog", label: "博客" },
    ];

    return (
        <nav className="flex gap-8 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => {
                const isActive =
                    link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);

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
