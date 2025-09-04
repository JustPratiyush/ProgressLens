import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  id: string; // external id from CSV (e.g., s-001)
  name: string;
  email: string;
  class: string;
  riskLevel: "safe" | "warning" | "critical";
  riskScore: number;
  attendance: number;
  averageGrade: number;
  lastActivity: Date;
  mentor?: string;
  interventions?: { id: string; date: string; note: string; by?: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema<IStudent>(
  {
    id: {
      type: String,
      required: [true, "Student id is required"],
      trim: true,
      index: true,
      unique: true,
    },
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
      index: true,
    },
    class: { type: String, required: false, trim: true },
    riskLevel: {
      type: String,
      required: true,
      enum: ["safe", "warning", "critical"],
      default: "safe",
      index: true,
    },
    riskScore: { type: Number, required: true, default: 0, min: 0, max: 100 },
    attendance: { type: Number, required: true, default: 0, min: 0, max: 100 },
    averageGrade: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100,
    },
    lastActivity: { type: Date, required: true, default: () => new Date() },
    mentor: { type: String, required: false, trim: true },
    interventions: {
      type: [
        {
          id: { type: String, required: true },
          date: { type: String, required: true },
          note: { type: String, required: true },
          by: { type: String, required: false },
        },
      ],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.lastActivity = ret.lastActivity
          ? new Date(ret.lastActivity).toISOString()
          : undefined;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

StudentSchema.index({ createdAt: -1 });

export default StudentSchema;
