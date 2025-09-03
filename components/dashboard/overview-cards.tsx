import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { DashboardSummary } from "@/lib/types/dashboard";

export function OverviewCards({
  loading,
  error,
  summary,
}: {
  loading: boolean;
  error: boolean;
  summary?: DashboardSummary;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((k) => (
          <Card key={k}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  if (error || !summary) {
    return (
      <p className="text-sm text-muted-foreground">Failed to load summary.</p>
    );
  }
  const items = [
    { label: "Total Students", value: summary.totalStudents, type: "neutral" },
    { label: "At Risk", value: summary.atRiskCount, type: "warning" },
    { label: "Critical", value: summary.criticalCount, type: "critical" },
    {
      label: "Recent Alerts",
      value: summary.recentAlerts.length,
      type: "neutral",
    },
  ];

  const getLabelColor = (type: string) => {
    switch (type) {
      case "safe":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it) => (
        <Card key={it.label}>
          <CardHeader className="pb-2">
            <CardTitle className={`text-sm ${getLabelColor(it.type)}`}>
              {it.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
