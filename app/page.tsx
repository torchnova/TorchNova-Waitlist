import Link from "next/link";
import type { CSSProperties } from "react";
import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";

export default function HomePage() {
  return (
    <div className="page">
      <Blobs />
      {/* First screen: nav + hero fill the viewport; the story follows on scroll. */}
      <div className="fold">
        <Nav />
        <Hero />
        <a
          href="#about"
          className="scroll-cue enter"
          style={{ "--d": "0.9s" } as CSSProperties}
          aria-label="Scroll to our story"
        >
          <span>Our story</span>
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M7 2v9M3 7.5 7 11.5l4-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
      <About />
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div>
            <strong>TorchNova</strong> / built for founders
          </div>
          <nav aria-label="Legal">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
