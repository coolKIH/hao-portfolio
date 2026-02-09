import Link from "next/link";

export default function Blog() {
    const posts = [
        {
            slug: "first-post",
            title: "第一篇博客",
            date: "2026-02-02",
            excerpt: "这是我的第一篇博客文章示例。",
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">博客</h1>
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
