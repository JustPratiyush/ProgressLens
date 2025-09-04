import { cn } from "@/lib/utils"
import type { RiskLevel } from "@/lib/types/student"

export function RiskIndicator({
  level,
  score,
  size = "md",
}: {
  level: RiskLevel
  score?: number
  size?: "sm" | "md" | "lg"
}) {
  const color =
    level === "critical"
      ? "bg-red-100 text-red-700"
      : level === "warning"
        ? "bg-amber-100 text-amber-700"
        : "bg-emerald-100 text-emerald-700"
  const px = size === "sm" ? "px-2 py-0.5 text-xs" : size === "lg" ? "px-3 py-1 text-sm" : "px-2.5 py-0.5 text-sm"
  return (
    <span className={cn("inline-flex items-center rounded-full font-medium", color, px)} aria-label={`Risk ${level}`}>
      {level}
      {typeof score === "number" ? ` · ${score}` : ""}
    </span>
  )
}
