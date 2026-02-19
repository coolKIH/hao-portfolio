import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Next.js 15 On-demand Revalidation Route
 * This API endpoint clears the data cache for a specific tag.
 */
export async function POST(request: NextRequest) {
    // 1. Extract secret from search parameters for security
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // 2. Validate the secret against environment variables
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { message: 'Unauthorized: Invalid secret' },
            { status: 401 }
        );
    }

    try {
        // 3. Trigger revalidation for the specific cache tag
        // This will mark all fetch requests with 'vault-content' as stale.
        revalidateTag('vault-content', "max");

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: 'vault-content'
        });
    } catch (err) {
        // 4. Handle unexpected errors during revalidation
        console.error('Revalidation error:', err);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}