"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Mock data showing the importance of each feature in the model's prediction
const featureImportanceData = [
  { feature: "2nd Sem Grade", importance: 0.91 },
  { feature: "Attendance", importance: 0.85 },
  { feature: "Tuition Fees", importance: 0.76 },
  { feature: "Scholarship", importance: 0.68 },
  { feature: "1st Sem Grade", importance: 0.62 },
  { feature: "Admission Grade", importance: 0.45 },
].sort((a, b) => a.importance - b.importance); // Sort for horizontal bar chart

export function KeyFactorsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Predictive Factors</CardTitle>
        <CardDescription>
          The most influential data points in predicting student risk, according
          to the model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={featureImportanceData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="feature"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  background: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar dataKey="importance" fill="#3b82f6" radius={[4, 4, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
