import Link from "next/link";
import { getBlogPosts } from "@/lib/vault";
import type { Metadata } from 'next'

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
    title: 'Blog',
}

export default async function Blog({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const allPosts = await getBlogPosts();
    const { page } = await searchParams;

    const currentPage = Number(page) || 1;
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    const posts = allPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <div className="space-y-4">
            <div className="mb-16">
                <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">我的文章</h1>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">记录一些关于技术、骑行与生活的瞬间。</p>
            </div>

            <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
                {posts.map((post) => (
                    <article key={post.slug} className="group flex flex-col items-start py-6 first:pt-0">
                        {/* date and location */}
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                            {post.location && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-zinc-400" />
                                    <span>{post.location}</span>
                                </>
                            )}
                        </div>

                        {/* title */}
                        <h2 className="mt-0.5 text-xl font-semibold text-zinc-800 group-hover:text-black hover:underline dark:text-zinc-100 dark:group-hover:text-white">
                            <Link href={`/blog/${post.slug}`}>
                                <span>{post.title}</span>
                            </Link>
                        </h2>

                        {/* Preview description */}
                        {post.description && (
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-2 mt-2">
                                {post.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 gap-x-16">
                    {/* Past Link (Going back in time) */}
                    {currentPage < totalPages && (
                        <Link
                            href={`/blog?page=${currentPage + 1}`}
                            className="group flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <span className="transition-transform group-hover:-translate-x-1">←</span>
                            <span className="text-sm">过去</span>
                        </Link>
                    )}

                    {/* Future Link (Coming back to the present) */}
                    {currentPage > 1 && (
                        <Link
                            href={`/blog?page=${currentPage - 1}`}
                            className="group flex items-center gap-2 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                        >
                            <span className="text-sm">未来</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}
