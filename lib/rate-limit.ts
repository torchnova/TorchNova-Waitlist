interface Window {
  count: number;
  resetAt: number;
}

// In-memory fixed-window limiter. Zero-dependency and good enough as a first
// line of defence for a low-traffic waitlist. NOTE: state is per-server-instance,
// so on multi-instance/serverless hosting it limits per instance, not globally —
// swap in Upstash Redis / Vercel KV if you need strict distributed limits.
const store = new Map<string, Window>();

interface RateLimitOptions {
  /** Max requests allowed per window (default 5). */
  limit?: number;
  /** Window length in milliseconds (default 60_000). */
  windowMs?: number;
}

interface RateLimitResult {
  ok: boolean;
  /** Seconds until the window resets (only meaningful when blocked). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: RateLimitOptions = {},
): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup so the map can't grow unbounded.
  if (store.size > 5000) {
    for (const [k, w] of store) {
      if (w.resetAt < now) store.delete(k);
    }
  }

  const win = store.get(key);
  if (!win || win.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (win.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((win.resetAt - now) / 1000) };
  }

  win.count += 1;
  return { ok: true, retryAfter: 0 };
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
