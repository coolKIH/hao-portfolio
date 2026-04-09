import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx-components";

export default function MdxArticle({ source, className }: { source: string; className?: string }) {
    return (
        <article className={cn(
            "prose dark:prose-invert prose-stone max-w-none",
            "[&_code::before]:content-none [&_code::after]:content-none",
            "[&_:not(pre)>code]:bg-stone-200/50",
            "dark:[&_:not(pre)>code]:bg-white/10",
            "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
            "dark:[&_:not(pre)>code]:text-white/90 [&_:not(pre)>code]:font-medium",
            className
        )}>
            <MDXRemote source={source} components={mdxComponents} />
        </article>
    );
}
