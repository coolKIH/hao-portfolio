import type { Metadata } from 'next';
import { UnlockForm } from './unlock-form';
import {
    isNotesPasswordConfigured,
    isNotesUnlocked,
} from '@/lib/notes-auth';
import { lockNotes } from '@/app/notes/actions';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Unlock drafts',
    robots: { index: false, follow: false },
};

export default async function UnlockNotesPage() {
    if (!isNotesPasswordConfigured()) {
        return (
            <div className="max-w-prose">
                <h1 className="text-3xl font-semibold text-foreground">Unlock drafts</h1>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                    Set <code className="text-sm">NOTES_PASSWORD</code> in the environment
                    (and optionally <code className="text-sm">NOTES_SESSION_SECRET</code>)
                    to enable private draft notes.
                </p>
            </div>
        );
    }

    if (await isNotesUnlocked()) {
        return (
            <div className="max-w-prose">
                <h1 className="text-3xl font-semibold text-foreground">Drafts unlocked</h1>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                    You can see draft notes on the Notes list. Lock again when you are done.
                </p>
                <form action={lockNotes} className="mt-8">
                    <Button type="submit" variant="outline">
                        Lock drafts
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-prose">
            <h1 className="text-3xl font-semibold text-foreground">Unlock drafts</h1>
            <p className="mt-3 text-muted-foreground leading-relaxed">
                Enter your notes password to read private drafts on this device.
                Public notes stay public; drafts stay hidden for everyone else.
            </p>
            <UnlockForm />
        </div>
    );
}
