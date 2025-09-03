"use client"

import { useEffect, useState } from "react"

export default function SettingsPage() {
  const [role, setRole] = useState<string>("teacher")
  useEffect(() => {
    const r = window.localStorage.getItem("role") || "teacher"
    setRole(r)
  }, [])

  if (role !== "admin") {
    return (
      <p className="text-sm text-muted-foreground">
        Settings are visible to admin only. Use the role switcher in the header to change role.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <div className="rounded-lg border bg-card p-4">
        <h2 className="font-medium mb-2">General</h2>
        <p className="text-sm text-muted-foreground">Project settings placeholder for MVP.</p>
      </div>
    </div>
  )
}
