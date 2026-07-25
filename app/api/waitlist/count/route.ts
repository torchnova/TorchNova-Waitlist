import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.user.count();

    return NextResponse.json(
      { count },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (err) {
    console.error("[waitlist/count] unexpected error", err);
    return NextResponse.json(
      { message: "Unable to load waitlist count." },
      { status: 500 },
    );
  }
}
