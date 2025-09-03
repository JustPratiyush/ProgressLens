"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { RiskIndicator } from "./risk-indicator";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { Student } from "@/lib/types/student";

type SortField =
  | "name"
  | "class"
  | "riskLevel"
  | "riskScore"
  | "attendance"
  | "averageGrade"
  | "lastActivity";
type SortDirection = "asc" | "desc";

export function StudentTable({
  loading,
  error,
  students,
  onRefresh,
}: {
  loading: boolean;
  error: boolean;
  students: Student[];
  onRefresh?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [riskFilter, setRiskFilter] = useState<
    "all" | "safe" | "warning" | "critical"
  >("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.class.toLowerCase().includes(query.toLowerCase()) ||
        s.email.toLowerCase().includes(query.toLowerCase());
      const matchesRisk =
        riskFilter === "all" ? true : s.riskLevel === riskFilter;
      return matchesQuery && matchesRisk;
    });
  }, [students, query, riskFilter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle special cases
      if (sortField === "riskLevel") {
        const riskOrder = { safe: 1, warning: 2, critical: 3 };
        aValue = riskOrder[a.riskLevel as keyof typeof riskOrder];
        bValue = riskOrder[b.riskLevel as keyof typeof riskOrder];
      } else if (sortField === "lastActivity") {
        aValue = new Date(a.lastActivity).getTime();
        bValue = new Date(b.lastActivity).getTime();
      }

      // Handle numeric values
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle string values
      if (typeof aValue === "string" && typeof bValue === "string") {
        const result = aValue.localeCompare(bValue);
        return sortDirection === "asc" ? result : -result;
      }

      return 0;
    });
  }, [filtered, sortField, sortDirection]);

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  }

  function getSortIcon(field: SortField) {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  }

  const allSelected = sorted.length > 0 && sorted.every((s) => selected[s.id]);

  function toggleAll(v: boolean) {
    const next = { ...selected };
    sorted.forEach((s) => (next[s.id] = v));
    setSelected(next);
  }

  function toggleOne(id: string, v: boolean) {
    setSelected((prev) => ({ ...prev, [id]: v }));
  }

  function exportCSV() {
    const rows = (
      Object.keys(selected).length
        ? students.filter((s) => selected[s.id])
        : filtered
    ).map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      class: s.class,
      riskLevel: s.riskLevel,
      riskScore: s.riskScore,
      attendance: s.attendance,
      averageGrade: s.averageGrade,
      lastActivity: s.lastActivity,
    }));
    const header = Object.keys(
      rows[0] ?? {
        id: "",
        name: "",
        email: "",
        class: "",
        riskLevel: "",
        riskScore: "",
        attendance: "",
        averageGrade: "",
        lastActivity: "",
      }
    );
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header.map((h) => `${r[h as keyof typeof r]}`).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <Input
          placeholder="Search by name, class, or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {(["all", "safe", "warning", "critical"] as const).map((r) => (
            <Button
              key={r}
              size="sm"
              variant={riskFilter === r ? "default" : "outline"}
              onClick={() => setRiskFilter(r)}
            >
              {r}
            </Button>
          ))}
        </div>
        <div className="ms-auto flex items-center gap-2">
          <Button variant="outline" onClick={exportCSV}>
            Export CSV
          </Button>
          <Button variant="secondary" onClick={onRefresh}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b">
              <th className="py-2 px-2">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                  aria-label="Select all"
                />
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("name")}
                >
                  Name
                  {getSortIcon("name")}
                </Button>
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("class")}
                >
                  Class
                  {getSortIcon("class")}
                </Button>
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("riskLevel")}
                >
                  Risk
                  {getSortIcon("riskLevel")}
                </Button>
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("attendance")}
                >
                  Attendance
                  {getSortIcon("attendance")}
                </Button>
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("averageGrade")}
                >
                  Avg Grade
                  {getSortIcon("averageGrade")}
                </Button>
              </th>
              <th className="py-2 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-medium hover:bg-transparent"
                  onClick={() => handleSort("lastActivity")}
                >
                  Updated
                  {getSortIcon("lastActivity")}
                </Button>
              </th>
              <th className="py-2 px-2" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-muted-foreground"
                >
                  Failed to load.
                </td>
              </tr>
            ) : sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-6 text-center text-muted-foreground"
                >
                  No students found.
                </td>
              </tr>
            ) : (
              sorted.map((s) => (
                <tr key={s.id} className="border-b hover:bg-muted/50">
                  <td className="py-2 px-2">
                    <Checkbox
                      checked={!!selected[s.id]}
                      onCheckedChange={(v) => toggleOne(s.id, Boolean(v))}
                      aria-label={`Select ${s.name}`}
                    />
                  </td>
                  <td className="py-2 px-2">
                    <Link
                      href={`/students/${s.id}`}
                      className="font-medium hover:underline"
                    >
                      {s.name}
                    </Link>
                    <div className="text-muted-foreground">{s.email}</div>
                  </td>
                  <td className="py-2 px-2">{s.class}</td>
                  <td className="py-2 px-2">
                    <RiskIndicator
                      level={s.riskLevel}
                      score={s.riskScore}
                      size="sm"
                    />
                  </td>
                  <td className="py-2 px-2">{s.attendance}%</td>
                  <td className="py-2 px-2">{s.averageGrade}%</td>
                  <td className="py-2 px-2">
                    {new Date(s.lastActivity).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2">
                    <Link href={`/students/${s.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
