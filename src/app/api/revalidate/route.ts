import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * Next.js Revalidation API with Bearer Token
 */
export async function POST(request: NextRequest) {
    // 1. Get the 'Authorization' header
    const authHeader = request.headers.get('Authorization');

    // 2. Validate Bearer scheme and token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
            { message: 'Missing or invalid Authorization header' },
            { status: 401 }
        );
    }

    const token = authHeader.split(' ')[1];

    // 3. Constant-time comparison (if possible) or direct check
    if (token !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { message: 'Unauthorized: Incorrect token' },
            { status: 401 }
        );
    }

    try {
        revalidateTag('vault-content', 'max');

        return NextResponse.json({
            revalidated: true,
            tag: 'vault-content',
            now: Date.now()
        });
    } catch (err) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}