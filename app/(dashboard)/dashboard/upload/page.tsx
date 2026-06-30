'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { UploadZone } from '@/components/features/upload/upload-zone'

export default function UploadPage() {
  return (
    <>
      <DashboardHeader title="Upload fabric" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-muted-foreground">
            Upload a fabric image to receive instant AI analysis — thread density,
            warp &amp; weft counts, quality scoring, and actionable suggestions.
          </p>
          <UploadZone />
        </div>
      </main>
    </>
  )
}
