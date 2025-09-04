import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Item {
  id: string
  studentId: string
  message: string
  level: "warning" | "critical"
  date: string
}

export function ActivityFeed({ loading, items }: { loading: boolean; items: Item[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-5 bg-muted rounded" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No recent activity.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="text-sm">
                <span
                  className={
                    it.level === "critical"
                      ? "text-red-600"
                      : it.level === "warning"
                        ? "text-amber-600"
                        : "text-emerald-600"
                  }
                >
                  {it.message}
                </span>
                <span className="text-muted-foreground"> — {new Date(it.date).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
