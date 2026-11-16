import Link from "next/link";
import { Spark } from "@/components/brand/TorchLogo";

/**
 * Column-grid navigation. Rendered with mix-blend-mode: difference so the
 * same white type reads over both the light and the dark sections.
 */
export function Header() {
  return (
    <header className="nav">
      <div className="grid nav-grid">
        <Link href="/" className="nav-mark" aria-label="TorchNova home">
          <Spark />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#philosophy" className="c1">Philosophy</Link>
          <Link href="/#platform" className="c3">Platform</Link>
          <Link href="/#principles" className="c4">Principles</Link>
          <Link href="/#contact" className="c5">Contact</Link>
          <Link href="/demo" className="c7">Request a demo</Link>
        </nav>
      </div>
    </header>
  );
}
