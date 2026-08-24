import { getPostBySlug, getBlogPosts } from "@/lib/vault";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import ZonedTime from "@/components/zoned-time";
import MdxArticle from "@/components/mdx-article";
import { isNotesUnlocked } from "@/lib/notes-auth";

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post || (post.metadata.draft && !(await isNotesUnlocked()))) {
        return { title: 'Not Found', robots: { index: false, follow: false } };
    }

    return {
        title: post.metadata.title,
        description: post.metadata.description,
        robots: post.metadata.draft ? { index: false, follow: false } : undefined,
        openGraph: {
            title: post.metadata.title,
            description: post.metadata.description,
        },
    };
}

// Allow on-demand render for draft slugs (not in generateStaticParams).
export const dynamicParams = true;

export function generateStaticParams() {
    // Only public posts are pre-rendered — drafts must never ship as static HTML.
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    if (post.metadata.draft && !(await isNotesUnlocked())) {
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
                    {post.metadata.draft && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/80" />
                            <span className="text-xs tracking-wide uppercase">Draft</span>
                        </>
                    )}
                </div>
            </header>
            <MdxArticle source={post.content} className="max-w-prose" />
            {post.metadata.tags && (
                <>
                    <hr className="w-full border-stone-300 dark:border-stone-600 my-10" />
                    <div className="flex gap-3 mt-1 flex-wrap">
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
