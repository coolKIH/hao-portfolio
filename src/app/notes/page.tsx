import { getBlogPosts } from "@/lib/vault";
import type { Metadata } from 'next'
import { BlogList } from "@/components/blog-list";

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
    title: 'Notes',
    description: 'Notes and reflections on engineering and life.',
    openGraph: {
        title: "Notes | Hao's World",
        description: 'Notes and reflections on engineering and life.',
    },
}

export default function Notes() {
    const allPosts = getBlogPosts();
    const posts = allPosts.slice(0, POSTS_PER_PAGE);

    return <BlogList posts={posts} currentPage={1} totalPosts={allPosts.length} />;
}
