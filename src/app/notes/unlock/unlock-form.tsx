'use client';

import { useActionState } from 'react';
import { unlockNotes, type UnlockState } from '@/app/notes/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialState: UnlockState = {};

export function UnlockForm() {
    const [state, formAction, pending] = useActionState(unlockNotes, initialState);

    return (
        <form action={formAction} className="mt-8 space-y-4 max-w-sm">
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-muted-foreground">
                    Password
                </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    disabled={pending}
                />
            </div>
            {state.error && (
                <p className="text-sm text-destructive" role="alert">
                    {state.error}
                </p>
            )}
            <Button type="submit" disabled={pending}>
                {pending ? 'Unlocking…' : 'Unlock drafts'}
            </Button>
        </form>
    );
}
