interface ProjectCardProps {
    title: string;
    description: string;
    tech?: string[];
    link?: string;
}

export function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
    return (
        <div className="border border-stone-200 dark:border-stone-700 rounded-xl p-4 space-y-2 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            <p className="text-foreground">{description}</p>
            {tech && tech.length > 0 && (
                <p className="text-sm text-muted-foreground">
                    技术栈: {tech.join(", ")}
                </p>
            )}
            {link && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    查看项目
                </a>
            )}
        </div>
    );
}
