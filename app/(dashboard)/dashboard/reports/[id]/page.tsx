'use client'

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard/header'
import { ReportView } from '@/components/features/analysis/report-view'
import { Button } from '@/components/ui/button'
import { usePlatformData } from '@/hooks/use-platform-data'

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getReportById, uploads } = usePlatformData()
  const report = getReportById(id)
  const upload = report
    ? uploads.find((u) => u.id === report.uploadId)
    : undefined

  if (!report) {
    return (
      <>
        <DashboardHeader title="Report not found" />
        <main className="flex flex-1 items-center justify-center p-6">
          <Link href="/dashboard/reports">
            <Button variant="outline">
              <ArrowLeft className="mr-1 size-4" />
              Back to reports
            </Button>
          </Link>
        </main>
      </>
    )
  }

  return (
    <>
      <DashboardHeader title="Analysis report" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-5xl">
          <Link href="/dashboard/reports" className="mb-4 inline-block">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-1 size-4" />
              All reports
            </Button>
          </Link>
          <ReportView report={report} upload={upload} />
        </div>
      </main>
    </>
  )
}
