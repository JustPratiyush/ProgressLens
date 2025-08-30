"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DataPreview({
  rows,
  columns,
  mapping,
  onMappingChange,
}: {
  rows: Record<string, string>[];
  columns: string[];
  mapping: Record<string, string>;
  onMappingChange: (m: Record<string, string>) => void;
}) {
  const fields: { key: string; label: string }[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "class", label: "Class" },
    { key: "riskLevel", label: "Risk Level" },
    { key: "riskScore", label: "Risk Score" },
    { key: "attendance", label: "Attendance" },
    { key: "averageGrade", label: "Average Grade" },
    { key: "lastActivity", label: "Last Activity" },
  ];

  function setField(key: string, value: string) {
    onMappingChange({ ...mapping, [key]: value });
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1">
              <div className="text-xs text-muted-foreground">{f.label}</div>
              <Select
                value={mapping[f.key]}
                onValueChange={(v) => setField(f.key, v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </Card>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted">
              {columns.map((c) => (
                <th key={c} className="px-3 py-2 text-left">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t">
                {columns.map((c) => (
                  <td key={c} className="px-3 py-2">
                    {r[c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
