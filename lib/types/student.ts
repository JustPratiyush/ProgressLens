export type RiskLevel = "safe" | "warning" | "critical"

export interface Intervention {
  id: string
  date: string
  note: string
  by?: string
}

export interface Student {
  id: string
  name: string
  email: string
  class: string
  riskLevel: RiskLevel
  riskScore: number
  attendance: number
  averageGrade: number
  lastActivity: string
  mentor?: string
  interventions: Intervention[]
}
