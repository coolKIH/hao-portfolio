import { getBlogPosts } from "@/lib/vault";
import type { Metadata } from 'next'
import { BlogList } from "@/components/blog-list";
import { notFound, redirect } from "next/navigation";

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
    title: 'Blog',
}

export function generateStaticParams() {
    const allPosts = getBlogPosts();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    return Array.from({ length: totalPages - 1 }, (_, i) => ({
        page: String(i + 2),
    }));
}

export default async function BlogPage({
    params,
}: {
    params: Promise<{ page: string }>;
}) {
    const { page } = await params;
    const pageNum = Number(page);

    if (isNaN(pageNum) || pageNum < 1) {
        notFound();
    }

    if (pageNum === 1) {
        redirect('/blog');
    }

    const allPosts = getBlogPosts();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    if (pageNum > totalPages) {
        notFound();
    }

    const posts = allPosts.slice(
        (pageNum - 1) * POSTS_PER_PAGE,
        pageNum * POSTS_PER_PAGE
    );

    return <BlogList posts={posts} currentPage={pageNum} totalPosts={allPosts.length} />;
}
