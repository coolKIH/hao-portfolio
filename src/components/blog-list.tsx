import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                <h1 className="text-4xl font-semibold text-foreground">Writing</h1>
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
                <div className="flex items-center justify-center mt-12 gap-2">
                    {currentPage < totalPages && (
                        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground hover:text-foreground">
                            <Link href={`/blog/page/${currentPage + 1}`}>
                                <ChevronLeft className="h-4 w-4" />
                                Older
                            </Link>
                        </Button>
                    )}

                    {currentPage > 1 && (
                        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground hover:text-foreground">
                            <Link href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}>
                                Newer
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}