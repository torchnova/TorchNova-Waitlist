"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide motion: inertia smooth scrolling (as in the reference) and
 * one shared observer that marks [data-reveal] elements as they enter.
 * Both are skipped for visitors who prefer reduced motion.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (reduce) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    root.classList.add("motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    items.forEach((el) => io.observe(el));

    const lenis = new Lenis({ duration: 1.25 });
    // Reloads open at the top (unless the URL targets a section).
    if (!location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Same-page links written as "/#section" (shared nav) also glide via Lenis.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const el = url.hash === "#top" ? null : document.querySelector<HTMLElement>(url.hash);
      if (url.hash !== "#top" && !el) return;
      e.preventDefault();
      // Resolve to an absolute position now; Lenis' element targets drift
      // once a scroll is already in flight.
      const y = el ? el.getBoundingClientRect().top + window.scrollY - 40 : 0;
      lenis.scrollTo(Math.max(0, y));
      history.replaceState(null, "", url.hash);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      cancelAnimationFrame(raf);
      lenis.destroy();
      io.disconnect();
      root.classList.remove("motion");
    };
  }, []);

  return null;
}
