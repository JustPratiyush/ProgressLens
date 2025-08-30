import type { DashboardSummary } from "@/lib/types/dashboard";
import type { Student } from "@/lib/types/student";

// Start with empty array - data will be populated dynamically from CSV uploads
let STUDENTS: Student[] = [];

function computeSummary(): DashboardSummary {
  const total = STUDENTS.length;
  const atRisk = STUDENTS.filter((s) => s.riskLevel !== "safe").length;
  const critical = STUDENTS.filter((s) => s.riskLevel === "critical").length;
  const riskDistribution = [
    {
      level: "safe",
      count: STUDENTS.filter((s) => s.riskLevel === "safe").length,
    },
    {
      level: "warning",
      count: STUDENTS.filter((s) => s.riskLevel === "warning").length,
    },
    {
      level: "critical",
      count: STUDENTS.filter((s) => s.riskLevel === "critical").length,
    },
  ];
  const recentAlerts = STUDENTS.filter((s) => s.riskLevel !== "safe")
    .slice(0, 5)
    .map((s, i) => ({
      id: `a-${i}`,
      studentId: s.id,
      message: `${s.name} marked as ${s.riskLevel} (score ${s.riskScore})`,
      level:
        s.riskLevel === "critical"
          ? "critical"
          : ("warning" as "warning" | "critical"),
      date: new Date().toISOString(),
    }));
  return {
    totalStudents: total,
    atRiskCount: atRisk,
    criticalCount: critical,
    recentAlerts,
    riskDistribution,
  };
}

export async function getDashboardSummary() {
  return computeSummary();
}

export async function listStudents() {
  return STUDENTS;
}

export async function getStudentById(id: string) {
  return STUDENTS.find((s) => s.id === id);
}

export async function createStudent(payload: Partial<Student>) {
  const id = `s-${Math.random().toString(36).slice(2, 8)}`;
  const now = new Date().toISOString();
  const s: Student = {
    id,
    name: payload.name || "Unnamed",
    email: payload.email || "",
    class: payload.class || "",
    riskLevel: payload.riskLevel || "safe",
    riskScore: payload.riskScore ?? 0,
    attendance: payload.attendance ?? 0,
    averageGrade: payload.averageGrade ?? 0,
    lastActivity: now,
    mentor: payload.mentor,
    interventions: payload.interventions ?? [],
  };
  STUDENTS.unshift(s);
  return s;
}

export async function updateStudent(id: string, updates: Partial<Student>) {
  const idx = STUDENTS.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  const merged = {
    ...STUDENTS[idx],
    ...updates,
    lastActivity: new Date().toISOString(),
  };
  STUDENTS[idx] = merged;
  return merged;
}

export async function deleteStudent(id: string) {
  const before = STUDENTS.length;
  STUDENTS = STUDENTS.filter((s) => s.id !== id);
  return STUDENTS.length < before;
}

export async function clearAllStudents() {
  const count = STUDENTS.length;
  STUDENTS = [];
  return count;
}

export async function getStudentCount() {
  return STUDENTS.length;
}

export async function bulkUpsertStudents(
  rows: Record<string, string>[],
  mapping: Record<string, string>
) {
  let processed = 0;

  // Clear existing data if this is a fresh upload
  if (STUDENTS.length === 0) {
    STUDENTS = [];
  }

  for (const row of rows) {
    const name = row[mapping.name];
    if (!name) continue;

    const email = row[mapping.email] || "";
    const existing = STUDENTS.find(
      (s) => s.email && s.email.toLowerCase() === email.toLowerCase()
    );

    // Parse the data with proper type conversion and validation
    const payload: Partial<Student> = {
      name,
      email,
      class: row[mapping.class] || "",
      riskScore: Number(row[mapping.riskScore] ?? 0),
      attendance: Number(row[mapping.attendance] ?? 0),
      averageGrade: Number(row[mapping.averageGrade] ?? 0),
    };

    // Use existing riskLevel if available, otherwise calculate from riskScore
    if (row[mapping.riskLevel]) {
      const riskLevel = row[mapping.riskLevel].toLowerCase();
      if (["safe", "warning", "critical"].includes(riskLevel)) {
        payload.riskLevel = riskLevel as "safe" | "warning" | "critical";
      } else {
        // Fallback calculation if riskLevel is invalid
        payload.riskLevel =
          (payload.riskScore ?? 0) >= 75
            ? "critical"
            : (payload.riskScore ?? 0) >= 40
            ? "warning"
            : "safe";
      }
    } else {
      // Fallback calculation if riskLevel is not provided
      payload.riskLevel =
        (payload.riskScore ?? 0) >= 75
          ? "critical"
          : (payload.riskScore ?? 0) >= 40
          ? "warning"
          : "safe";
    }

    // Handle lastActivity if available
    if (row[mapping.lastActivity]) {
      try {
        const date = new Date(row[mapping.lastActivity]);
        if (!isNaN(date.getTime())) {
          payload.lastActivity = date.toISOString();
        } else {
          payload.lastActivity = new Date().toISOString();
        }
      } catch (e) {
        // If date parsing fails, use current time
        payload.lastActivity = new Date().toISOString();
      }
    } else {
      payload.lastActivity = new Date().toISOString();
    }

    // Add default mentor if not provided
    if (!payload.mentor) {
      payload.mentor = "Unassigned";
    }

    if (existing) {
      await updateStudent(existing.id, payload);
    } else {
      await createStudent(payload);
    }
    processed++;
  }
  return processed;
}
