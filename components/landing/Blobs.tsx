/**
 * Ambient blurred colour blobs the glass surfaces refract.
 * Pure CSS animation (see globals.css) for performance — no JS on the paint path.
 */
export function Blobs() {
  return (
    <div className="blobs" aria-hidden="true">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
    </div>
  );
}
