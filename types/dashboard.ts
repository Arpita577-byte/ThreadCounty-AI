export interface Upload {
  id: string
  fileName: string
  fileSize: number
  mimeType: string
  thumbnailUrl: string
  status: 'pending' | 'processing' | 'complete' | 'failed'
  createdAt: string
}

export interface Report {
  id: string
  uploadId: string
  fabricType: string
  threadDensity: number
  warpCount: number
  weftCount: number
  confidenceScore: number
  qualityScore: number
  processingTimeMs: number
  suggestions: string[]
  createdAt: string
}

export interface DashboardStats {
  totalUploads: number
  totalReports: number
  storageUsedMb: number
  storageLimitMb: number
  analysesThisMonth: number
  avgQualityScore: number
}

export interface ActivityItem {
  id: string
  type: 'upload' | 'report' | 'login' | 'export'
  title: string
  description: string
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
}
