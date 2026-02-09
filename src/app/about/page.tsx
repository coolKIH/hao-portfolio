export default function About() {
    const lang = "zh";

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
                关于我
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                我是一名前端偏向的全栈开发者，喜欢学习新技术，创造激动人心的产品。
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                📧 邮箱: haoyellow.dev@icloud.com
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                🌍 位置: 目前居住于中国广东省。开放远程工作意愿。
            </p>
        </div>
    );
}
