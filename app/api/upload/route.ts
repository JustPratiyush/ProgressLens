import { NextResponse } from "next/server";
import { bulkUpsertStudents, clearAllStudents } from "@/lib/server/data";

export async function POST(req: Request) {
  try {
    const { rows, mapping, replaceAll = false } = await req.json();

    if (!Array.isArray(rows) || !mapping) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No data rows provided" },
        { status: 400 }
      );
    }

    if (replaceAll) {
      await clearAllStudents();
    }

    const processed = await bulkUpsertStudents(rows, mapping);

    return NextResponse.json({
      processed,
      message: replaceAll
        ? "All data replaced successfully"
        : "Data uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
