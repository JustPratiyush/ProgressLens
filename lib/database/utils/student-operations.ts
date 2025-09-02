import Student, { IStudent } from "../models/student";
import { connectDB } from "../connections/mongodb";
import { CSVRow, CSVMapping, parseCSVRow } from "./csv-parser";

export async function getAllStudents(): Promise<IStudent[]> {
  await connectDB();
  return await Student.find({}).sort({ createdAt: -1 });
}

export async function getStudentById(id: string): Promise<IStudent | null> {
  await connectDB();
  return await Student.findById(id);
}

export async function getStudentsByRiskLevel(
  riskLevel: string
): Promise<IStudent[]> {
  await connectDB();
  return await Student.find({}).where("riskLevel").equals(riskLevel);
}

export async function getStudentsByCourse(course: string): Promise<IStudent[]> {
  await connectDB();
  return await Student.find({ course: { $regex: course, $options: "i" } });
}

export async function getDashboardSummary() {
  await connectDB();

  const totalStudents = await Student.countDocuments();
  const atRiskCount = await Student.countDocuments({ riskLevel: "warning" });
  const criticalCount = await Student.countDocuments({ riskLevel: "critical" });

  // Get recent students (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentStudents = await Student.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  // Get risk distribution
  const riskDistribution = await Student.aggregate([
    {
      $group: {
        _id: "$riskLevel",
        count: { $sum: 1 },
      },
    },
  ]);

  // Get course distribution
  const courseDistribution = await Student.aggregate([
    {
      $group: {
        _id: "$course",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  // Get average grades
  const gradeStats = await Student.aggregate([
    {
      $group: {
        _id: null,
        avgAdmissionGrade: { $avg: "$admissionGrade" },
        avg1stSemGrade: { $avg: "$curricularUnits1stSemGrade" },
        avg2ndSemGrade: { $avg: "$curricularUnits2ndSemGrade" },
      },
    },
  ]);

  return {
    totalStudents,
    atRiskCount,
    criticalCount,
    recentStudents,
    riskDistribution: riskDistribution.map((item) => ({
      level: item._id,
      count: item.count,
    })),
    courseDistribution,
    gradeStats: gradeStats[0] || {
      avgAdmissionGrade: 0,
      avg1stSemGrade: 0,
      avg2ndSemGrade: 0,
    },
  };
}

export async function bulkUpsertStudents(
  rows: CSVRow[],
  mapping: CSVMapping,
  replaceAll: boolean = false
): Promise<{ processed: number; errors: string[] }> {
  await connectDB();

  if (replaceAll) {
    await Student.deleteMany({});
  }

  let processed = 0;
  const errors: string[] = [];

  for (const row of rows) {
    try {
      const studentData = parseCSVRow(row, mapping);

      // Check if student already exists (by email or other unique identifier)
      const existingStudent = await Student.findOne({
        $or: [
          { course: studentData.course },
          {
            curricularUnits1stSemGrade: studentData.curricularUnits1stSemGrade,
            curricularUnits2ndSemGrade: studentData.curricularUnits2ndSemGrade,
          },
        ],
      });

      if (existingStudent && !replaceAll) {
        // Update existing student
        await Student.findByIdAndUpdate(existingStudent._id, studentData, {
          new: true,
        });
      } else {
        // Create new student
        await Student.create(studentData);
      }

      processed++;
    } catch (error) {
      errors.push(
        `Row ${processed + 1}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  return { processed, errors };
}

export async function deleteStudent(id: string): Promise<boolean> {
  await connectDB();
  const result = await Student.findByIdAndDelete(id);
  return !!result;
}

export async function updateStudent(
  id: string,
  data: Partial<IStudent>
): Promise<IStudent | null> {
  await connectDB();
  return await Student.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function searchStudents(query: string): Promise<IStudent[]> {
  await connectDB();

  const searchRegex = { $regex: query, $options: "i" };

  return await Student.find({
    $or: [
      { course: searchRegex },
      { nationality: searchRegex },
      { previousQualification: searchRegex },
      { mothersQualification: searchRegex },
      { fathersQualification: searchRegex },
    ],
  }).sort({ createdAt: -1 });
}

export async function getStudentStats() {
  await connectDB();

  const stats = await Student.aggregate([
    {
      $group: {
        _id: null,
        totalStudents: { $sum: 1 },
        avgAge: { $avg: "$ageAtEnrollment" },
        avgAdmissionGrade: { $avg: "$admissionGrade" },
        avg1stSemGrade: { $avg: "$curricularUnits1stSemGrade" },
        avg2ndSemGrade: { $avg: "$curricularUnits2ndSemGrade" },
        totalScholarshipHolders: {
          $sum: { $cond: ["$scholarshipHolder", 1, 0] },
        },
        totalInternational: { $sum: { $cond: ["$international", 1, 0] } },
        totalDisplaced: { $sum: { $cond: ["$displaced", 1, 0] } },
      },
    },
  ]);

  return (
    stats[0] || {
      totalStudents: 0,
      avgAge: 0,
      avgAdmissionGrade: 0,
      avg1stSemGrade: 0,
      avg2ndSemGrade: 0,
      totalScholarshipHolders: 0,
      totalInternational: 0,
      totalDisplaced: 0,
    }
  );
}
