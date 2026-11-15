import { Reveal } from "./Reveal";

const FEATURES = [
  {
    tag: "01",
    tone: "mint",
    title: "Find your people",
    body: "Meet co-founders and builders who see what you see.",
  },
  {
    tag: "02",
    tone: "blush",
    title: "Run your team",
    body: "Plan, assign, and track tasks across your startup team, right where the conversations happen.",
  },
  {
    tag: "03",
    tone: "yellow",
    title: "AI that works with you",
    body: "A built-in assistant that keeps things organised, handles the busywork, and helps you run your startup without missing a beat.",
  },
];

/** The scroll-down story section: who we are, what we're building, and why. */
export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      {/* 01 — the story */}
      <Reveal>
        <div className="section-label">01 / Our story</div>
        <h2 id="about-title" className="about-title">
          Every idea starts with someone who sees things a little differently.
        </h2>
      </Reveal>

      <div className="about-story">
        <Reveal>
          <p className="about-lead">
            We&rsquo;re a team of those people. And we&rsquo;re building
            TorchNova <span className="accent-text">for you</span>.
          </p>
        </Reveal>
        <Reveal className="about-prose" delay={0.1}>
          <p>
            We believe more ideas deserve a real chance. Sometimes, that starts
            with meeting someone who sees what you see. Sometimes, it&rsquo;s
            knowing which step to take next. And sometimes, it&rsquo;s having
            room to think because the little things are finally taking care of
            themselves.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <blockquote className="about-question">
          <span className="eyebrow">The question we keep asking</span>
          <p>
            What could you build if more of your energy went into{" "}
            <em>the idea that started it all?</em>
          </p>
        </blockquote>
      </Reveal>

      <Reveal className="about-prose about-bridge">
        <p>
          That question is shaping everything we&rsquo;re making. A place to
          find your people, see new possibilities, and keep moving&mdash;with a
          little more happening behind the scenes than you might expect.
        </p>
      </Reveal>

      {/* 02 — the platform */}
      <div className="features">
        <Reveal>
          <div className="section-label">02 / One platform</div>
          <div className="features-head">
            <h3 className="features-title">
              One platform for everything your idea needs.
            </h3>
            <p className="features-lede">
              No more juggling a dozen tools and group chats. The people, the
              plan, and the work all live in one place, with AI quietly
              keeping it all running, so you can spend less time managing and
              more time building.
            </p>
          </div>
        </Reveal>

        <div className="features-grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <article className="feature">
                <span className={`feature-tag ${f.tone}`}>{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* 03 — what's next */}
      <div className="about-close">
        <Reveal>
          <div className="section-label">03 / What&rsquo;s next</div>
          <div className="about-prose about-bridge">
            <p>
              We&rsquo;re getting closer to opening the doors. There&rsquo;s
              plenty we&rsquo;re excited to show you, but first, we&rsquo;d love
              to meet the people we&rsquo;re building this for.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card about-cta">
            <p className="about-cta-text">
              Join the waitlist. Bring the idea you keep coming back to.
            </p>
            <a href="#waitlist" className="cta">
              Join the waitlist
              <span className="cta-arrow up" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
          <p className="about-signoff">&mdash; The TorchNova Team</p>
        </Reveal>
      </div>
    </section>
  );
}
