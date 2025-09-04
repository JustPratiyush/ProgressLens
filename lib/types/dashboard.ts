export interface AlertItem {
  id: string
  studentId: string
  message: string
  level: "warning" | "critical"
  date: string
}

export interface RiskBucket {
  level: string
  count: number
}

export interface DashboardSummary {
  totalStudents: number
  atRiskCount: number
  criticalCount: number
  recentAlerts: AlertItem[]
  riskDistribution: RiskBucket[]
}
