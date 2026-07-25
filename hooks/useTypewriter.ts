"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterOptions {
  /** ms per character while typing (default 45). */
  typeSpeed?: number;
  /** ms per character while deleting (default 25). */
  deleteSpeed?: number;
  /** ms to hold a fully-typed phrase before deleting (default 1800). */
  holdTime?: number;
  /** ms to pause after deleting, before the next phrase (default 350). */
  gapTime?: number;
}

interface TypewriterState {
  /** The currently visible substring. */
  text: string;
  /** True once at least one phrase has finished typing (drives caret styling). */
  done: boolean;
}

/**
 * Types phrases out one character at a time, holds, deletes, and advances to
 * the next — the classic typewriter loop. Honours prefers-reduced-motion by
 * showing the first phrase statically.
 */
export function useTypewriter(
  phrases: string[],
  {
    typeSpeed = 45,
    deleteSpeed = 25,
    holdTime = 1800,
    gapTime = 350,
  }: TypewriterOptions = {},
): TypewriterState {
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (phrases.length === 0) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Respect the motion preference: no per-character typing, but still
      // cycle the phrases — swap whole phrases on a calm cadence.
      let idx = 0;
      setText(phrases[0]);
      setDone(true);
      if (phrases.length <= 1) return;
      const id = setInterval(() => {
        idx = (idx + 1) % phrases.length;
        setText(phrases[idx]);
      }, holdTime + 1400);
      return () => clearInterval(id);
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const step = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          // Fully typed — hold, then start deleting.
          setDone(true);
          deleting = true;
          timer.current = setTimeout(step, holdTime);
          return;
        }
        timer.current = setTimeout(step, typeSpeed);
      } else {
        charIndex--;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          // Fully deleted — advance to the next phrase.
          setDone(false);
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer.current = setTimeout(step, gapTime);
          return;
        }
        timer.current = setTimeout(step, deleteSpeed);
      }
    };

    timer.current = setTimeout(step, typeSpeed);
    return () => clearTimeout(timer.current);
  }, [phrases, typeSpeed, deleteSpeed, holdTime, gapTime]);

  return { text, done };
}
