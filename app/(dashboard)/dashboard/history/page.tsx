'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { HistoryList } from '@/components/features/history/history-list'

export default function HistoryPage() {
  return (
    <>
      <DashboardHeader title="History" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-6xl">
          <HistoryList />
        </div>
      </main>
    </>
  )
}
