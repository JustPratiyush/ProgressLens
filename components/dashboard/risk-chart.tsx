"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RiskChart({
  loading,
  data,
}: {
  loading: boolean;
  data: { level: string; count: number }[];
}) {
  // Add some debugging
  console.log("RiskChart data:", data);

  // Define colors for each risk level
  const getBarColor = (level: string) => {
    switch (level) {
      case "safe":
        return "#10b981"; // green-500
      case "warning":
        return "#f59e0b"; // yellow-500
      case "critical":
        return "#ef4444"; // red-500
      default:
        return "#3b82f6"; // blue-500
    }
  };

  // Ensure data is properly formatted
  const chartData =
    data?.length > 0
      ? data
      : [
          { level: "safe", count: 0 },
          { level: "warning", count: 0 },
          { level: "critical", count: 0 },
        ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px]">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="level"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => [value, "Students"]}
                labelFormatter={(label) =>
                  `Risk Level: ${
                    label.charAt(0).toUpperCase() + label.slice(1)
                  }`
                }
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.level)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
