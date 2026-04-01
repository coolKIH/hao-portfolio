export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-3xl font-semibold text-foreground">
          Hi, I&rsquo;m Hao.
        </h1>
        <p className="text-xl text-muted-foreground">
          I build search-driven products, bridging complex data systems with intuitive user experiences.
        </p>
      </section>

      {/* Intro */}
      <section className="space-y-3 text-lg text-foreground">
        <p>
          I design and build systems that make complex data usable.
        </p>
        <p>
          From large-scale search infrastructure to modern web interfaces, I work on turning backend complexity into clear and efficient user experiences.
        </p>
      </section>

      {/* Focus */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-2">
          What I focus on
        </h2>
        <ul className="list-disc pl-5 text-foreground space-y-1">
          <li>Search systems and data-intensive applications</li>
          <li>Full-stack product development (React / Next.js / TypeScript)</li>
          <li>Performance, usability, and maintainable architectures</li>
        </ul>
      </section>

      {/* Current */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-2">
          Currently
        </h2>
        <p className="text-foreground">
          Building my personal site and writing about engineering and product thinking. Exploring opportunities with product-focused and international teams.
        </p>
      </section>
    </div>
  );
}