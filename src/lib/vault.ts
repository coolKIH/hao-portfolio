import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

// Directory containing all blog post MDX files
const POSTS_DIR = path.join(process.cwd(), 'content/posts');

// Regex to validate slug format and prevent path traversal attacks
const SLUG_REGEX = /^[a-zA-Z0-9-_]+$/;

// Metadata structure for blog posts
export interface PostMetadata {
    slug: string;
    title: string;
    date: string; // ISO string
    location?: string;
    description?: string;
    tags?: string[];
}

/**
 * Parses frontmatter data from MDX files into standardized PostMetadata.
 * @param fileName - The MDX file name (e.g., "my-post.mdx")
 * @param rawData - Raw frontmatter data from gray-matter
 * @returns Normalized PostMetadata object
 */
function parseMetadata(fileName: string, rawData: any): PostMetadata {
    return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: rawData.title || 'Untitled',
        date: rawData.date ? new Date(rawData.date).toISOString() : new Date().toISOString(),
        location: rawData.location || undefined,
        description: rawData.description || undefined,
        tags: Array.isArray(rawData.tags) ? rawData.tags : (rawData.tags ? [rawData.tags] : []),
    };
}

/**
 * Retrieves all blog posts from the local content directory.
 * Posts are sorted by date in descending order (newest first).
 * @returns Array of post metadata sorted by date
 */
export async function getBlogPosts(): Promise<PostMetadata[]> {
    const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'));

    const posts = files.map(file => {
        const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
        const { data } = matter(content);
        return parseMetadata(file, data);
    });

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Retrieves a single blog post by its slug.
 * @param slug - The post identifier (e.g., "my-first-post")
 * @returns Post metadata and content, or null if not found or invalid
 */
export async function getPostBySlug(slug: string) {
    // Validate slug to prevent path traversal attacks
    if (!slug || !SLUG_REGEX.test(slug)) return null;

    try {
        const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContents);
        const metadata = parseMetadata(`${slug}.mdx`, data);
        return { metadata, content };
    } catch (e) {
        console.error(`Error fetching post with slug "${slug}":`, e);
        return null;
    }
}