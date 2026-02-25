import { getPostBySlug, getBlogPosts } from "@/lib/vault";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from 'next';
import ZonedTime from "@/components/ZonedTime";

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
            <article className="prose dark:prose-invert prose-stone max-w-none">
                <MDXRemote source={post.content} />
            </article>
            {post.metadata.tags && (
                <>
                    <hr className="w-full border-stone-100 dark:border-stone-800 my-10" />
                    <div className="flex gap-2 mt-1">
                        {post.metadata.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-sm 
                                            bg-brand/5 dark:bg-brand/10 
                                            text-muted-foreground text-sm font-medium
                                            border border-brand/5 dark:border-brand/20"
                            >
                                {/* Use brand color for the '#' to make it an anchor */}
                                <span className="text-brand/50 mr-0.5 font-bold">#</span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}