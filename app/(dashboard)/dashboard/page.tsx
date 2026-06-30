'use client'

import { ActivityTimeline } from '@/components/dashboard/activity-timeline'
import { DashboardHeader } from '@/components/dashboard/header'
import { RecentReports } from '@/components/dashboard/recent-reports'
import { RecentUploads } from '@/components/dashboard/recent-uploads'
import {
  QuickActions,
  StatCards,
  StorageCard,
} from '@/components/dashboard/stat-cards'

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <StatCards />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <RecentUploads />
              <RecentReports />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <StorageCard />
              <ActivityTimeline />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
