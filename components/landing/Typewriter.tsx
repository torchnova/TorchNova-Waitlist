"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

// Snippets of what TORCHNOVA is about — typed out one at a time.
const SNIPPETS = [
  "Build in public.",
  "Find your co-founder.",
  "Get advice from founders who've done it.",
  "Get on investors' radar early.",
];

/** Rotating "what we're about" line with a typewriter motion + blinking caret. */
export function Typewriter() {
  const { text, done } = useTypewriter(SNIPPETS);

  return (
    <p className="typewriter" aria-live="polite">
      <span className="typewriter-text">{text}</span>
      <span
        className={`typewriter-caret${done ? " blink" : ""}`}
        aria-hidden="true"
      />
    </p>
  );
}
