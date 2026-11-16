import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Motion } from "./Motion";

interface SiteShellProps {
  children: ReactNode;
  /** Optional element rendered above the navigation (the home wordmark). */
  masthead?: ReactNode;
  /** Page tone; the header blends against either. */
  tone?: "light" | "dark";
}

export function SiteShell({ children, masthead, tone = "light" }: SiteShellProps) {
  return (
    <div className={`site tone-${tone}`} id="top">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {masthead}
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <Motion />
    </div>
  );
}
