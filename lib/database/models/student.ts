import mongoose from "mongoose";
import StudentSchema, { IStudent } from "../schemas/student";

// Check if model already exists to prevent overwriting
const Student =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;
export type { IStudent };
