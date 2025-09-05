import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://amo0on.app.n8n.cloud/webhook/e528a408-e476-4094-acb0-93a5d6fb69c7/chat"
  );
  const html = await res.text();
  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
