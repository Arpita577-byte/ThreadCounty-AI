'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { AnalyticsCharts } from '@/components/dashboard/analytics-charts'

export default function AnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Analytics" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl">
          <AnalyticsCharts />
        </div>
      </main>
    </>
  )
}
