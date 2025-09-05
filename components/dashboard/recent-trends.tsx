import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentTrends({
  trends,
  loading,
}: {
  trends?: string[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-5 w-full bg-muted rounded" />
            <div className="h-5 w-3/4 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Trends (AI)</CardTitle>
      </CardHeader>
      <CardContent>
        {trends?.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No trends identified yet.
          </p>
        ) : (
          <ul className="space-y-3 list-decimal list-inside">
            {trends?.map((trend, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {trend}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
