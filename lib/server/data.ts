import type { DashboardSummary } from "@/lib/types/dashboard";
import type { Student } from "@/lib/types/student";
import { connectDB } from "@/lib/database";
import StudentModel from "@/lib/database/models/student";

function computeSummaryFromDocs(docs: any[]): DashboardSummary {
  const total = docs.length;
  const atRisk = docs.filter((s) => s.riskLevel !== "safe").length;
  const critical = docs.filter((s) => s.riskLevel === "critical").length;
  const riskDistribution = [
    { level: "safe", count: docs.filter((s) => s.riskLevel === "safe").length },
    {
      level: "warning",
      count: docs.filter((s) => s.riskLevel === "warning").length,
    },
    {
      level: "critical",
      count: docs.filter((s) => s.riskLevel === "critical").length,
    },
  ];
  const recentAlerts = docs
    .filter((s) => s.riskLevel !== "safe")
    .slice(0, 5)
    .map((s, i) => ({
      id: `a-${i}`,
      studentId: s.id,
      message: `${s.name} marked as ${s.riskLevel} (score ${s.riskScore})`,
      level: s.riskLevel === "critical" ? "critical" : ("warning" as const),
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
  await connectDB();
  const docs = await StudentModel.find({}).lean();
  return computeSummaryFromDocs(docs as any[]);
}

export async function listStudents(): Promise<Student[]> {
  await connectDB();
  const docs = await StudentModel.find({}).sort({ createdAt: -1 }).lean();
  // lastActivity already converted to ISO in schema toJSON, but lean() bypasses it; normalize here
  return docs.map((d: any) => ({
    id: d.id,
    name: d.name,
    email: d.email ?? "",
    class: d.class ?? "",
    riskLevel: d.riskLevel,
    riskScore: d.riskScore ?? 0,
    attendance: d.attendance ?? 0,
    averageGrade: d.averageGrade ?? 0,
    lastActivity: d.lastActivity
      ? new Date(d.lastActivity).toISOString()
      : new Date().toISOString(),
    mentor: d.mentor,
    interventions: d.interventions ?? [],
  }));
}

export async function getStudentById(id: string): Promise<Student | null> {
  await connectDB();
  const d = await StudentModel.findOne({ id }).lean();
  if (!d) return null;
  return {
    id: d.id,
    name: d.name,
    email: d.email ?? "",
    class: d.class ?? "",
    riskLevel: d.riskLevel as any,
    riskScore: d.riskScore ?? 0,
    attendance: d.attendance ?? 0,
    averageGrade: d.averageGrade ?? 0,
    lastActivity: d.lastActivity
      ? new Date(d.lastActivity).toISOString()
      : new Date().toISOString(),
    mentor: (d as any).mentor,
    interventions: (d as any).interventions ?? [],
  };
}

export async function createStudent(
  payload: Partial<Student>
): Promise<Student> {
  await connectDB();
  const id = payload.id || `s-${Math.random().toString(36).slice(2, 8)}`;
  const doc = await StudentModel.create({
    id,
    name: payload.name || "Unnamed",
    email: payload.email || "",
    class: payload.class || "",
    riskLevel: payload.riskLevel || "safe",
    riskScore: payload.riskScore ?? 0,
    attendance: payload.attendance ?? 0,
    averageGrade: payload.averageGrade ?? 0,
    lastActivity: payload.lastActivity
      ? new Date(payload.lastActivity)
      : new Date(),
    mentor: payload.mentor,
    interventions: payload.interventions ?? [],
  });
  const d: any = doc.toObject();
  return {
    id: d.id,
    name: d.name,
    email: d.email ?? "",
    class: d.class ?? "",
    riskLevel: d.riskLevel,
    riskScore: d.riskScore ?? 0,
    attendance: d.attendance ?? 0,
    averageGrade: d.averageGrade ?? 0,
    lastActivity: new Date(d.lastActivity).toISOString(),
    mentor: d.mentor,
    interventions: d.interventions ?? [],
  };
}

export async function updateStudent(id: string, updates: Partial<Student>) {
  await connectDB();
  const d = await StudentModel.findOneAndUpdate(
    { id },
    {
      ...updates,
      lastActivity: updates.lastActivity
        ? new Date(updates.lastActivity)
        : new Date(),
    },
    { new: true }
  ).lean();
  if (!d) return null;
  return {
    id: d.id,
    name: d.name,
    email: d.email ?? "",
    class: d.class ?? "",
    riskLevel: d.riskLevel as any,
    riskScore: d.riskScore ?? 0,
    attendance: d.attendance ?? 0,
    averageGrade: d.averageGrade ?? 0,
    lastActivity: d.lastActivity
      ? new Date(d.lastActivity).toISOString()
      : new Date().toISOString(),
    mentor: (d as any).mentor,
    interventions: (d as any).interventions ?? [],
  };
}

export async function deleteStudent(id: string) {
  await connectDB();
  const res = await StudentModel.findOneAndDelete({ id });
  return !!res;
}

export async function clearAllStudents() {
  await connectDB();
  const res = await StudentModel.deleteMany({});
  return res.deletedCount ?? 0;
}

export async function getStudentCount() {
  await connectDB();
  return StudentModel.countDocuments();
}

export async function bulkUpsertStudents(
  rows: Record<string, string>[],
  mapping: Record<string, string>
) {
  await connectDB();
  let processed = 0;

  for (const row of rows) {
    const name = row[mapping.name];
    if (!name) continue;

    const email = row[mapping.email] || "";
    const candidateId = row["id"] || undefined;

    const payload: Partial<Student> = {
      id: candidateId,
      name,
      email,
      class: row[mapping.class] || "",
      riskScore: Number(row[mapping.riskScore] ?? 0),
      attendance: Number(row[mapping.attendance] ?? 0),
      averageGrade: Number(row[mapping.averageGrade] ?? 0),
    };

    if (row[mapping.riskLevel]) {
      const riskLevel = row[mapping.riskLevel].toLowerCase();
      if (["safe", "warning", "critical"].includes(riskLevel)) {
        payload.riskLevel = riskLevel as any;
      } else {
        payload.riskLevel =
          (payload.riskScore ?? 0) >= 75
            ? "critical"
            : (payload.riskScore ?? 0) >= 40
            ? "warning"
            : "safe";
      }
    } else {
      payload.riskLevel =
        (payload.riskScore ?? 0) >= 75
          ? "critical"
          : (payload.riskScore ?? 0) >= 40
          ? "warning"
          : "safe";
    }

    if (row[mapping.lastActivity]) {
      const d = new Date(row[mapping.lastActivity]);
      payload.lastActivity = isNaN(d.getTime())
        ? new Date().toISOString()
        : d.toISOString();
    } else {
      payload.lastActivity = new Date().toISOString();
    }

    // Upsert by "id" (preferred), else by email if available, else by name+class
    const query: any = candidateId
      ? { id: candidateId }
      : email
      ? { email }
      : { name, class: payload.class };

    await StudentModel.findOneAndUpdate(
      query,
      {
        $set: {
          name: payload.name,
          email: payload.email,
          class: payload.class,
          riskLevel: payload.riskLevel,
          riskScore: payload.riskScore,
          attendance: payload.attendance,
          averageGrade: payload.averageGrade,
          lastActivity: new Date(payload.lastActivity as string),
        },
        $setOnInsert: {
          id: candidateId || `s-${Math.random().toString(36).slice(2, 8)}`,
          interventions: [],
        },
      },
      { upsert: true, new: true }
    );

    processed++;
  }

  return processed;
}
