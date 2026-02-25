import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
}

export default function About() {

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">
                关于我
            </h1>
            <p className="text-xl text-foreground/80">
                我是 Hao，一名偏前端的全栈开发者，喜欢学习新技术，创造激动人心的产品。
            </p>
            <section className="mt-16">
                <h2 className="font-semibold uppercase text-muted-foreground mb-3">
                    联系方式
                </h2>
                <address className="not-italic space-y-3 text-lg text-foreground">
                    <div className="space-x-2">
                        <span>📧 主要邮箱:</span>
                        <a href="mailto:haoyellow.dev@gmail.com"
                            className="text-foreground hover:text-foreground transition-colors underline decoration-stone-300 dark:decoration-stone-500 hover:decoration-inherit underline-offset-4"
                        >haoyellow.dev@gmail.com</a>
                    </div>
                    <div className="space-x-2">
                        <span>☁️ 备用邮箱:</span>
                        <a href="mailto:haoyellow.dev@icloud.com"
                            className="text-foreground hover:text-foreground transition-colors underline decoration-stone-300 dark:decoration-stone-500 hover:decoration-inherit underline-offset-4"
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
