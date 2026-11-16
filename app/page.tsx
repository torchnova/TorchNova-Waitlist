import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { WordField } from "@/components/home/WordField";
import { Statement } from "@/components/home/Statement";
import { SITE } from "@/lib/site";

const PILLARS = [
  {
    title: "Connection.",
    body: "The right person, someone who sees what you see, can change the course of an idea.",
  },
  {
    title: "Direction.",
    body: "Knowing the next step matters more than having the perfect plan.",
  },
  {
    title: "Space.",
    body: "When the small things take care of themselves, there is finally room to think.",
  },
];

const PLATFORM = [
  {
    title: "Find your people",
    body: "Meet co-founders and builders who share your direction.",
  },
  {
    title: "Run your team",
    body: "Plan, assign and follow the work across your company, in the same place the conversations happen.",
  },
  {
    title: "Let the busywork run itself",
    body: "A built-in assistant keeps everything organised in the background, so nothing slips.",
  },
];

const PRINCIPLES = [
  { title: "Founder first", body: "Every decision starts with the person building the company." },
  { title: "Private by design", body: "Your ideas, plans and conversations stay yours. Access is by invitation." },
  { title: "Quietly capable", body: "The most useful work happens in the background. Less noise, more momentum." },
  { title: "Built to grow", body: "Secure foundations from day one, made to grow with the companies that use them." },
];

function Masthead() {
  return (
    <div className="masthead" aria-hidden="true">
      <svg viewBox="0 0 1000 110">
        <text x="0" y="108" textLength="1000" lengthAdjust="spacing">
          TORCHNOVA
        </text>
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <SiteShell masthead={<Masthead />}>
      <section className="hero">
        <div className="grid hero-grid">
          <p className="hero-tag c1">
            Founders first.
            <br />
            Built in private.
          </p>
          <h1 className="hero-lede c5">
            One place for the people, the plan and the work behind a new company.
          </h1>
          <a href="#statement" className="hero-cue c5">
            Scroll
          </a>
        </div>
      </section>

      <Statement />

      <WordField />

      <div className="dark">
        <section id="philosophy" className="block">
          <div className="grid">
            <h2 className="block-name c1" data-reveal>Philosophy</h2>
            <p className="block-lead c3" data-reveal>
              Every idea begins with someone who sees things a little
              differently. We are those people, and TorchNova is what we are
              building for everyone else who is.
            </p>
          </div>
          <div className="grid pillars">
            {PILLARS.map((p, i) => (
              <div key={p.title} className={`pillar c${[1, 3, 5][i]}`} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="platform" className="block">
          <div className="grid">
            <h2 className="block-name c1" data-reveal>Platform</h2>
            <div className="c3 block-head" data-reveal>
              <p className="block-lead">One platform. Everything the idea needs.</p>
              <p className="block-body">
                Fewer tools, fewer threads, less managing. The people, the plan
                and the work live together, so more of every day goes into
                building.
              </p>
            </div>
          </div>
          <div className="rows">
            {PLATFORM.map((f) => (
              <div key={f.title} className="grid row" data-reveal>
                <h3 className="c1">{f.title}</h3>
                <p className="c3">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="principles" className="block">
          <div className="grid">
            <h2 className="block-name c1" data-reveal>Principles</h2>
            <p className="block-lead c3" data-reveal>How we build.</p>
          </div>
          <div className="grid principles">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className={`principle c${[1, 3, 5, 7][i]}`} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section id="contact" className="block contact">
        <div className="grid">
          <h2 className="block-name c1" data-reveal>Contact</h2>
          <p className="contact-title c3" data-reveal>Let&rsquo;s talk.</p>
        </div>
        <div className="grid contact-rows" data-reveal>
          <p className="contact-note c3">
            TorchNova is shown privately, one organization at a time.
          </p>
          <div className="c5 contact-item">
            <span>Demo requests</span>
            <Link href="/demo">Request a demo</Link>
          </div>
          <div className="c7 contact-item">
            <span>General enquiries</span>
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
