import Link from "next/link";
import ZonedTime from "@/components/zoned-time";
import type { PostMetadata } from "@/lib/vault";

const POSTS_PER_PAGE = 6;

export function BlogList({
    posts,
    currentPage,
    totalPosts
}: {
    posts: PostMetadata[],
    currentPage: number,
    totalPosts: number
}) {
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    return (
        <div className="space-y-4">
            <div className="mb-16">
                <h1 className="text-3xl font-semibold text-foreground">Writing</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Notes and reflections on engineering and life.
                </p>
            </div>

            <div className="flex flex-col divide-y divide-stone-200 dark:divide-stone-800">
                {posts.map((post) => (
                    <article key={post.slug} className="group flex flex-col items-start py-6 first:pt-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ZonedTime dateStr={post.date} />
                            {post.location && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/80" />
                                    <span>{post.location}</span>
                                </>
                            )}
                        </div>

                        <h2 className="mt-0.5 text-xl font-semibold text-foreground hover:underline">
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h2>

                        {post.description && (
                            <p className="text-foreground/80 leading-relaxed line-clamp-2 mt-2">
                                {post.description}
                            </p>
                        )}
                    </article>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-12 gap-x-16">
                    {currentPage < totalPages && (
                        <Link
                            href={`/blog/page/${currentPage + 1}`}
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span className="transition-transform group-hover:-translate-x-1">←</span>
                            <span className="text-sm">Older Posts</span>
                        </Link>
                    )}

                    {currentPage > 1 && (
                        <Link
                            href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
                            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span className="text-sm">Newer Posts</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}