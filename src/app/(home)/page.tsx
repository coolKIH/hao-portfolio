export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          你好，我是 Hao。
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          一名正在回到一线的开发者，偏前端，关注产品与体验。
        </p>
      </section>

      <section className="space-y-3 text-zinc-700 dark:text-zinc-300">
        <p>我曾从事全栈开发，目前正在系统性地重新打磨前端与现代 Web 技术。</p>
        <p>这里是我记录学习、技术思考和生活感悟的地方。</p>
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          我关注的方向
        </h2>
        <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
          <li>前端工程与 Web 产品体验</li>
          <li>React / Next.js / TypeScript</li>
          <li>可维护、可演进的代码结构</li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          当前在做什么
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          正在构建个人网站与博客，并逐步寻找远程或国际化的工作机会。
        </p>
      </section>
    </div>
  );
}