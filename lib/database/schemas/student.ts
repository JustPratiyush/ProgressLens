import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  // Personal Information
  maritalStatus: string;
  gender: string;
  ageAtEnrollment: number;
  nationality: string;
  international: boolean;

  // Application Information
  applicationMode: string;
  applicationOrder: number;
  course: string;
  daytimeEveningAttendance: string;
  displaced: boolean;

  // Academic Background
  previousQualification: string;
  previousQualificationGrade: string;
  mothersQualification: string;
  fathersQualification: string;
  mothersOccupation: string;
  fathersOccupation: string;
  admissionGrade: number;

  // Special Circumstances
  educationalSpecialNeeds: boolean;
  debtor: boolean;
  tuitionFeesUpToDate: boolean;
  scholarshipHolder: boolean;

  // First Semester Performance
  curricularUnits1stSemCredited: number;
  curricularUnits1stSemEnrolled: number;
  curricularUnits1stSemEvaluations: number;
  curricularUnits1stSemApproved: number;
  curricularUnits1stSemGrade: number;
  curricularUnits1stSemWithoutEvaluations: number;

  // Second Semester Performance
  curricularUnits2ndSemCredited: number;
  curricularUnits2ndSemEnrolled: number;
  curricularUnits2ndSemEvaluations: number;
  curricularUnits2ndSemApproved: number;
  curricularUnits2ndSemGrade: number;
  curricularUnits2ndSemWithoutEvaluations: number;

  // Economic Indicators
  unemploymentRate: number;
  inflationRate: number;
  gdp: number;

  // Target/Outcome
  target: string;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    // Personal Information
    maritalStatus: {
      type: String,
      required: [true, "Marital status is required"],
      trim: true,
      enum: ["Single", "Married", "Divorced", "Widowed", "Other"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: ["Male", "Female", "Other"],
    },
    ageAtEnrollment: {
      type: Number,
      required: [true, "Age at enrollment is required"],
      min: [16, "Age at enrollment must be at least 16"],
      max: [100, "Age at enrollment cannot exceed 100"],
    },
    nationality: {
      type: String,
      required: [true, "Nationality is required"],
      trim: true,
    },
    international: {
      type: Boolean,
      required: [true, "International status is required"],
      default: false,
    },

    // Application Information
    applicationMode: {
      type: String,
      required: [true, "Application mode is required"],
      trim: true,
    },
    applicationOrder: {
      type: Number,
      required: [true, "Application order is required"],
      min: [1, "Application order must be at least 1"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    daytimeEveningAttendance: {
      type: String,
      required: [true, "Daytime/evening attendance is required"],
      trim: true,
      enum: ["Daytime", "Evening", "Both"],
    },
    displaced: {
      type: Boolean,
      required: [true, "Displaced status is required"],
      default: false,
    },

    // Academic Background
    previousQualification: {
      type: String,
      required: [true, "Previous qualification is required"],
      trim: true,
    },
    previousQualificationGrade: {
      type: String,
      required: [true, "Previous qualification grade is required"],
      trim: true,
    },
    mothersQualification: {
      type: String,
      required: [true, "Mother's qualification is required"],
      trim: true,
    },
    fathersQualification: {
      type: String,
      required: [true, "Father's qualification is required"],
      trim: true,
    },
    mothersOccupation: {
      type: String,
      required: [true, "Mother's occupation is required"],
      trim: true,
    },
    fathersOccupation: {
      type: String,
      required: [true, "Father's occupation is required"],
      trim: true,
    },
    admissionGrade: {
      type: Number,
      required: [true, "Admission grade is required"],
      min: [0, "Admission grade cannot be negative"],
      max: [20, "Admission grade cannot exceed 20"],
    },

    // Special Circumstances
    educationalSpecialNeeds: {
      type: Boolean,
      required: [true, "Educational special needs status is required"],
      default: false,
    },
    debtor: {
      type: Boolean,
      required: [true, "Debtor status is required"],
      default: false,
    },
    tuitionFeesUpToDate: {
      type: Boolean,
      required: [true, "Tuition fees status is required"],
      default: true,
    },
    scholarshipHolder: {
      type: Boolean,
      required: [true, "Scholarship holder status is required"],
      default: false,
    },

    // First Semester Performance
    curricularUnits1stSemCredited: {
      type: Number,
      required: [true, "First semester credited units are required"],
      min: [0, "Credited units cannot be negative"],
    },
    curricularUnits1stSemEnrolled: {
      type: Number,
      required: [true, "First semester enrolled units are required"],
      min: [0, "Enrolled units cannot be negative"],
    },
    curricularUnits1stSemEvaluations: {
      type: Number,
      required: [true, "First semester evaluations are required"],
      min: [0, "Evaluations cannot be negative"],
    },
    curricularUnits1stSemApproved: {
      type: Number,
      required: [true, "First semester approved units are required"],
      min: [0, "Approved units cannot be negative"],
    },
    curricularUnits1stSemGrade: {
      type: Number,
      required: [true, "First semester grade is required"],
      min: [0, "Grade cannot be negative"],
      max: [20, "Grade cannot exceed 20"],
    },
    curricularUnits1stSemWithoutEvaluations: {
      type: Number,
      required: [true, "First semester units without evaluations are required"],
      min: [0, "Units without evaluations cannot be negative"],
    },

    // Second Semester Performance
    curricularUnits2ndSemCredited: {
      type: Number,
      required: [true, "Second semester credited units are required"],
      min: [0, "Credited units cannot be negative"],
    },
    curricularUnits2ndSemEnrolled: {
      type: Number,
      required: [true, "Second semester enrolled units are required"],
      min: [0, "Enrolled units cannot be negative"],
    },
    curricularUnits2ndSemEvaluations: {
      type: Number,
      required: [true, "Second semester evaluations are required"],
      min: [0, "Evaluations cannot be negative"],
    },
    curricularUnits2ndSemApproved: {
      type: Number,
      required: [true, "Second semester approved units are required"],
      min: [0, "Approved units cannot be negative"],
    },
    curricularUnits2ndSemGrade: {
      type: Number,
      required: [true, "Second semester grade is required"],
      min: [0, "Grade cannot be negative"],
      max: [20, "Grade cannot exceed 20"],
    },
    curricularUnits2ndSemWithoutEvaluations: {
      type: Number,
      required: [
        true,
        "Second semester units without evaluations are required",
      ],
      min: [0, "Units without evaluations cannot be negative"],
    },

    // Economic Indicators
    unemploymentRate: {
      type: Number,
      required: [true, "Unemployment rate is required"],
      min: [0, "Unemployment rate cannot be negative"],
      max: [100, "Unemployment rate cannot exceed 100%"],
    },
    inflationRate: {
      type: Number,
      required: [true, "Inflation rate is required"],
      min: [-50, "Inflation rate cannot be below -50%"],
      max: [1000, "Inflation rate cannot exceed 1000%"],
    },
    gdp: {
      type: Number,
      required: [true, "GDP is required"],
      min: [0, "GDP cannot be negative"],
    },

    // Target/Outcome
    target: {
      type: String,
      required: [true, "Target/outcome is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
StudentSchema.index({ course: 1 });
StudentSchema.index({ target: 1 });
StudentSchema.index({ admissionGrade: 1 });
StudentSchema.index({ curricularUnits1stSemGrade: 1 });
StudentSchema.index({ curricularUnits2ndSemGrade: 1 });
StudentSchema.index({ createdAt: -1 });

// Virtual for academic performance
StudentSchema.virtual("overallGrade").get(function () {
  const firstSemGrade = this.curricularUnits1stSemGrade || 0;
  const secondSemGrade = this.curricularUnits2ndSemGrade || 0;

  if (firstSemGrade === 0 && secondSemGrade === 0) return 0;
  if (firstSemGrade === 0) return secondSemGrade;
  if (secondSemGrade === 0) return firstSemGrade;

  return ((firstSemGrade + secondSemGrade) / 2).toFixed(2);
});

// Virtual for completion rate
StudentSchema.virtual("completionRate").get(function () {
  const firstSemEnrolled = this.curricularUnits1stSemEnrolled || 0;
  const secondSemEnrolled = this.curricularUnits2ndSemEnrolled || 0;
  const firstSemApproved = this.curricularUnits1stSemApproved || 0;
  const secondSemApproved = this.curricularUnits2ndSemApproved || 0;

  const totalEnrolled = firstSemEnrolled + secondSemEnrolled;
  const totalApproved = firstSemApproved + secondSemApproved;

  if (totalEnrolled === 0) return 0;
  return ((totalApproved / totalEnrolled) * 100).toFixed(2);
});

// Virtual for risk assessment
StudentSchema.virtual("riskLevel").get(function () {
  const firstSemGrade = this.curricularUnits1stSemGrade || 0;
  const secondSemGrade = this.curricularUnits2ndSemGrade || 0;
  const firstSemEnrolled = this.curricularUnits1stSemEnrolled || 0;
  const secondSemEnrolled = this.curricularUnits2ndSemEnrolled || 0;
  const firstSemApproved = this.curricularUnits1stSemApproved || 0;
  const secondSemApproved = this.curricularUnits2ndSemApproved || 0;

  // Calculate overall grade
  let overallGrade = 0;
  if (firstSemGrade === 0 && secondSemGrade === 0) overallGrade = 0;
  else if (firstSemGrade === 0) overallGrade = secondSemGrade;
  else if (secondSemGrade === 0) overallGrade = firstSemGrade;
  else overallGrade = (firstSemGrade + secondSemGrade) / 2;

  // Calculate completion rate
  const totalEnrolled = firstSemEnrolled + secondSemEnrolled;
  const totalApproved = firstSemApproved + secondSemApproved;
  const completionRate =
    totalEnrolled === 0 ? 0 : (totalApproved / totalEnrolled) * 100;

  if (overallGrade >= 14 && completionRate >= 80) return "safe";
  if (overallGrade >= 10 && completionRate >= 60) return "warning";
  return "critical";
});

export default StudentSchema;
