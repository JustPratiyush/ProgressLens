# Database Structure

This folder contains the MongoDB/Mongoose database setup for the Student Early Warning System.

## Structure

```
lib/database/
├── connections/          # Database connection management
├── schemas/             # Mongoose schemas
├── models/              # Mongoose models
├── utils/               # Utility functions
└── index.ts             # Main export file
```

## Database Schema

The system uses a comprehensive student schema that captures academic performance data from CSV uploads. The schema includes:

### Personal Information

- **maritalStatus**: Student's marital status
- **gender**: Student's gender
- **ageAtEnrollment**: Age when enrolled
- **nationality**: Student's nationality
- **international**: Whether student is international

### Application Information

- **applicationMode**: How the student applied
- **applicationOrder**: Application priority
- **course**: Course/program enrolled in
- **daytimeEveningAttendance**: Attendance schedule
- **displaced**: Whether student is displaced

### Academic Background

- **previousQualification**: Previous academic qualification
- **previousQualificationGrade**: Grade from previous qualification
- **mothersQualification**: Mother's education level
- **fathersQualification**: Father's education level
- **mothersOccupation**: Mother's occupation
- **fathersOccupation**: Father's occupation
- **admissionGrade**: Admission test score

### Special Circumstances

- **educationalSpecialNeeds**: Whether student has special needs
- **debtor**: Whether student has outstanding debts
- **tuitionFeesUpToDate**: Whether fees are current
- **scholarshipHolder**: Whether student has scholarship

### Academic Performance

- **curricularUnits1stSem\***: First semester metrics (credited, enrolled, evaluations, approved, grade, without evaluations)
- **curricularUnits2ndSem\***: Second semester metrics (credited, enrolled, evaluations, approved, grade, without evaluations)

### Economic Indicators

- **unemploymentRate**: Local unemployment rate
- **inflationRate**: Local inflation rate
- **gdp**: Local GDP data

### Outcome

- **target**: Student's final outcome/status

## Virtual Fields

The schema automatically calculates:

- **overallGrade**: Average of first and second semester grades
- **completionRate**: Percentage of enrolled units that were approved
- **riskLevel**: Risk assessment based on grades and completion rate

## Usage

### Import Database Functions

```typescript
import {
  connectDB,
  getAllStudents,
  bulkUpsertStudents,
  getDashboardSummary,
} from "@/lib/database";
```

### Connect to Database

```typescript
import { connectDB } from "@/lib/database";

// In your API route or server function
await connectDB();
```

### Upload CSV Data

```typescript
import { bulkUpsertStudents, autoMapCSVColumns } from "@/lib/database";

// Auto-map CSV columns
const mapping = autoMapCSVColumns(csvHeaders);

// Process CSV data
const result = await bulkUpsertStudents(csvRows, mapping, false);
```

### Get Dashboard Data

```typescript
import { getDashboardSummary } from "@/lib/database";

const summary = await getDashboardSummary();
// Returns: totalStudents, atRiskCount, criticalCount, riskDistribution, etc.
```

## Environment Variables

Add to your `.env.local`:

```bash
MONGODB_URI=mongodb://localhost:27017/student-early-warning
# Or for production:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## CSV Upload Process

1. **Parse CSV**: Extract headers and rows
2. **Auto-map Columns**: Automatically map CSV headers to schema fields
3. **Validate Data**: Ensure data meets schema requirements
4. **Bulk Insert/Update**: Process all rows efficiently
5. **Error Handling**: Capture and report any processing errors

## Performance Features

- **Indexes**: Optimized queries on frequently accessed fields
- **Bulk Operations**: Efficient processing of large CSV files
- **Connection Pooling**: Reuses database connections
- **Validation**: Schema-level data validation and sanitization

## Risk Assessment Logic

Students are automatically categorized by risk level:

- **Safe**: Overall grade ≥ 14 AND completion rate ≥ 80%
- **Warning**: Overall grade ≥ 10 AND completion rate ≥ 60%
- **Critical**: Below warning thresholds

## API Integration

The database functions are designed to work seamlessly with Next.js API routes:

```typescript
// app/api/students/route.ts
import { getAllStudents } from "@/lib/database";

export async function GET() {
  try {
    const students = await getAllStudents();
    return Response.json(students);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}
```
