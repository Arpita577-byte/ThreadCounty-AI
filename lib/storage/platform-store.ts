import type { ActivityItem, Report, Upload } from '@/types/dashboard'
import {
  MOCK_ACTIVITY,
  MOCK_REPORTS,
  MOCK_UPLOADS,
} from '@/lib/mock/dashboard'

const UPLOADS_KEY = 'threadcounty_uploads'
const REPORTS_KEY = 'threadcounty_reports'
const ACTIVITY_KEY = 'threadcounty_activity'

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadUploads(): Upload[] {
  const stored = read<Upload[] | null>(UPLOADS_KEY, null)
  return stored ?? MOCK_UPLOADS
}

export function saveUploads(uploads: Upload[]): void {
  write(UPLOADS_KEY, uploads)
}

export function loadReports(): Report[] {
  const stored = read<Report[] | null>(REPORTS_KEY, null)
  return stored ?? MOCK_REPORTS
}

export function saveReports(reports: Report[]): void {
  write(REPORTS_KEY, reports)
}

export function loadActivity(): ActivityItem[] {
  const stored = read<ActivityItem[] | null>(ACTIVITY_KEY, null)
  return stored ?? MOCK_ACTIVITY
}

export function saveActivity(activity: ActivityItem[]): void {
  write(ACTIVITY_KEY, activity)
}

export function clearPlatformData(): void {
  localStorage.removeItem(UPLOADS_KEY)
  localStorage.removeItem(REPORTS_KEY)
  localStorage.removeItem(ACTIVITY_KEY)
}

export function computeStorageMb(uploads: Upload[]): number {
  const bytes = uploads.reduce((sum, u) => sum + u.fileSize, 0)
  return Math.round(bytes / (1024 * 1024))
}
