import { Typewriter } from "./Typewriter";
import { WaitlistCard } from "./WaitlistCard";

/** The two-column hero: pitch on the left, glass signup card on the right. */
export function Hero() {
  return (
    <main className="hero">
      {/* LEFT: pitch */}
      <section>
        <div className="kicker">Built for founders · Launching soon</div>
        <h1 className="headline">DON&apos;T BUILD IN THE DARK.</h1>
        <p className="subhead">
          A new home for founders building out loud. Early access opens soon.
        </p>
        <Typewriter />
      </section>

      {/* RIGHT: signup */}
      <aside>
        <WaitlistCard />
      </aside>
    </main>
  );
}
