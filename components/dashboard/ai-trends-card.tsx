import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Bell, TrendingUp, AlertTriangle } from "lucide-react";

const trends = [
  {
    icon: TrendingUp,
    title: "Positive Trend: Class 11B",
    description:
      "Average grades in Class 11B have increased by 8% over the last month, correlating with increased project-based learning.",
    color: "text-emerald-500",
  },
  {
    icon: AlertTriangle,
    title: "Negative Trend: 10A Attendance",
    description:
      "Attendance in 10A has dropped by 15% on Fridays. AI suggests this may be due to the timing of weekly tests.",
    color: "text-amber-500",
  },
  {
    icon: Bell,
    title: "Critical Alert: Marcus Lee",
    description:
      "Marcus Lee's assignment submission rate has dropped to 20% in the last two weeks, a significant deviation from his 95% average.",
    color: "text-red-500",
  },
];

export function AITrendsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Generated Trends & Alerts</CardTitle>
        <CardDescription>
          Actionable insights identified from student data patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-6">
          {trends.map((trend) => {
            const Icon = trend.icon;
            return (
              <li key={trend.title} className="flex items-start gap-4">
                <div className={`mt-1 ${trend.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">{trend.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {trend.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
