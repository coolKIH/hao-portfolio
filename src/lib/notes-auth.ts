import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const NOTES_UNLOCK_COOKIE = 'notes_unlock';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sessionSecret(): string | null {
    return process.env.NOTES_SESSION_SECRET || process.env.NOTES_PASSWORD || null;
}

export function isNotesPasswordConfigured(): boolean {
    return Boolean(process.env.NOTES_PASSWORD);
}

function signPayload(payload: string): string {
    const secret = sessionSecret();
    if (!secret) return '';
    return createHmac('sha256', secret).update(payload).digest('base64url');
}

/** Create a signed unlock token for the httpOnly cookie. */
export function createUnlockToken(): string {
    const payload = `1.${Date.now()}`;
    return `${payload}.${signPayload(payload)}`;
}

export function verifyUnlockToken(token: string | undefined): boolean {
    if (!token || !sessionSecret()) return false;

    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [version, timestamp, signature] = parts;
    if (version !== '1' || !timestamp || !signature) return false;
    if (!/^\d+$/.test(timestamp)) return false;

    const payload = `${version}.${timestamp}`;
    const expected = signPayload(payload);

    try {
        const a = Buffer.from(signature);
        const b = Buffer.from(expected);
        if (a.length !== b.length) return false;
        return timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

export function passwordsMatch(provided: string): boolean {
    const expected = process.env.NOTES_PASSWORD;
    if (!expected) return false;

    const a = Buffer.from(provided);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    try {
        return timingSafeEqual(a, b);
    } catch {
        return false;
    }
}

export async function isNotesUnlocked(): Promise<boolean> {
    if (!isNotesPasswordConfigured()) return false;
    const jar = await cookies();
    return verifyUnlockToken(jar.get(NOTES_UNLOCK_COOKIE)?.value);
}

export function unlockCookieOptions(token: string) {
    return {
        name: NOTES_UNLOCK_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: COOKIE_MAX_AGE_SECONDS,
    };
}

export function lockCookieOptions() {
    return {
        name: NOTES_UNLOCK_COOKIE,
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 0,
    };
}
