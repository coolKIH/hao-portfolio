import { homeContent } from "../content/home";

export default function Home() {
  const lang = "zh"; // 后续可以改成动态切换
  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        {homeContent[lang].title}
      </h1>
      <p className="text-2xl text-zinc-600 dark:text-zinc-400">
        {homeContent[lang].subtitle}
      </p>
    </div>
  );
}
