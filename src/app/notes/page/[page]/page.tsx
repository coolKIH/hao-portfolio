import { getBlogPosts } from "@/lib/vault";
import type { Metadata } from 'next'
import { BlogList } from "@/components/blog-list";
import { notFound, redirect } from "next/navigation";
import { isNotesUnlocked } from "@/lib/notes-auth";
import { NotesUnlockStatus } from "@/components/notes-unlock-status";

const POSTS_PER_PAGE = 6;

export const metadata: Metadata = {
    title: 'Notes',
    description: 'Notes and reflections on engineering and life.',
    openGraph: {
        title: "Notes | Hao's World",
        description: 'Notes and reflections on engineering and life.',
    },
}

export function generateStaticParams() {
    // Public pages only — draft count must not affect static pagination.
    const allPosts = getBlogPosts();
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
        page: String(i + 2),
    }));
}

export default async function NotesPage({
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
        redirect('/notes');
    }

    const unlocked = await isNotesUnlocked();
    const allPosts = getBlogPosts({ includeDrafts: unlocked });
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

    if (pageNum > totalPages) {
        notFound();
    }

    const posts = allPosts.slice(
        (pageNum - 1) * POSTS_PER_PAGE,
        pageNum * POSTS_PER_PAGE
    );

    return (
        <>
            <NotesUnlockStatus unlocked={unlocked} />
            <BlogList posts={posts} currentPage={pageNum} totalPosts={allPosts.length} />
        </>
    );
}
