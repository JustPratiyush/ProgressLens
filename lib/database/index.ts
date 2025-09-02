// Database connections
export { connectDB, disconnectDB } from "./connections/mongodb";

// Models
export { default as Student } from "./models/student";
export type { IStudent } from "./models/student";

// Schemas
export { default as StudentSchema } from "./schemas/student";

// Utilities
export {
  parseCSVRow,
  autoMapCSVColumns,
  type CSVRow,
  type CSVMapping,
} from "./utils/csv-parser";

export {
  getAllStudents,
  getStudentById,
  getStudentsByRiskLevel,
  getStudentsByCourse,
  getDashboardSummary,
  bulkUpsertStudents,
  deleteStudent,
  updateStudent,
  searchStudents,
  getStudentStats,
} from "./utils/student-operations";
