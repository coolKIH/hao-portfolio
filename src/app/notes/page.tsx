import { getBlogPosts } from "@/lib/vault";
import type { Metadata } from 'next'
import { BlogList } from "@/components/blog-list";
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

export default async function Notes() {
    const unlocked = await isNotesUnlocked();
    const allPosts = getBlogPosts({ includeDrafts: unlocked });
    const posts = allPosts.slice(0, POSTS_PER_PAGE);

    return (
        <>
            <NotesUnlockStatus unlocked={unlocked} />
            <BlogList posts={posts} currentPage={1} totalPosts={allPosts.length} />
        </>
    );
}
