import matter from 'gray-matter';

// --- Configuration ---
const GITHUB_TOKEN = process.env.VAULT_GITHUB_TOKEN;
const OWNER = "coolKIH";
const REPO = "hao-portfolio-content";

// Path updates: matching the new structure in your vault
const BLOG_DIR = "content/posts";
const INDEX_PATH = "indices/posts.json";

// --- Type Definitions ---
export interface PostMetadata {
    slug: string;
    title: string;
    date: string; // ISO String stored in posts.json
    location?: string;
    description?: string;
    tags?: string[];
    visibility: 'public' | 'private';
}

const slugRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Standardizes raw gray-matter data into a strict PostMetadata object.
 * Retained for individual post parsing in getPostBySlug.
 */
function parseMetadata(fileName: string, rawData: any): PostMetadata {
    return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: rawData.title || 'Untitled',
        date: rawData.date ? new Date(rawData.date).toISOString() : new Date().toISOString(),
        location: rawData.location || undefined,
        description: rawData.description || undefined,
        tags: Array.isArray(rawData.tags) ? rawData.tags : (rawData.tags ? [rawData.tags] : undefined),
        visibility: rawData.visibility === 'public' ? 'public' : 'private',
    };
}

/**
 * Core Fetcher: Retrieves raw content from GitHub Private Repository.
 * Uses 'vnd.github.v3.raw' to bypass Base64 encoding for better performance.
 */
async function fetchFromGitHub(path: string): Promise<string | null> {
    const cacheBuster = process.env.VERCEL_DEPLOYMENT_ID
        ? `?t=${process.env.VERCEL_DEPLOYMENT_ID}`
        : `?t=${Date.now()}`;

    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}` + cacheBuster;
    console.log('Fetching from GitHub URL:', url);

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3.raw",
                "X-GitHub-Api-Version": "2022-11-28"
            },
            // Double-check: Instant update via Deploy Hook, 
            // plus 24-hour auto-refresh safety net.
            next: { revalidate: 86400, tags: ['vault-content'] }
        });

        if (!response.ok) return null;
        return response.text();
    } catch (error) {
        console.error(`Network error fetching ${path}:`, error);
        return null;
    }
}

/**
 * Retrieves all blog posts by fetching the pre-generated JSON index.
 * This eliminates the N+1 request problem and pre-sorts data via GitHub Actions.
 */
export async function getBlogPosts(): Promise<PostMetadata[]> {
    try {
        const indexContent = await fetchFromGitHub(INDEX_PATH);

        if (!indexContent) {
            console.error("Failed to fetch posts index from vault.");
            return [];
        }

        const allPosts: PostMetadata[] = JSON.parse(indexContent);

        // Security filter: ensure only public posts are returned.
        // Sorting is skipped here as it is handled by the generation script.
        return allPosts.filter(post => post.visibility === 'public');
    } catch (error) {
        console.error("Error fetching blog post list index:", error);
        return [];
    }
}

/**
 * Retrieves a single post's content and metadata by its slug.
 * Continues to fetch the specific .mdx file for full content rendering.
 */
export async function getPostBySlug(slug: string) {
    if (!slug || !slugRegex.test(slug)) {
        console.warn(`Blocked suspicious slug: ${slug}`);
        return null;
    }

    try {
        const fileContents = await fetchFromGitHub(`${BLOG_DIR}/${slug}.mdx`);
        if (!fileContents) return null;

        const { data, content } = matter(fileContents);
        const metadata = parseMetadata(`${slug}.mdx`, data);

        // Security: Ensure private posts are never leaked to the client
        if (metadata.visibility !== 'public') return null;

        return { metadata, content };
    } catch (e) {
        console.error(`Error processing post ${slug}:`, e);
        return null;
    }
}