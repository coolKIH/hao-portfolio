import type { Metadata } from 'next'
import { Mail, Globe } from 'lucide-react'
import { SiGithub, SiX } from 'react-icons/si'

export const metadata: Metadata = {
    title: 'About',
}

export default function About() {
    return (
        <div className="space-y-12">
            <h1 className="text-4xl font-semibold text-foreground">About</h1>

            {/* Intro */}
            <section className="space-y-5">
                <p className="text-lg text-foreground">
                    I&rsquo;m <strong>Hao Huang</strong>. I build backend systems that are meant to hold — firm underneath, considerate toward the people who rely on what sits on top.
                </p>
                <p className="text-lg text-foreground">
                    I care about evolution more than perfection: products and infrastructure that keep growing into something better, and technology that people can live with — including AI — not only ask questions of.
                </p>
            </section>

            {/* Path */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Path</h2>

                <div className="space-y-6 text-lg text-foreground leading-relaxed">
                    <p>
                        For years I worked on financial data platforms — document pipelines, search infrastructure, and the tools that help people explore complex information. That background still shapes how I think about systems.
                    </p>

                    <p>
                        These days my day job is backend work at the hardware–software boundary. The surface may change; what stays is the same instinct: make the foundation steady, so the experience can feel clear and human.
                    </p>
                </div>
            </section>

            {/* How I think */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold text-foreground">
                    How I think
                </h2>
                <ul className="space-y-4 text-lg text-foreground leading-relaxed">
                    <li>I think in systems — how parts connect, where complexity hides, what has to stay reliable.</li>
                    <li>I prefer backends that are firm and considerate, not just clever.</li>
                    <li>I care about evolution: shipping, learning, refining over time.</li>
                    <li>I want technology — and AI — to settle into everyday life in ways that reduce friction, not add noise.</li>
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
                    {/* Email */}
                    <div className="flex items-center gap-3">
                        <Mail
                            size={18}
                            className="text-foreground shrink-0"
                            aria-hidden="true"
                        />
                        <a
                            href="mailto:haoyellow.dev@gmail.com"
                            className="hover:underline underline-offset-4 text-foreground"
                        >
                            haoyellow.dev@gmail.com
                        </a>
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
