import { ProjectCard } from "@/components/project-card";
import type { Metadata } from 'next'
import { getProjects } from "@/lib/vault";

export const metadata: Metadata = {
    title: 'Projects',
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <div className="space-y-4">
            <div className="mb-16">
                <h1 className="text-3xl font-semibold text-foreground">我的作品</h1>
                <p className="mt-2 text-lg text-muted-foreground">展示一些我构建的作品和项目。</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                {projects.map((p) => (
                    <ProjectCard
                        key={p.slug}
                        title={p.title}
                        description={p.description}
                        tech={p.tech}
                        slug={p.slug}
                    />
                ))}
            </div>
        </div>
    );
}
