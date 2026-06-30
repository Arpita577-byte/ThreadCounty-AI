'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { generateMockReport, simulateAnalysisDelay } from '@/lib/mock/analysis'
import {
  computeStorageMb,
  loadActivity,
  loadReports,
  loadUploads,
  saveActivity,
  saveReports,
  saveUploads,
} from '@/lib/storage/platform-store'
import type { ActivityItem, Report, Upload } from '@/types/dashboard'

interface UploadInput {
  fileName: string
  fileSize: number
  mimeType: string
  thumbnailUrl: string
}

interface PlatformDataContextValue {
  uploads: Upload[]
  reports: Report[]
  activity: ActivityItem[]
  storageUsedMb: number
  isHydrated: boolean
  uploadAndAnalyze: (input: UploadInput) => Promise<Report>
  deleteUpload: (id: string) => void
  getReportByUploadId: (uploadId: string) => Report | undefined
  getReportById: (id: string) => Report | undefined
}

const PlatformDataContext = createContext<PlatformDataContextValue | null>(null)

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function PlatformDataProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<Upload[]>([])
  const [reports, setReports] = useState<Report[]>([])
  const [activity, setActivity] = useState<ActivityItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setUploads(loadUploads())
    setReports(loadReports())
    setActivity(loadActivity())
    setIsHydrated(true)
  }, [])

  const persist = useCallback(
    (u: Upload[], r: Report[], a: ActivityItem[]) => {
      setUploads(u)
      setReports(r)
      setActivity(a)
      saveUploads(u)
      saveReports(r)
      saveActivity(a)
    },
    [],
  )

  const uploadAndAnalyze = useCallback(
    async (input: UploadInput): Promise<Report> => {
      const uploadId = uid('upl')
      const now = new Date().toISOString()

      const pending: Upload = {
        id: uploadId,
        fileName: input.fileName,
        fileSize: input.fileSize,
        mimeType: input.mimeType,
        thumbnailUrl: input.thumbnailUrl,
        status: 'processing',
        createdAt: now,
      }

      let currentUploads = loadUploads()
      let currentReports = loadReports()
      let currentActivity = loadActivity()

      const uploadActivity: ActivityItem = {
        id: uid('act'),
        type: 'upload',
        title: 'Fabric uploaded',
        description: input.fileName,
        createdAt: now,
      }

      currentUploads = [pending, ...currentUploads]
      currentActivity = [uploadActivity, ...currentActivity]
      persist(currentUploads, currentReports, currentActivity)

      await simulateAnalysisDelay(1600 + Math.random() * 800)

      const mock = generateMockReport(uploadId, input.fileName, input.fileSize)
      const report: Report = {
        id: uid('rpt'),
        ...mock,
        createdAt: new Date().toISOString(),
      }

      currentUploads = currentUploads.map((u) =>
        u.id === uploadId ? { ...u, status: 'complete' as const } : u,
      )
      currentReports = [report, ...currentReports]
      const reportActivity: ActivityItem = {
        id: uid('act'),
        type: 'report',
        title: 'Analysis complete',
        description: `${report.fabricType} — ${report.qualityScore} quality score`,
        createdAt: report.createdAt,
      }
      currentActivity = [reportActivity, ...currentActivity]
      persist(currentUploads, currentReports, currentActivity)

      return report
    },
    [persist],
  )

  const deleteUpload = useCallback(
    (id: string) => {
      const updatedUploads = loadUploads().filter((u) => u.id !== id)
      const updatedReports = loadReports().filter((r) => r.uploadId !== id)
      const currentActivity = loadActivity()
      persist(updatedUploads, updatedReports, currentActivity)
    },
    [persist],
  )

  const value = useMemo<PlatformDataContextValue>(
    () => ({
      uploads,
      reports,
      activity,
      storageUsedMb: computeStorageMb(uploads),
      isHydrated,
      uploadAndAnalyze,
      deleteUpload,
      getReportByUploadId: (uploadId) =>
        reports.find((r) => r.uploadId === uploadId),
      getReportById: (id) => reports.find((r) => r.id === id),
    }),
    [
      uploads,
      reports,
      activity,
      isHydrated,
      uploadAndAnalyze,
      deleteUpload,
    ],
  )

  return (
    <PlatformDataContext.Provider value={value}>
      {children}
    </PlatformDataContext.Provider>
  )
}

export function usePlatformData() {
  const ctx = useContext(PlatformDataContext)
  if (!ctx) {
    throw new Error('usePlatformData must be used within PlatformDataProvider')
  }
  return ctx
}
