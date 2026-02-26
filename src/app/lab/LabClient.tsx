'use client';

import { useState, useEffect, useDeferredValue } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { cn } from "@/lib/utils";

interface LabClientProps {
    defaultContent: string;
}

/**
 * Client Component for the interactive MDX Lab.
 * Features a controlled textarea and a deferred preview for performance.
 */
export default function LabClient({ defaultContent }: LabClientProps) {
    // Initialize state with data passed from the server
    const [input, setInput] = useState(defaultContent);
    const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

    // Use deferred value to prevent the UI from lagging during heavy MDX compilation
    const deferredInput = useDeferredValue(input);

    useEffect(() => {
        const compileMDX = async () => {
            try {
                const mdx = await serialize(deferredInput, {
                    mdxOptions: {
                        development: process.env.NODE_ENV === 'development',
                    },
                });
                setMdxSource(mdx);
            } catch (error) {
                // Log errors but keep the UI alive (Fault Tolerance)
                console.error("MDX Compilation Error:", error);
            }
        };

        compileMDX();
    }, [deferredInput]);

    return (
        <main className="min-h-screen w-full flex flex-col">
            {/* Drafting Area: The "Controlled" Input */}
            <section className="w-full border border-muted-foreground/20 bg-muted-foreground/50">
                <div className="max-w-full mx-auto">
                    <div className="px-6 py-3 flex justify-between items-center">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-widest uppercase">
                            Drafting Area
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                            {input.length} characters
                        </span>
                    </div>
                    <textarea
                        className="w-full h-64 px-6 pb-8 font-mono text-sm leading-relaxed bg-transparent outline-none resize-y text-zinc-800 dark:text-zinc-200"
                        value={input} // Controlled: React state is the source of truth
                        onChange={(e) => setInput(e.target.value)}
                        spellCheck={false}
                        placeholder="Start typing your MDX..."
                    />
                </div>
            </section>

            {/* Preview Area: Mirroring the production post layout */}
            <section className="flex-1 w-full">
                <div className="py-16">
                    <article className={cn(
                        /* Base Typography Setup */
                        "prose dark:prose-invert prose-stone max-w-none",

                        /* Remove default typography backticks from all code elements */
                        "[&_code::before]:content-none [&_code::after]:content-none",

                        /* Style inline code ONLY (excludes code blocks inside <pre>) */
                        /* Light mode background */
                        "[&_:not(pre)>code]:bg-stone-200/50",
                        /* Dark mode: Semi-transparent white 'glass' effect */
                        "dark:[&_:not(pre)>code]:bg-white/10",

                        /* Fine-tune inline code appearance */
                        "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5",
                        "dark:[&_:not(pre)>code]:text-white/90 [&_:not(pre)>code]:font-medium"
                    )}>
                        {mdxSource && <MDXRemote {...mdxSource} />}
                    </article>
                </div>
            </section>
        </main>
    );
}