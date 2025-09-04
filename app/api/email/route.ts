import { NextResponse } from "next/server";
import { sendLowAttendanceEmail } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, name, attendance, className } = body || {};

    if (!to || !name) {
      return NextResponse.json(
        { error: "'to' and 'name' are required" },
        { status: 400 }
      );
    }

    await sendLowAttendanceEmail({
      to,
      name,
      attendance: typeof attendance === "number" ? attendance : 0,
      className,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
