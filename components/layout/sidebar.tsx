"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Upload, Settings } from "lucide-react"

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/students", label: "Students", icon: Users },
  { href: "/upload", label: "Upload Data", icon: Upload },
]

export function Sidebar() {
  const pathname = usePathname()
  const [role, setRole] = useState<string>("teacher")
  useEffect(() => {
    setRole(window.localStorage.getItem("role") || "teacher")
  }, [])

  return (
    <nav className="rounded-lg border bg-card p-2">
      <ul className="space-y-1">
        {links.map((l) => {
          const Icon = l.icon
          const active = pathname.startsWith(l.href)
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <Icon size={18} />
                <span>{l.label}</span>
              </Link>
            </li>
          )
        })}
        {role === "admin" && (
          <li>
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                pathname.startsWith("/settings") ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
