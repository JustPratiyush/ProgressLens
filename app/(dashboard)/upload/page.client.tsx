"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { FileUpload } from "@/components/upload/file-upload";
import { DataPreview } from "@/components/upload/data-preview";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

type ParsedRow = Record<string, string>;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UploadClient() {
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [replaceAll, setReplaceAll] = useState(false);
  const { toast } = useToast();

  // Fetch current data to show what's already uploaded
  const { data: currentData } = useSWR("/api/dashboard", fetcher);

  async function handleUpload(file: File) {
    const text = await file.text();
    const [headerLine, ...dataLines] = text.split(/\r?\n/).filter(Boolean);
    const cols = headerLine.split(",").map((c) => c.trim());
    const parsed: ParsedRow[] = dataLines.slice(0, 100).map((line) => {
      const values = line.split(",");
      const obj: ParsedRow = {};
      cols.forEach((c, i) => (obj[c] = (values[i] ?? "").trim()));
      return obj;
    });
    setColumns(cols);
    setRows(parsed);
    setMapping({
      name: cols.find((c) => /name/i.test(c)) || cols[0],
      email: cols.find((c) => /email/i.test(c)) || cols[1] || cols[0],
      class:
        cols.find((c) => /(class|grade|section)/i.test(c)) ||
        cols[2] ||
        cols[0],
      riskLevel:
        cols.find((c) => /(risk.*level|risklevel)/i.test(c)) ||
        cols[3] ||
        cols[0],
      riskScore:
        cols.find((c) => /(risk.*score|riskscore)/i.test(c)) ||
        cols[4] ||
        cols[0],
      attendance:
        cols.find((c) => /(attendance|attend)/i.test(c)) || cols[5] || cols[0],
      averageGrade:
        cols.find((c) => /(avg|average|grade)/i.test(c)) || cols[6] || cols[0],
      lastActivity:
        cols.find((c) => /(last.*activity|lastactivity|date)/i.test(c)) ||
        cols[7] ||
        cols[0],
    });
  }

  async function processUpload() {
    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, mapping, replaceAll }),
      });

      if (!res.ok) throw new Error("Upload failed");

      const result = await res.json();

      toast({
        title: "Upload processed",
        description:
          result.message || "Student records have been added/updated.",
      });

      // Refresh all data across the app
      await mutate("/api/dashboard");
      await mutate("/api/students");

      setRows([]);
      setColumns([]);
      setMapping({});
      setReplaceAll(false);
    } catch (e: any) {
      toast({
        title: "Upload failed",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-2xl font-semibold tracking-tight">Upload Data</h1>
      </div>

      {/* Current Data Summary */}
      {currentData && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <h3 className="font-medium mb-2">Current Data Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Students:</span>
              <div className="font-medium">{currentData.totalStudents}</div>
            </div>
            <div>
              <span className="text-muted-foreground">At Risk:</span>
              <div className="font-medium text-yellow-600">
                {currentData.atRiskCount}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Critical:</span>
              <div className="font-medium text-red-600">
                {currentData.criticalCount}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Recent Alerts:</span>
              <div className="font-medium">
                {currentData.recentAlerts?.length || 0}
              </div>
            </div>
          </div>
        </div>
      )}

      <FileUpload
        acceptedTypes={[
          "text/csv",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ]}
        maxSize={2 * 1024 * 1024}
        onUpload={handleUpload}
      />
      {rows.length > 0 && (
        <>
          <DataPreview
            rows={rows.slice(0, 10)}
            columns={columns}
            mapping={mapping}
            onMappingChange={setMapping}
          />

          <div className="flex items-center space-x-2">
            <Checkbox
              id="replaceAll"
              checked={replaceAll}
              onCheckedChange={(checked) => setReplaceAll(checked as boolean)}
            />
            <Label htmlFor="replaceAll" className="text-sm">
              Replace all existing data with this upload
            </Label>
          </div>

          <div className="flex justify-end">
            <Button onClick={processUpload} disabled={uploading}>
              {uploading ? "Processing..." : "Process Upload"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
