interface ProjectCardProps {
    title: string;
    description: string;
    tech?: string[];
    link?: string;
}

export function ProjectCard({ title, description, tech, link }: ProjectCardProps) {
    return (
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 space-y-2 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
            {tech && tech.length > 0 && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
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
