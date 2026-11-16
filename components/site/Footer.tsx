import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="grid footer-grid">
        <span className="c0">&copy; {SITE.year} {SITE.name}</span>
        <Link href="/privacy" className="c3">Privacy Policy</Link>
        <Link href="/terms" className="c4">Terms of Service</Link>
        <a href={`mailto:${SITE.contactEmail}`} className="c5">{SITE.contactEmail}</a>
        <a href="#top" className="c7">Back to top</a>
      </div>
    </footer>
  );
}
