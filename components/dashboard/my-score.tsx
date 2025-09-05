import { Card, CardContent } from "@/components/ui/card";

export function MyScore({
  score,
  loading,
}: {
  score?: number;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-6 w-1/2 bg-muted rounded mb-2" />
          <div className="h-10 w-1/3 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">My Score</h3>
        <p className="text-4xl font-bold text-primary">{score}%</p>
      </CardContent>
    </Card>
  );
}
