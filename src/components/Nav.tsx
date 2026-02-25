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
        <nav className="flex gap-8 text-sm text-muted-foreground">
            {links.map((link) => {
                const isActive = link.matchRule.test(pathname);

                return <Link
                    key={link.href}
                    href={link.href}
                    className={
                        isActive
                            ? "font-semibold text-foreground transition-colors"
                            : "hover:text-foreground transition-colors"
                    }
                >
                    {link.label}
                </Link>
            })}
        </nav>
    );
}
