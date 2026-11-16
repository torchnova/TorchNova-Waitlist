"use client";

import { useEffect, useRef } from "react";

const LINES = ["Every Idea", "Deserves", "Momentum"];

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * The three-line statement travels up from the lower left and settles
 * right-aligned, each line arriving slightly after the one above.
 */
export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const lines = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("is-static");
      return;
    }
    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? clamp(-rect.top / span) : 1;
      const vw = window.innerWidth;
      lines.current.forEach((el, i) => {
        if (!el) return;
        const t = ease(clamp((p - i * 0.08) / 0.6));
        const x = (1 - t) * -0.42 * vw;
        const y = (1 - t) * (260 + i * 60);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} id="statement" className="statement">
      <div className="statement-stage">
        <p className="statement-text">
          {LINES.map((l, i) => (
            <span
              key={l}
              ref={(el) => {
                lines.current[i] = el;
              }}
            >
              {l}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
