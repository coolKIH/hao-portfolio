import type { Metadata } from 'next'
import { Mail, Globe } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'

export const metadata: Metadata = {
    title: 'About',
}

export default function About() {
    return (
        <div className="space-y-12">
            <h1 className="text-3xl font-semibold text-foreground">About</h1>

            {/* Intro */}
            <section className="space-y-5">
                <p className="text-lg text-foreground">
                    I&rsquo;m <strong>Hao Huang</strong>, a full-stack engineer with a background in large-scale search systems.
                </p>
                <p className="text-lg text-foreground">
                    I enjoy building product-oriented web applications that make complex systems intuitive to use.
                </p>
            </section>

            {/* Experience */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Experience</h2>

                <div className="space-y-6 text-lg text-foreground leading-relaxed">
                    <p>
                        Over the past 6 years, I&rsquo;ve worked on financial data platforms, building systems that span from document pipelines and search infrastructure to user-facing interfaces.
                    </p>

                    <p>
                        My work includes designing and operating Elasticsearch clusters, as well as building tools that help users explore and interact with complex data.
                    </p>

                    <p>
                        Recently, I&rsquo;ve been shifting towards product engineering — thinking not only about how systems work, but also how they feel and how they are used in practice.
                    </p>
                </div>
            </section>

            {/* How I think */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    How I think
                </h2>
                <ul className="space-y-4 text-lg text-foreground leading-relaxed">
                    <li>I think in systems — understanding how different parts connect and where complexity comes from.</li>
                    <li>I care about reducing unnecessary complexity and making things more intuitive.</li>
                    <li>I approach frontend with a backend mindset — considering data, constraints, and trade-offs.</li>
                    <li>I value clarity, performance, and usefulness over visual noise.</li>
                </ul>
            </section>

            {/* Contact Divider */}
            <hr className="border-border my-12" />

            {/* Contact */}
            <section className="space-y-4">
                <h2 className="font-semibold text-foreground">
                    Contact
                </h2>

                <div className="space-y-4 text-base">
                    {/* Emails */}
                    <div className="flex items-start gap-3">
                        <Mail
                            size={18}
                            className="mt-0.5 text-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <div className="space-y-2 flex-1">
                            <div>
                                <a
                                    href="mailto:haoyellow.dev@gmail.com"
                                    className="hover:underline underline-offset-4 text-foreground"
                                >
                                    haoyellow.dev@gmail.com
                                </a>
                                <span className="ml-2 text-muted-foreground text-sm">(primary)</span>
                            </div>

                            <div>
                                <a
                                    href="mailto:haoyellow.dev@icloud.com"
                                    className="hover:underline underline-offset-4 text-foreground"
                                >
                                    haoyellow.dev@icloud.com
                                </a>
                                <span className="ml-2 text-muted-foreground text-sm">(backup)</span>
                            </div>
                        </div>
                    </div>

                    {/* GitHub */}
                    <div className="flex items-center gap-3">
                        <SiGithub
                            size={18}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <a
                            href="https://github.com/coolKIH"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4 text-foreground"
                        >
                            github.com/coolKIH
                        </a>
                    </div>

                    {/* X / Twitter */}
                    <div className="flex items-center gap-3">
                        <SiX
                            size={18}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <a
                            href="https://x.com/haoh_dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline underline-offset-4 text-foreground"
                        >
                            @haoh_dev
                        </a>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3 text-foreground">
                        <Globe
                            size={18}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                        />
                        Based in China · UTC+8 timezone
                    </div>
                </div>
            </section>
        </div>
    )
}