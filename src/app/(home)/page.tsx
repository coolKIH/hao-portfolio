export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section>
        <h1 className="text-3xl font-semibold text-foreground">
          Hi, I&rsquo;m Hao Huang.
        </h1>
        <p className="text-xl text-muted-foreground">
          This is Hao&rsquo;s World — a place to build, write, and figure out how
          technology can better serve people.
        </p>
      </section>

      {/* Intro */}
      <section className="space-y-3 text-lg text-foreground">
        <p>
          By day I work on backend systems — not always the whole product, but
          the foundation that has to hold. I care about delivering a kind of tech
          warmth from underneath: backends that are firm and considerate, so
          what people touch on top can feel steady and human.
        </p>
        <p>
          What draws me in is still evolution — systems and products that keep
          growing into something better — and how people live with AI, not just
          ask it, as these tools settle into everyday work and life.
        </p>
      </section>

      {/* Care */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-2">
          What I care about
        </h2>
        <ul className="list-disc pl-5 text-lg text-foreground space-y-1">
          <li>Backend systems that are firm, stable, and considerate</li>
          <li>Iteration — shipping, learning, and refining over time</li>
          <li>How people live with AI, and interfaces that keep technology warm</li>
        </ul>
      </section>

      {/* Currently */}
      <section>
        <h2 className="text-lg font-medium text-foreground mb-2">
          Currently
        </h2>
        <p className="text-lg text-foreground">
          Settled into backend work at the hardware–software boundary — infrastructure behind smart, connected products. What keeps me most engaged is still the user experience: making complex systems feel clear and usable.
        </p>
        <p className="text-lg text-foreground mt-3">
          Meanwhile, I&rsquo;m turning this site into Hao&rsquo;s World — less résumé, more world. Trace is one corner of it. I&rsquo;m writing more build logs, experimenting with AI-assisted development, and slowly wiring things so I can ship from anywhere — even my phone — and share what I learn along the way.
        </p>
      </section>
    </div>
  );
}
