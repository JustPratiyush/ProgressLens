import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const event = (await req.json()) as WebhookEvent;

  if (event.type === "user.created") {
    const emailAddresses = event.data.email_addresses;
    if (emailAddresses && emailAddresses.length > 0) {
      const email = emailAddresses[0].email_address;
      const regex = /^[a-zA-Z0-9._%+-]+@muj\.manipal\.edu$/;

      if (!regex.test(email)) {
        return NextResponse.json(
          { message: "Only MUJ student emails allowed" },
          { status: 400 }
        );
      }
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
