import { ProjectCard } from "@/components/project-card";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects',
}

export default function Projects() {
    const projects = [
        {
            title: "占位项目 1",
            description: "这是一个占位项目，用于展示卡片样式和布局。",
            tech: ["Next.js", "Tailwind", "TypeScript"],
            link: "#",
        },
        {
            title: "占位项目 2",
            description: "后续这里会替换为真实项目内容。",
            tech: ["React", "Node.js"],
            link: "#",
        },
        {
            title: "占位项目 3",
            description: "更多项目正在制作中 🚀",
            tech: ["JavaScript"],
        },
    ];

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">我的作品</h1>
            <div className="grid gap-4 md:grid-cols-2">
                {projects.map((p) => (
                    <ProjectCard
                        key={p.title}
                        title={p.title}
                        description={p.description}
                        tech={p.tech}
                        link={p.link}
                    />
                ))}
            </div>
        </div>
    );
}
