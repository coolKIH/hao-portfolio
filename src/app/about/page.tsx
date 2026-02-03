import { aboutContent } from "@/content/home";

export default function About() {
    const lang = "zh";
    
    return (
        <div className="space-y-4 p-4">
            <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
                {aboutContent[lang].title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {aboutContent[lang].description}
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                📧 邮箱: hao.dev@example.com
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                🌍 Location: China / GMT+8, Open to remote
            </p>
        </div>
    );
}
