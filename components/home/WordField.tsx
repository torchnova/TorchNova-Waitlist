"use client";

import { useEffect, useRef } from "react";

/** Words scattered across the 3D plane. Deliberately generic — no product detail. */
const FIELD = [
  "Momentum", "Connection", "Direction", "Space", "Founders", "Build",
  "Plan", "Focus", "Team", "Idea", "Decide", "Start",
];
const COLS = 12;
const ROWS = 14;
const CELL = 230;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const cells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const empty = (i * 7 + row) % 5 === 0;
  return {
    key: i,
    word: empty ? "" : FIELD[(i * 5 + row * 3) % FIELD.length]!,
    x: (col - (COLS - 1) / 2) * CELL,
    y: (row - (ROWS - 1) / 2) * CELL,
    vertical: (i + row) % 4 === 0,
    tone: (i * 3 + row) % 5 === 0 ? "bright" : (i + row * 2) % 3 === 0 ? "mid" : "",
  };
});

/**
 * The scroll sequence. The statement's last word lands on a dark stage
 * with two ghost words beneath it and a line drawn through; the words
 * multiply into a field that tilts and turns as you pass through it, and
 * the field finally empties into a wireframe of boxes.
 */
export function WordField() {
  const sectionRef = useRef<HTMLElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const ghostA = useRef<HTMLSpanElement>(null);
  const ghostB = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const plane = planeRef.current;
    const stack = stackRef.current;
    if (!section || !plane || !stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section.classList.add("is-static");
      return;
    }

    let frame = 0;
    const render = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? clamp(-rect.top / span) : 0;

      // A — stack: ghosts drift apart, line draws then thins out.
      const a = range(p, 0, 0.16);
      if (ghostA.current) ghostA.current.style.transform = `translate3d(${lerp(0.55, 1.4, a)}em, ${lerp(0.42, 1.1, a)}em, 0)`;
      if (ghostB.current) ghostB.current.style.transform = `translate3d(${lerp(-0.05, -0.9, a)}em, ${lerp(0.82, 2.0, a)}em, 0)`;
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleX(${ease(range(p, 0, 0.08)).toFixed(3)})`;
        lineRef.current.style.opacity = (1 - range(p, 0.1, 0.2)).toFixed(3);
      }
      stack.style.opacity = (1 - range(p, 0.14, 0.26)).toFixed(3);

      // B — field appears and the camera pulls back.
      const b = ease(range(p, 0.08, 0.32));
      // C — tilt, turn and travel.
      const c = ease(range(p, 0.26, 0.8));
      // D — words fall away; only the boxes remain as we fly in.
      const d = ease(range(p, 0.68, 0.96));

      plane.style.opacity = b.toFixed(3);
      plane.style.setProperty("--words", lerp(1, 0.06, d).toFixed(3));
      plane.style.setProperty("--box", lerp(0.08, 0.26, d).toFixed(3));
      plane.style.transform =
        `translate3d(-50%, -50%, ${(lerp(500, -150, b) + lerp(0, 380, d)).toFixed(1)}px) ` +
        `rotateX(${(lerp(0, 58, c) - lerp(0, 40, d)).toFixed(2)}deg) ` +
        `rotateZ(${lerp(0, 34, c).toFixed(2)}deg) ` +
        `translateY(${(lerp(0, -1300, c) - lerp(0, 300, d)).toFixed(1)}px)`;
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
    <section ref={sectionRef} className="wf" aria-label="Momentum, direction, connection">
      <div className="wf-stage">
        <div ref={planeRef} className="wf-plane" aria-hidden="true">
          {cells.map((c) => (
            <div
              key={c.key}
              className={`wf-cell${c.tone ? ` ${c.tone}` : ""}`}
              style={{ transform: `translate(${c.x}px, ${c.y}px)` }}
            >
              {c.word ? <span className={c.vertical ? "v" : undefined}>{c.word}</span> : null}
            </div>
          ))}
        </div>
        <div ref={stackRef} className="wf-stack">
          <div ref={lineRef} className="wf-line" aria-hidden="true" />
          <div className="wf-words">
            <span className="lead">Momentum</span>
            <span ref={ghostA} className="ghost" aria-hidden="true">Direction</span>
            <span ref={ghostB} className="ghost" aria-hidden="true">Connection</span>
          </div>
        </div>
      </div>
    </section>
  );
}
