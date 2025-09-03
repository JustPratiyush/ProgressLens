"use client"

import useSWR from "swr"
import { StudentProfile } from "@/components/students/student-profile"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function StudentProfileClient({ id }: { id: string }) {
  const { data, isLoading, error, mutate } = useSWR(`/api/students/${id}`, fetcher)
  return (
    <div className="space-y-6">
      <StudentProfile loading={isLoading} error={!!error} student={data} onRefresh={() => mutate()} />
    </div>
  )
}
