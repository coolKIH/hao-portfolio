import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'vault/blog');

export interface PostMetadata {
    slug: string;
    title: string;
    date: string;
    location?: string;
    description?: string;
    tags?: string[];
    visibility: 'public' | 'private';
}

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

export function getBlogPosts(): PostMetadata[] {
    if (!fs.existsSync(BLOG_PATH)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_PATH);

    const posts = files
        .filter((file) => file.endsWith('.mdx'))
        .map((fileName) => {
            const fullPath = path.join(BLOG_PATH, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data } = matter(fileContents);

            return parseMetadata(fileName, data);
        })
        .filter((post) => post.visibility === 'public');

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
    const fullPath = path.join(BLOG_PATH, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const metadata = parseMetadata(`${slug}.mdx`, data);

    if (metadata.visibility !== 'public') return null;

    return {
        metadata: metadata,
        content: content,
    };
}