'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
    createUnlockToken,
    isNotesPasswordConfigured,
    lockCookieOptions,
    passwordsMatch,
    unlockCookieOptions,
} from '@/lib/notes-auth';

export type UnlockState = {
    error?: string;
};

export async function unlockNotes(
    _prev: UnlockState,
    formData: FormData,
): Promise<UnlockState> {
    if (!isNotesPasswordConfigured()) {
        return { error: 'Notes unlock is not configured on this deployment.' };
    }

    const password = String(formData.get('password') ?? '');
    if (!passwordsMatch(password)) {
        return { error: 'Wrong password.' };
    }

    const jar = await cookies();
    jar.set(unlockCookieOptions(createUnlockToken()));
    redirect('/notes');
}

export async function lockNotes(): Promise<void> {
    const jar = await cookies();
    jar.set(lockCookieOptions());
    redirect('/notes');
}
