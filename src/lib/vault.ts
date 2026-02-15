import matter from 'gray-matter';

// --- Configuration ---
const GITHUB_TOKEN = process.env.VAULT_GITHUB_TOKEN;
const OWNER = "coolKIH";
const REPO = "hao-portfolio-content";
const BLOG_DIR = "blog";

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

const slugRegex = /^[a-zA-Z0-9-_]+$/;

/**
 * Standardizes raw gray-matter data into a strict PostMetadata object.
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
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3.raw",
                "X-GitHub-Api-Version": "2022-11-28" // Explicitly pinning the API version
            },
            // Cache for 1 hour, allowing Next.js to serve static content while updating in background
            next: { revalidate: 3600, tags: ['vault-content'] }
        });

        if (!response.ok) return null;
        return response.text();
    } catch (error) {
        console.error(`Network error fetching ${path}:`, error);
        return null;
    }
}

/**
 * Retrieves all blog posts by scanning the repository directory.
 * Filters by .mdx extension and 'public' visibility.
 */
export async function getBlogPosts(): Promise<PostMetadata[]> {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${BLOG_DIR}`;

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28"
            },
            next: { revalidate: 3600, tags: ['vault-list'] }
        });

        if (!response.ok) return [];
        const files = await response.json();

        if (!Array.isArray(files)) return [];

        // Concurrent fetching of all file contents to parse metadata
        const posts = await Promise.all(
            files
                .filter(file => file.name.endsWith('.mdx'))
                .map(async (file) => {
                    const content = await fetchFromGitHub(`${BLOG_DIR}/${file.name}`);
                    if (!content) return null;

                    const { data } = matter(content);
                    const metadata = parseMetadata(file.name, data);
                    return metadata.visibility === 'public' ? metadata : null;
                })
        );

        return (posts.filter(Boolean) as PostMetadata[])
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error("Error fetching blog post list:", error);
        return [];
    }
}

/**
 * Retrieves a single post's content and metadata by its slug.
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