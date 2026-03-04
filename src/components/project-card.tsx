import Link from "next/link";

interface ProjectCardProps {
    title: string;
    description: string;
    tech?: string[];
    slug: string;
}

export function ProjectCard({ title, description, tech, slug }: ProjectCardProps) {
    return (
        <div className="border border-stone-200 dark:border-stone-700 rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow">
            <Link href={`/projects/${slug}`}>
                <h3 className="text-xl font-semibold text-foreground hover:underline mb-3">{title}</h3>
            </Link>
            <p className="text-foreground">{description}</p>
            {tech && tech.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                    {tech.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 rounded-sm 
                                        bg-brand/5 dark:bg-brand/10 
                                        text-muted-foreground text-xs font-medium
                                        border border-brand/5 dark:border-brand/10"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
