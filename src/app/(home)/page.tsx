import { homeContent } from "@/content/home";

export default function Home() {
  const content = homeContent.zh;

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          {content.heroTitle}
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          {content.heroSubtitle}
        </p>
      </section>

      <section className="space-y-3 text-zinc-700 dark:text-zinc-300">
        {content.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          我关注的方向
        </h2>
        <ul className="list-disc pl-5 text-zinc-700 dark:text-zinc-300">
          {content.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          当前在做什么
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300">
          {content.current}
        </p>
      </section>
    </div>
  );
}