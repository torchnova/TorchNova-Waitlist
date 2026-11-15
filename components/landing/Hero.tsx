import type { CSSProperties } from "react";
import { Typewriter } from "./Typewriter";
import { WaitlistCard } from "./WaitlistCard";

/** Stagger helper: sets the CSS entrance delay for `.enter` / `.card`. */
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/** The two-column hero: pitch on the left, glass signup card on the right. */
export function Hero() {
  return (
    <main className="hero">
      {/* LEFT: pitch */}
      <section>
        <div className="kicker enter" style={delay(0.1)}>
          <span>Built for founders</span>
          <span className="kicker-rule" aria-hidden="true" />
          <span>Launching soon</span>
        </div>
        <h1 className="headline enter" style={delay(0.2)}>
          Everything founders need to move forward
          <span className="headline-dot" aria-hidden="true" />
        </h1>
        <p className="subhead enter" style={delay(0.32)}>
          A new home for founders building out loud. Early access opens soon.
        </p>
        <div className="enter" style={delay(0.44)}>
          <Typewriter />
        </div>
      </section>

      {/* RIGHT: signup */}
      <aside id="waitlist" style={delay(0.4)}>
        <WaitlistCard />
      </aside>
    </main>
  );
}
