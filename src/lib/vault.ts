import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'vault/blog');

// --- Type Definitions ---
export interface PostMetadata {
    slug: string;
    title: string;
    date: string;
    location?: string;
    description?: string;
    tags?: string[];
    visibility: 'public' | 'private';
}

/**
 * Internal Cache: Persists only during production warm-start periods.
 * Prevents redundant File IO operations within the same server instance.
 */
let postsCache: PostMetadata[] | null = null;

/**
 * Regex to validate if a slug is safe and strictly follows the naming convention.
 * Rules:
 * - Only allows letters (a-z, A-Z), numbers (0-9), 
 * hyphens (-), and underscores (_).
 */
const slugRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Core Parser: Converts raw gray-matter data into a strict PostMetadata object.
 */
function parseMetadata(fileName: string, rawData: any): PostMetadata {
    return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: rawData.title || 'Untitled',
        // Standardize date format for consistent sorting
        date: rawData.date ? new Date(rawData.date).toISOString() : new Date().toISOString(),
        location: rawData.location || undefined,
        description: rawData.description || undefined,
        // Handle tags as either string or array
        tags: Array.isArray(rawData.tags) ? rawData.tags : (rawData.tags ? [rawData.tags] : undefined),
        visibility: rawData.visibility === 'public' ? 'public' : 'private',
    };
}

/**
 * Retrieves all public blog post metadata with caching and performance optimization.
 */
export function getBlogPosts(): PostMetadata[] {
    // 1. Production cache check
    if (postsCache && process.env.NODE_ENV === 'production') {
        return postsCache;
    }

    if (!fs.existsSync(BLOG_PATH)) return [];

    const files = fs.readdirSync(BLOG_PATH);

    /**
     * 2. Optimize using flatMap instead of multiple map/filter calls.
     * This reduces the creation of intermediate arrays and memory overhead.
     */
    const posts: PostMetadata[] = files.flatMap((fileName) => {
        // 1. Filter by extension
        if (!fileName.endsWith('.mdx')) return [];

        try {
            const fullPath = path.join(BLOG_PATH, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);
            const metadata = parseMetadata(fileName, data);

            // 2. Filter by visibility
            return metadata.visibility === 'public' ? [metadata] : [];
        } catch (error) {
            console.error(`Error parsing MDX file ${fileName}:`, error);
            return []; // Skip this file on error
        }
    });

    // 3. Sort by date descending
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // 4. Update memory cache
    postsCache = sortedPosts;
    return sortedPosts;
}

/**
 * Fetches the most recent posts. 
 * Benefits from static pre-rendering as data is determined at build time.
 */
export function getLatestPosts(limit: number = 5): PostMetadata[] {
    const allPosts = getBlogPosts();
    return allPosts.slice(0, limit);
}

/**
 * Retrieves a post by its slug from the local vault.
 * Returns null if the slug is invalid or the file does not exist.
 */
export function getPostBySlug(slug: string) {
    // 1. Fail-Fast: Reject malformed or suspicious slugs immediately
    if (!slug || !slugRegex.test(slug)) {
        console.warn(`Invalid slug blocked: ${JSON.stringify(slug)}`);
        return null;
    }

    const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);

    try {
        // 2. Only proceed to I/O if the slug passes validation
        if (!fs.existsSync(fullPath)) {
            return null;
        }
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const metadata = parseMetadata(`${slug}.mdx`, data);

        // Security check: Deny access if the post is marked as private
        if (metadata.visibility !== 'public') return null;

        return {
            metadata,
            content,
        };
    } catch (e) {
        console.error(`Error reading post: ${JSON.stringify(slug)}`, e);
        return null;
    }
}