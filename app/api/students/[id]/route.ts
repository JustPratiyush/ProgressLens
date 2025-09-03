import { NextResponse } from "next/server";
import {
  getStudentById,
  updateStudent,
  deleteStudent,
} from "@/lib/server/data";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const s = await getStudentById(id);
  if (!s) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(s);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const updates = await req.json();
  const s = await updateStudent(id, updates);
  if (!s) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(s);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const ok = await deleteStudent(id);
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
