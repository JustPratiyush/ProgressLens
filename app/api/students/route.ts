import { NextResponse } from "next/server"
import { listStudents, createStudent } from "@/lib/server/data"

export async function GET() {
  const students = await listStudents()
  return NextResponse.json(students)
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = await createStudent(body)
  return NextResponse.json(created, { status: 201 })
}
