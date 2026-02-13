import { getPostBySlug, getBlogPosts } from "@/lib/vault";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from 'next'

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found"
        };
    }

    return {
        title: post.metadata.title
    };
}

export default async function PostPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">
                    {post.metadata.title}
                </h1>
                {/* date and location */}
                <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.metadata.date}>
                        {new Date(post.metadata.date).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </time>
                    {post.metadata.location && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-zinc-400" />
                            <span>{post.metadata.location}</span>
                        </>
                    )}
                </div>
            </header>
            <article className="prose dark:prose-invert prose-zinc max-w-none">
                <MDXRemote source={post.content} />
            </article>
            {post.metadata.tags && (
                <>
                    <hr className="w-full border-zinc-100 dark:border-zinc-800 mb-6" />
                    <div className="flex gap-2 mt-1">
                        {post.metadata.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 
                                       text-zinc-500 dark:text-zinc-400 text-sm font-medium"
                            >
                                <span className="opacity-50 mr-0.5">#</span>
                                {tag}
                            </span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
