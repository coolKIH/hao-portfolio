import { lockNotes } from '@/app/notes/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function NotesUnlockStatus({ unlocked }: { unlocked: boolean }) {
    if (!unlocked) return null;

    return (
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>Drafts unlocked on this device.</span>
            <form action={lockNotes}>
                <Button type="submit" variant="ghost" size="xs" className="text-muted-foreground">
                    Lock
                </Button>
            </form>
            <Button variant="ghost" size="xs" asChild className="text-muted-foreground">
                <Link href="/notes/unlock">Manage</Link>
            </Button>
        </div>
    );
}
