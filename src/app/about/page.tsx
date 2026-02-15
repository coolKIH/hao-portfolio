import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
}

export default function About() {

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
                关于我
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
                我是 Hao，一名偏前端的全栈开发者，喜欢学习新技术，创造激动人心的产品。
            </p>
            <section className="mt-16">
                <h2 className="text-sm font-semibold uppercase text-zinc-500 dark:text-zinc-400 mb-3">
                    联系方式
                </h2>
                <address className="not-italic space-y-3 text-lg text-zinc-600 dark:text-zinc-400">
                    <div className="space-x-2">
                        <span>📧 主要邮箱:</span>
                        <a href="mailto:haoyellow.dev@gmail.com"
                            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-50 transition-colors underline decoration-zinc-300 dark:decoration-zinc-500 hover:decoration-inherit underline-offset-4"
                        >haoyellow.dev@gmail.com</a>
                    </div>
                    <div className="space-x-2">
                        <span>☁️ 备用邮箱:</span>
                        <a href="mailto:haoyellow.dev@icloud.com"
                            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-50 transition-colors underline decoration-zinc-300 dark:decoration-zinc-500 hover:decoration-inherit underline-offset-4"
                        >haoyellow.dev@icloud.com</a>
                    </div>
                    <div>
                        🌍 位置: 目前居住于中国广东省。开放远程工作意愿。
                    </div>
                </address>
            </section>
        </div>
    );
}
