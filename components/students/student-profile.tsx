"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RiskIndicator } from "./risk-indicator";
import type { Student } from "@/lib/types/student";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChatWidget from "../dashboard/ChatWidget";
import { toast } from "sonner";

export function StudentProfile({
  loading,
  error,
  student,
  onRefresh,
}: {
  loading: boolean;
  error: boolean;
  student?: Student;
  onRefresh?: () => void;
}) {
  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error || !student)
    return (
      <p className="text-sm text-muted-foreground">Could not load student.</p>
    );

  const trendData = [
    { name: "W1", score: Math.max(0, student.averageGrade - 6) },
    { name: "W2", score: Math.max(0, student.averageGrade - 3) },
    { name: "W3", score: student.averageGrade },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{student.name}</h1>
          <p className="text-sm text-muted-foreground">
            {student.class} · {student.email}
          </p>
        </div>
        <RiskIndicator level={student.riskLevel} score={student.riskScore} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm">{student.attendance}%</div>
            <Progress value={student.attendance} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Average Test Scores</CardTitle>
          </CardHeader>
          <CardContent className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Timeline & Interventions</CardTitle>
        </CardHeader>
        <CardContent>
          {student.interventions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No interventions yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {student.interventions.map((i) => (
                <li key={i.id} className="text-sm">
                  <span className="font-medium">
                    {new Date(i.date).toLocaleString()}:
                  </span>{" "}
                  <span>{i.note}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex gap-2">
            <Button variant="outline" onClick={onRefresh}>
              Add note (MVP placeholder)
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="https://meet.google.com/landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                Schedule meeting
              </Link>
            </Button>

            <Button
              onClick={async () => {
                const promise = fetch("/api/email", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    to: "omkarpadalkar21@gmail.com",
                    name: student.name,
                    attendance: student.attendance,
                    className: student.class,
                  }),
                });

                toast.promise(promise, {
                  loading: "Sending email...",
                  success: "Email sent successfully",
                  error: "Failed to send email",
                });
              }}
            >
              Email student
            </Button>

            <Button>Mark intervention</Button>
          </div>
        </CardContent>
      </Card>
      <ChatWidget />
    </div>
  );
}
