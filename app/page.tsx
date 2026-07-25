import { Blobs } from "@/components/landing/Blobs";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";

export default function HomePage() {
  return (
    <div className="page">
      <Blobs />
      <Nav />
      <Hero />
    </div>
  );
}
