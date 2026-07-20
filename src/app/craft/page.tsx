import { ProjectCard } from "@/components/project-card";
import type { Metadata } from 'next'
import { getProjects } from "@/lib/vault";

export const metadata: Metadata = {
    title: 'Craft',
    description:
        "Things I've made — systems, experiments, and corners of this world.",
    openGraph: {
        title: "Craft | Hao's World",
        description:
            "Things I've made — systems, experiments, and corners of this world.",
    },
}

export default function Craft() {
    const projects = getProjects();

    return (
        <div className="space-y-4">
            <div className="mb-16">
                <h1 className="text-4xl font-semibold text-foreground">Craft</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Things I&rsquo;ve made — systems, experiments, and corners of this world.
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
