import type { DashboardSummary } from "@/lib/types/dashboard";
import type { Student } from "@/lib/types/student";
import { connectDB } from "@/lib/database";
import StudentModel from "@/lib/database/models/student";

function getRiskCategory(
  score: number
): "good" | "safe" | "warning" | "critical" {
  if (score >= 75) return "critical";
  if (score >= 40) return "warning";
  if (score >= 20) return "safe";
  return "good";
}

function computeSummaryFromDocs(docs: any[]): DashboardSummary {
  const total = docs.length;
  const critical = docs.filter(
    (s) => getRiskCategory(s.riskScore) === "critical"
  ).length;
  const atRisk = docs.filter(
    (s) => getRiskCategory(s.riskScore) === "warning"
  ).length;

  const riskDistribution = [
    { level: "critical", count: critical },
    { level: "warning", count: atRisk, label: "Risk" },
    {
      level: "safe",
      count: docs.filter((s) => getRiskCategory(s.riskScore) === "safe").length,
    },
    {
      level: "good",
      count: docs.filter((s) => getRiskCategory(s.riskScore) === "good").length,
    },
  ];

  const recentAlerts = docs
    .filter((s) => {
      const riskCategory = getRiskCategory(s.riskScore);
      return riskCategory === "warning" || riskCategory === "critical";
    })
    .slice(0, 5)
    .map((s, i) => {
      const riskCategory = getRiskCategory(s.riskScore);
      return {
        id: `a-${i}`,
        studentId: s.id,
        message: `${s.name} marked as ${riskCategory} (score ${s.riskScore})`,
        level: (riskCategory === "critical" ? "critical" : "warning") as "critical" | "warning",
        date: new Date().toISOString(),
      };
    });

  const myScore = 75;
  const teachingSubjects = [
    { 
      subject: 'DSA', 
      attendance: '65%', 
      marks: '57%', 
      overallScore: '61%',
      classes: [
        { class: 'CSE 2A', attendance: '60%', marks: '55%', score: '58%' },
        { class: 'CSE 2B', attendance: '70%', marks: '59%', score: '64%' },
      ]
    },
    { 
      subject: 'OOPs', 
      attendance: '92%', 
      marks: '82%', 
      overallScore: '87%',
      classes: [
        { class: 'CSE 3C', attendance: '95%', marks: '85%', score: '90%' },
      ]
    },
    { 
      subject: 'AI/ML', 
      attendance: '78%', 
      marks: '69%', 
      overallScore: '73%',
      classes: [
        { class: 'CSE 3A', attendance: '72%', marks: '65%', score: '69%' },
        { class: 'CSE 3B', attendance: '84%', marks: '79%', score: '81%' },
      ]
    },
  ];
  const recentTrends = [
    "3 students in CSE 4A missed 2 consecutive weeks",
    "Arjun scored <40% in last two tests",
  ];
  return {
    totalStudents: total,
    atRiskCount: atRisk,
    criticalCount: critical,
    recentAlerts,
    riskDistribution,
    myScore,
    teachingSubjects,
    recentTrends,
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
    id: (d as any).id,
    name: (d as any).name,
    email: (d as any).email ?? "",
    class: (d as any).class ?? "",
    riskLevel: (d as any).riskLevel as any,
    riskScore: (d as any).riskScore ?? 0,
    attendance: (d as any).attendance ?? 0,
    averageGrade: (d as any).averageGrade ?? 0,
    lastActivity: (d as any).lastActivity
      ? new Date((d as any).lastActivity).toISOString()
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
    id: (d as any).id,
    name: (d as any).name,
    email: (d as any).email ?? "",
    class: (d as any).class ?? "",
    riskLevel: (d as any).riskLevel as any,
    riskScore: (d as any).riskScore ?? 0,
    attendance: (d as any).attendance ?? 0,
    averageGrade: (d as any).averageGrade ?? 0,
    lastActivity: (d as any).lastActivity
      ? new Date((d as any).lastActivity).toISOString()
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
  const errors: string[] = [];
  
  for (const [index, row] of rows.entries()) {
    try {
      const name = row[mapping.name];
      if (!name) {
        console.log(`Skipping row ${index + 1} because name is missing or unmapped.`);
        continue;
      }
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
    } catch (error) {
      // This will catch and log the error for the specific row that failed.
      console.error(`🔴 FAILED TO PROCESS ROW ${index + 1}:`, row);
      console.error("ERROR DETAILS:", error);
      errors.push(`Row ${index + 1}: ${(error as Error).message}`);
    }
  }

  console.log(`✅ Processed ${processed} rows successfully.`);
  if (errors.length > 0) {
    console.error("Errors encountered:", errors);
  }
  return processed;
}
