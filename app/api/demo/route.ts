import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { sendDemoEmails } from "@/lib/email";
import { demoRequestSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { checkEmailDeliverable } from "@/lib/email-check";
import type { DemoResponse } from "@/types";

export async function POST(request: Request): Promise<NextResponse<DemoResponse>> {
  const limit = rateLimit(`demo:${clientIp(request)}`, { limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // Requests are tiny; refuse anything large before parsing it.
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 8_192) {
    return NextResponse.json({ ok: false, message: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Answer with a benign success
  // and write nothing, so it can't tell it was caught.
  const honeypot = (body as Record<string, unknown> | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  let data;
  try {
    data = demoRequestSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      return NextResponse.json(
        { ok: false, message: "Please fix the highlighted fields.", fieldErrors },
        { status: 400 },
      );
    }
    throw err;
  }

  const deliverable = await checkEmailDeliverable(data.email);
  if (!deliverable.ok) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", fieldErrors: { email: deliverable.message } },
      { status: 400 },
    );
  }

  // One confirmation email per address per day, so the form can't be used
  // to send repeated mail to someone else's inbox.
  let recentForEmail = 0;
  try {
    const { agreeToPrivacy: _consent, ...record } = data;
    recentForEmail = await prisma.demoRequest.count({
      where: { email: record.email, createdAt: { gt: new Date(Date.now() - 86_400_000) } },
    });
    await prisma.demoRequest.create({ data: { ...record, consentAt: new Date() } });
  } catch (err) {
    console.error("[demo] failed to store request", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  // Email failures are logged inside and never fail the request.
  await sendDemoEmails(data, { confirm: recentForEmail === 0 });

  return NextResponse.json({ ok: true }, { status: 201 });
}
