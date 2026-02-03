interface PostPageProps {
    params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
                博客文章: {params.slug}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
                这里将渲染该博客文章内容，后续可以接入 MDX 或 Markdown。
            </p>
        </div>
    );
}
