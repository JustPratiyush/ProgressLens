"use client"

import useSWR from "swr"
import { StudentTable } from "@/components/students/student-table"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function StudentsClient() {
  const { data, isLoading, error, mutate } = useSWR("/api/students", fetcher)
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
      <StudentTable loading={isLoading} error={!!error} students={data ?? []} onRefresh={() => mutate()} />
    </div>
  )
}
