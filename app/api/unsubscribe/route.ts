import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientIp } from "@/lib/rate-limit";

/**
 * Removes a user from the waitlist by their opaque unsubscribe token.
 * POST-only on purpose: email clients/scanners prefetch links (GET), so a GET
 * must never delete. Idempotent — unsubscribing twice is still a success.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`unsub:${clientIp(request)}`, {
    limit: 10,
    windowMs: 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 },
    );
  }

  const token = (body as Record<string, unknown> | null)?.token;
  if (typeof token !== "string" || token.length < 8) {
    return NextResponse.json(
      { ok: false, message: "Invalid or missing unsubscribe token." },
      { status: 400 },
    );
  }

  try {
    await prisma.user.deleteMany({ where: { unsubscribeToken: token } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[unsubscribe] unexpected error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
