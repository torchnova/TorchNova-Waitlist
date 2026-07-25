import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";
import { registerSchema } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import type { RegisterResponse } from "@/types";

export async function POST(request: Request): Promise<NextResponse<RegisterResponse>> {
  // Rate limit by IP — a cheap first line against spam/abuse.
  const limit = rateLimit(`register:${clientIp(request)}`, {
    limit: 5,
    windowMs: 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, message: "Too many attempts. Please try again in a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // Parse the body defensively — malformed JSON should be a clean 400.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  // Honeypot: if the hidden field is filled, it's a bot. Return a benign
  // success without writing anything, so the bot can't tell it was caught.
  const honeypot = (body as Record<string, unknown> | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json(
      {
        ok: true,
        user: { id: "", username: "", firstName: "", email: "" },
        emailSent: false,
      },
      { status: 201 },
    );
  }

  // Validate against the shared schema (authoritative, server-side).
  let data;
  try {
    data = registerSchema.parse(body);
  } catch (err) {
    if (err instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of err.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      return NextResponse.json(
        { ok: false, message: "Please fix the highlighted fields.", fieldErrors },
        { status: 400 },
      );
    }
    throw err;
  }

  try {
    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { username: data.username }] },
      select: { email: true },
    });

    if (existing) {
      const field = existing.email === data.email ? "email" : "username";
      return NextResponse.json(
        {
          ok: false,
          message: `That ${field} is already registered.`,
          fieldErrors: { [field]: `This ${field} is already taken.` },
        },
        { status: 409 },
      );
    }

    const user = await prisma.user.create({
      data: {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role ?? null,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        email: true,
        unsubscribeToken: true,
      },
    });

    // The signup checkbox is explicit consent to receive this. Email failures
    // are logged inside sendWelcomeEmail and never fail the registration.
    const sent = await sendWelcomeEmail({
      to: user.email,
      firstName: user.firstName,
      unsubscribeToken: user.unsubscribeToken,
    });

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          email: user.email,
        },
        emailSent: sent.ok,
      },
      { status: 201 },
    );
  } catch (err) {
    // Backstop for the race between the check above and the insert.
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const target = err.meta?.target;
      const field = Array.isArray(target) && target.includes("username")
        ? "username"
        : "email";
      return NextResponse.json(
        {
          ok: false,
          message: `That ${field} is already registered.`,
          fieldErrors: { [field]: `This ${field} is already taken.` },
        },
        { status: 409 },
      );
    }

    console.error("[register] unexpected error", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
