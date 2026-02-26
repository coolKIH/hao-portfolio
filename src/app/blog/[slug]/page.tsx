import { getPostBySlug, getBlogPosts } from "@/lib/vault";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from 'next';
import ZonedTime from "@/components/ZonedTime";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found" };
    }

    return { title: post.metadata.title };
}

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    {post.metadata.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <ZonedTime dateStr={post.metadata.date} mode="datetime"></ZonedTime>
                    {post.metadata.location && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/80" />
                            <span>{post.metadata.location}</span>
                        </>
                    )}
                </div>
            </header>
            <article className={cn(
                /* Base Typography Setup */
                "prose dark:prose-invert prose-stone max-w-none",

                /* Remove default typography backticks from all code elements */
                "[&_code::before]:content-none [&_code::after]:content-none",

                /* Style inline code ONLY (excludes code blocks inside <pre>) */
                /* Light mode background */
                "[&_:not(pre)>code]:bg-stone-200/50",
                /* Dark mode: Semi-transparent white 'glass' effect */
                "dark:[&_:not(pre)>code]:bg-white/10",

                /* Fine-tune inline code appearance */
                "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
                "dark:[&_:not(pre)>code]:text-white/90 [&_:not(pre)>code]:font-medium"
            )}>
                <MDXRemote source={post.content} />
            </article>
            {post.metadata.tags && (
                <>
                    <hr className="w-full border-stone-300 dark:border-stone-600 my-10" />
                    <div className="flex gap-3 mt-1">
                        {post.metadata.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-sm 
                                            bg-brand/5 dark:bg-brand/10 
                                            text-muted-foreground text-sm font-medium
                                            border border-brand/5 dark:border-brand/10"
                            >
                                {/* Use brand color for the '#' to make it an anchor */}
                                <span className="text-brand/50 mr-1 font-bold">#</span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}