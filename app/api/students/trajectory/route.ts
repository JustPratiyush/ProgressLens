import { NextResponse } from "next/server";
import { listStudents } from "@/lib/server/data";
import type { Student } from "@/lib/types/student";

// This function determines the quadrant for color-coding
function getQuadrant(gradeChange: number, attendanceChange: number): string {
  if (gradeChange >= 0 && attendanceChange >= 0) return "star"; // Top-right
  if (gradeChange < 0 && attendanceChange < 0) return "concern"; // Bottom-left
  if (gradeChange < 0 && attendanceChange >= 0) return "burnout"; // Top-left
  return "disengaged"; // Bottom-right
}

export async function GET() {
  try {
    const allStudents = await listStudents();

    // Since we don't have historical data, we will simulate a plausible
    // "change over the last 30 days" for each student.
    const trajectoryData = allStudents.map((student: Student) => {
      // Simulate grade change: random number between -15 and +15
      const gradeChange = Math.floor(Math.random() * 31) - 15;
      // Simulate attendance change: random number between -20 and +20
      const attendanceChange = Math.floor(Math.random() * 41) - 20;

      return {
        name: student.name,
        gradeChange,
        attendanceChange,
        quadrant: getQuadrant(gradeChange, attendanceChange),
      };
    });

    return NextResponse.json(trajectoryData);
  } catch (error) {
    console.error("Failed to generate trajectory data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
