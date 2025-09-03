import { IStudent } from "../schemas/student";

export interface CSVRow {
  [key: string]: string;
}

export interface CSVMapping {
  maritalStatus: string;
  applicationMode: string;
  applicationOrder: string;
  course: string;
  daytimeEveningAttendance: string;
  previousQualification: string;
  previousQualificationGrade: string;
  nationality: string;
  mothersQualification: string;
  fathersQualification: string;
  mothersOccupation: string;
  fathersOccupation: string;
  admissionGrade: string;
  displaced: string;
  educationalSpecialNeeds: string;
  debtor: string;
  tuitionFeesUpToDate: string;
  gender: string;
  scholarshipHolder: string;
  ageAtEnrollment: string;
  international: string;
  curricularUnits1stSemCredited: string;
  curricularUnits1stSemEnrolled: string;
  curricularUnits1stSemEvaluations: string;
  curricularUnits1stSemApproved: string;
  curricularUnits1stSemGrade: string;
  curricularUnits1stSemWithoutEvaluations: string;
  curricularUnits2ndSemCredited: string;
  curricularUnits2ndSemEnrolled: string;
  curricularUnits2ndSemEvaluations: string;
  curricularUnits2ndSemApproved: string;
  curricularUnits2ndSemGrade: string;
  curricularUnits2ndSemWithoutEvaluations: string;
  unemploymentRate: string;
  inflationRate: string;
  gdp: string;
  target: string;
}

export function parseCSVRow(
  row: CSVRow,
  mapping: CSVMapping
): Partial<IStudent> {
  return {
    maritalStatus: row[mapping.maritalStatus] || "Single",
    applicationMode: row[mapping.applicationMode] || "",
    applicationOrder: parseInt(row[mapping.applicationOrder]) || 1,
    course: row[mapping.course] || "",
    daytimeEveningAttendance:
      row[mapping.daytimeEveningAttendance] || "Daytime",
    previousQualification: row[mapping.previousQualification] || "",
    previousQualificationGrade: row[mapping.previousQualificationGrade] || "",
    nationality: row[mapping.nationality] || "",
    mothersQualification: row[mapping.mothersQualification] || "",
    fathersQualification: row[mapping.fathersQualification] || "",
    mothersOccupation: row[mapping.mothersOccupation] || "",
    fathersOccupation: row[mapping.fathersOccupation] || "",
    admissionGrade: parseFloat(row[mapping.admissionGrade]) || 0,
    displaced: row[mapping.displaced]?.toLowerCase() === "yes" || false,
    educationalSpecialNeeds:
      row[mapping.educationalSpecialNeeds]?.toLowerCase() === "yes" || false,
    debtor: row[mapping.debtor]?.toLowerCase() === "yes" || false,
    tuitionFeesUpToDate:
      row[mapping.tuitionFeesUpToDate]?.toLowerCase() === "yes" || true,
    gender: row[mapping.gender] || "Other",
    scholarshipHolder:
      row[mapping.scholarshipHolder]?.toLowerCase() === "yes" || false,
    ageAtEnrollment: parseInt(row[mapping.ageAtEnrollment]) || 18,
    international: row[mapping.international]?.toLowerCase() === "yes" || false,
    curricularUnits1stSemCredited:
      parseInt(row[mapping.curricularUnits1stSemCredited]) || 0,
    curricularUnits1stSemEnrolled:
      parseInt(row[mapping.curricularUnits1stSemEnrolled]) || 0,
    curricularUnits1stSemEvaluations:
      parseInt(row[mapping.curricularUnits1stSemEvaluations]) || 0,
    curricularUnits1stSemApproved:
      parseInt(row[mapping.curricularUnits1stSemApproved]) || 0,
    curricularUnits1stSemGrade:
      parseFloat(row[mapping.curricularUnits1stSemGrade]) || 0,
    curricularUnits1stSemWithoutEvaluations:
      parseInt(row[mapping.curricularUnits1stSemWithoutEvaluations]) || 0,
    curricularUnits2ndSemCredited:
      parseInt(row[mapping.curricularUnits2ndSemCredited]) || 0,
    curricularUnits2ndSemEnrolled:
      parseInt(row[mapping.curricularUnits2ndSemEnrolled]) || 0,
    curricularUnits2ndSemEvaluations:
      parseInt(row[mapping.curricularUnits2ndSemEvaluations]) || 0,
    curricularUnits2ndSemApproved:
      parseInt(row[mapping.curricularUnits2ndSemApproved]) || 0,
    curricularUnits2ndSemGrade:
      parseFloat(row[mapping.curricularUnits2ndSemGrade]) || 0,
    curricularUnits2ndSemWithoutEvaluations:
      parseInt(row[mapping.curricularUnits2ndSemWithoutEvaluations]) || 0,
    unemploymentRate: parseFloat(row[mapping.unemploymentRate]) || 0,
    inflationRate: parseFloat(row[mapping.inflationRate]) || 0,
    gdp: parseFloat(row[mapping.gdp]) || 0,
    target: row[mapping.target] || "",
  };
}

export function autoMapCSVColumns(headers: string[]): CSVMapping {
  const mapping: CSVMapping = {
    maritalStatus: "",
    applicationMode: "",
    applicationOrder: "",
    course: "",
    daytimeEveningAttendance: "",
    previousQualification: "",
    previousQualificationGrade: "",
    nationality: "",
    mothersQualification: "",
    fathersQualification: "",
    mothersOccupation: "",
    fathersOccupation: "",
    admissionGrade: "",
    displaced: "",
    educationalSpecialNeeds: "",
    debtor: "",
    tuitionFeesUpToDate: "",
    gender: "",
    scholarshipHolder: "",
    ageAtEnrollment: "",
    international: "",
    curricularUnits1stSemCredited: "",
    curricularUnits1stSemEnrolled: "",
    curricularUnits1stSemEvaluations: "",
    curricularUnits1stSemApproved: "",
    curricularUnits1stSemGrade: "",
    curricularUnits1stSemWithoutEvaluations: "",
    curricularUnits2ndSemCredited: "",
    curricularUnits2ndSemEnrolled: "",
    curricularUnits2ndSemEvaluations: "",
    curricularUnits2ndSemApproved: "",
    curricularUnits2ndSemGrade: "",
    curricularUnits2ndSemWithoutEvaluations: "",
    unemploymentRate: "",
    inflationRate: "",
    gdp: "",
    target: "",
  };

  // Auto-map based on common patterns
  headers.forEach((header, index) => {
    const lowerHeader = header.toLowerCase();

    if (lowerHeader.includes("marital")) mapping.maritalStatus = header;
    else if (
      lowerHeader.includes("application") &&
      lowerHeader.includes("mode")
    )
      mapping.applicationMode = header;
    else if (
      lowerHeader.includes("application") &&
      lowerHeader.includes("order")
    )
      mapping.applicationOrder = header;
    else if (lowerHeader.includes("course")) mapping.course = header;
    else if (lowerHeader.includes("daytime") || lowerHeader.includes("evening"))
      mapping.daytimeEveningAttendance = header;
    else if (
      lowerHeader.includes("previous") &&
      lowerHeader.includes("qualification") &&
      !lowerHeader.includes("grade")
    )
      mapping.previousQualification = header;
    else if (lowerHeader.includes("previous") && lowerHeader.includes("grade"))
      mapping.previousQualificationGrade = header;
    else if (lowerHeader.includes("nationality")) mapping.nationality = header;
    else if (
      lowerHeader.includes("mother") &&
      lowerHeader.includes("qualification")
    )
      mapping.mothersQualification = header;
    else if (
      lowerHeader.includes("father") &&
      lowerHeader.includes("qualification")
    )
      mapping.fathersQualification = header;
    else if (
      lowerHeader.includes("mother") &&
      lowerHeader.includes("occupation")
    )
      mapping.mothersOccupation = header;
    else if (
      lowerHeader.includes("father") &&
      lowerHeader.includes("occupation")
    )
      mapping.fathersOccupation = header;
    else if (lowerHeader.includes("admission") && lowerHeader.includes("grade"))
      mapping.admissionGrade = header;
    else if (lowerHeader.includes("displaced")) mapping.displaced = header;
    else if (lowerHeader.includes("special") && lowerHeader.includes("needs"))
      mapping.educationalSpecialNeeds = header;
    else if (lowerHeader.includes("debtor")) mapping.debtor = header;
    else if (lowerHeader.includes("tuition") || lowerHeader.includes("fees"))
      mapping.tuitionFeesUpToDate = header;
    else if (lowerHeader.includes("gender")) mapping.gender = header;
    else if (lowerHeader.includes("scholarship"))
      mapping.scholarshipHolder = header;
    else if (lowerHeader.includes("age")) mapping.ageAtEnrollment = header;
    else if (lowerHeader.includes("international"))
      mapping.international = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("credited"))
      mapping.curricularUnits1stSemCredited = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("enrolled"))
      mapping.curricularUnits1stSemEnrolled = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("evaluations"))
      mapping.curricularUnits1stSemEvaluations = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("approved"))
      mapping.curricularUnits1stSemApproved = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("grade"))
      mapping.curricularUnits1stSemGrade = header;
    else if (lowerHeader.includes("1st") && lowerHeader.includes("without"))
      mapping.curricularUnits1stSemWithoutEvaluations = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("credited"))
      mapping.curricularUnits2ndSemCredited = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("enrolled"))
      mapping.curricularUnits2ndSemEnrolled = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("evaluations"))
      mapping.curricularUnits2ndSemEvaluations = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("approved"))
      mapping.curricularUnits2ndSemApproved = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("grade"))
      mapping.curricularUnits2ndSemGrade = header;
    else if (lowerHeader.includes("2nd") && lowerHeader.includes("without"))
      mapping.curricularUnits2ndSemWithoutEvaluations = header;
    else if (lowerHeader.includes("unemployment"))
      mapping.unemploymentRate = header;
    else if (lowerHeader.includes("inflation")) mapping.inflationRate = header;
    else if (lowerHeader.includes("gdp")) mapping.gdp = header;
    else if (lowerHeader.includes("target")) mapping.target = header;
  });

  return mapping;
}
