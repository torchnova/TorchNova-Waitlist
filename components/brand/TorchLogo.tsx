/** The four-point spark from the TorchNova mark. */
export const SPARK_PATH =
  "M160 18C160 72 181 103 222 119C252 131 291 137 322 140C291 143 252 149 222 161C183 176 171 201 168 247L160 322L152 247C149 201 137 176 98 161C68 149 29 143 -2 140C29 137 68 131 98 119C139 103 160 72 160 18Z";

/** Small monochrome spark — the site's only logo mark. Inherits currentColor. */
export function Spark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="-4 14 328 312"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={SPARK_PATH} fill="currentColor" />
    </svg>
  );
}
