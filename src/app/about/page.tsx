import type { Metadata } from 'next'
import { Mail, Globe } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'

export const metadata: Metadata = {
    title: 'About',
}

export default function About() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-semibold text-foreground">About</h1>

            <div className="prose prose-lg text-foreground max-w-none">
                {/* Intro */}
                <section className="space-y-3">
                    <p>
                        <strong>I&rsquo;m Hao Huang</strong>, a full-stack engineer with a background in large-scale search systems.
                    </p>
                    <p>
                        Currently building product-oriented web applications that make complex systems intuitive to use.
                    </p>
                </section>

                {/* Experience */}
                <section>
                    <p>
                        Over the past 6 years, I&rsquo;ve worked on financial data platforms, building systems that span from document pipelines and search infrastructure to user-facing interfaces.
                    </p>
                    <p>
                        My work includes designing and operating Elasticsearch clusters, as well as building tools that help users explore and interact with complex data.
                    </p>
                    <p>
                        Recently, I&rsquo;ve been shifting towards product engineering — thinking not only about how systems work, but also how they feel and how they are used in practice.
                    </p>
                </section>

                {/* How I think */}
                <section>
                    <h2 className="text-xl font-semibold uppercase tracking-wide text-muted-foreground mb-4">
                        How I think
                    </h2>
                    <ul className="space-y-3">
                        <li>I think in systems — understanding how different parts connect and where complexity comes from.</li>
                        <li>I care about reducing unnecessary complexity and making things more intuitive.</li>
                        <li>I approach frontend with a backend mindset — considering data, constraints, and trade-offs.</li>
                        <li>I value clarity, performance, and usefulness over visual noise.</li>
                    </ul>
                </section>
            </div>

            {/* Divider + Contact Section */}
            <hr className="border-border my-12" />

            <section className="space-y-4">
                {/* Section Title */}
                <h2 className="font-medium uppercase tracking-wide text-muted-foreground">
                    Contact
                </h2>

                <div className="space-y-4 text-base">
                    {/* Emails */}
                    <div className="flex items-start gap-3">
                        <Mail
                            size={18}
                            className="mt-0.5 text-muted-foreground shrink-0"
                            aria-hidden="true"
                        />

                        <div className="space-y-2 flex-1">
                            <a
                                href="mailto:haoyellow.dev@gmail.com"
                                className="block hover:underline underline-offset-4"
                            >
                                haoyellow.dev@gmail.com <span className="text-muted-foreground text-sm">(primary)</span>
                            </a>

                            <a
                                href="mailto:haoyellow.dev@icloud.com"
                                className="block hover:underline underline-offset-4"
                            >
                                haoyellow.dev@icloud.com <span className="text-muted-foreground text-sm">(backup)</span>
                            </a>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex items-center gap-3">
                        <SiGithub
                            size={18}
                            className="text-muted-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <a
                            href="https://github.com/coolKIH"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4"
                        >
                            github.com/coolKIH
                        </a>
                    </div>

                    {/* X / Twitter */}
                    <div className="flex items-center gap-3">
                        <SiX
                            size={18}
                            className="text-muted-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <a
                            href="https://x.com/haoh_dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4"
                        >
                            @haoh_dev
                        </a>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-foreground/70">
                        <Globe
                            size={18}
                            className="shrink-0"
                            aria-hidden="true"
                        />
                        Based in China · UTC+8 timezone
                    </div>
                </div>
            </section>
        </div>
    )
}