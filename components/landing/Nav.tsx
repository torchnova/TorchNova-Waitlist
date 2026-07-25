import Link from "next/link";
import { TorchWordmark } from "@/components/brand/TorchLogo";

interface NavProps {
  /** Optional right-hand note. Omitted on the landing page. */
  note?: string;
}

export function Nav({ note }: NavProps) {
  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <TorchWordmark />
      </Link>
      {note ? <div className="nav-note">{note}</div> : null}
    </nav>
  );
}
