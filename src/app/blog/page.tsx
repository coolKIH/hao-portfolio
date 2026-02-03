import { blogContent } from "@/content/home";
import Link from "next/link";

export default function Blog() {
    const lang = "zh";
    const posts = blogContent[lang];

    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">博客</h1>
            <ul className="space-y-2">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {post.title} - {post.date}
                        </Link>
                        <p className="text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
