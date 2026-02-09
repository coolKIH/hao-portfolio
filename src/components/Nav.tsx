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
        <nav className="flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={
                        pathname === link.href
                            ? "font-semibold text-black dark:text-zinc-50"
                            : ""
                    }
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}
