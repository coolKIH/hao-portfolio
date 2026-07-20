import { getProjectBySlug, getProjects } from "@/lib/vault";
import { notFound } from "next/navigation";
import type { Metadata } from 'next';
import MdxArticle from "@/components/mdx-article";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export async function generateMetadata({ params }: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return notFound();
    }

    return {
        title: project.metadata.title,
        description: project.metadata.description,
        openGraph: {
            title: project.metadata.title,
            description: project.metadata.description,
        },
    };
}

export const dynamicParams = false;

export function generateStaticParams() {
    const projects = getProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const hasContent = project.content.trim().length > 0;

    return (
        <div>
            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-4 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        {project.metadata.title}
                    </h1>
                    {(project.metadata.liveUrl || project.metadata.github) && (
                        <div className="flex items-center gap-3">
                            {project.metadata.github && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="rounded-full"
                                >
                                    <a
                                        href={project.metadata.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                        <ArrowUpRight className="size-4" />
                                    </a>
                                </Button>
                            )}
                            {project.metadata.liveUrl && (
                                <Button
                                    variant="default"
                                    size="sm"
                                    asChild
                                    className="rounded-full bg-brand hover:bg-brand/90"
                                >
                                    <a
                                        href={project.metadata.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit Live
                                        <ArrowUpRight className="size-4" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
                <p className="mt-2 text-muted-foreground mb-4 md:text-lg">
                    {project.metadata.description}
                </p>
                {project.metadata.tech.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                        {project.metadata.tech.map((tech: string) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 rounded-sm 
                                            bg-brand/5 dark:bg-brand/10 
                                            text-muted-foreground text-xs md:text-sm font-medium
                                            border border-brand/5 dark:border-brand/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </header>
            {hasContent && (
                <MdxArticle source={project.content} />
            )}
        </div>
    );
}
