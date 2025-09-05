"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Define colors for each risk level to match the prototype
const COLORS = {
  good: "#22c55e", // Green for Good
  safe: "#a3e635", // Light Green for Safe
  warning: "#f59e0b", // Yellow for Risk (Warning)
  critical: "#ef4444", // Red for Critical
};

export function RiskChart({
  loading,
  data,
}: {
  loading: boolean;
  data: { level: string; count: number; label?: string }[];
}) {
  const chartData = data?.length > 0 ? data : [];

  const totalStudentsInChart = chartData.reduce(
    (sum, entry) => sum + entry.count,
    0
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Student Risk Overview</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] relative">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  formatter={(value: number, name: any) => [
                    value,
                    name && typeof name === "string"
                      ? name.charAt(0).toUpperCase() + name.slice(1)
                      : "Students",
                  ]}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="label"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[entry.level as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Legend
                  // UPDATED: Added wrapperStyle to create a gap
                  wrapperStyle={{
                    marginTop: "20px",
                  }}
                  formatter={(value, entry) => (
                    <span className="text-sm capitalize">
                      {entry.payload?.label || value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transform -translate-y-2">
              <span className="text-2xl font-bold">{totalStudentsInChart}</span>
              <span className="text-sm text-muted-foreground">
                Total Students
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
