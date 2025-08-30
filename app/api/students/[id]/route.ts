import { NextResponse } from "next/server"
import { getStudentById, updateStudent, deleteStudent } from "@/lib/server/data"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const s = await getStudentById(params.id)
  if (!s) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(s)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const updates = await req.json()
  const s = await updateStudent(params.id, updates)
  if (!s) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json(s)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const ok = await deleteStudent(params.id)
  if (!ok) return NextResponse.json({ message: "Not found" }, { status: 404 })
  return NextResponse.json({ ok: true })
}
