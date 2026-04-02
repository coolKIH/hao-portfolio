import { ProjectCard } from "@/components/project-card";
import type { Metadata } from 'next'
import { getProjects } from "@/lib/vault";

export const metadata: Metadata = {
    title: 'Projects',
}

export default function Projects() {
    const projects = getProjects();

    return (
        <div className="space-y-4">
            <div className="mb-16">
                <h1 className="text-3xl font-semibold text-foreground">Projects</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    A selection of projects I&rsquo;ve built, ranging from complex data systems to personal passion projects.
                </p>
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