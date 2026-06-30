'use client'

import { motion } from 'framer-motion'
import { usePlatformData } from '@/hooks/use-platform-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AnalyticsCharts() {
  const { reports, uploads } = usePlatformData()

  const avgQuality =
    reports.length > 0
      ? reports.reduce((s, r) => s + r.qualityScore, 0) / reports.length
      : 0

  const avgDensity =
    reports.length > 0
      ? reports.reduce((s, r) => s + r.threadDensity, 0) / reports.length
      : 0

  const byFabric = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.fabricType] = (acc[r.fabricType] ?? 0) + 1
    return acc
  }, {})

  const fabricEntries = Object.entries(byFabric)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const maxCount = Math.max(...fabricEntries.map(([, c]) => c), 1)

  const monthly = uploads.reduce<Record<string, number>>((acc, u) => {
    const month = new Date(u.createdAt).toLocaleString('en-US', {
      month: 'short',
    })
    acc[month] = (acc[month] ?? 0) + 1
    return acc
  }, {})

  const monthEntries = Object.entries(monthly)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="glass border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-secondary/30 p-4 text-center">
            <p className="text-3xl font-heading font-semibold text-gradient">
              {reports.length}
            </p>
            <p className="text-xs text-muted-foreground">Total reports</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4 text-center">
            <p className="text-3xl font-heading font-semibold">
              {avgQuality.toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground">Avg quality</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4 text-center">
            <p className="text-3xl font-heading font-semibold">
              {Math.round(avgDensity)}
            </p>
            <p className="text-xs text-muted-foreground">Avg TPI</p>
          </div>
          <div className="rounded-xl bg-secondary/30 p-4 text-center">
            <p className="text-3xl font-heading font-semibold text-accent">
              {uploads.length}
            </p>
            <p className="text-xs text-muted-foreground">Uploads</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Fabric types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {fabricEntries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet</p>
          ) : (
            fabricEntries.map(([fabric, count], i) => (
              <div key={fabric}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="truncate">{fabric}</span>
                  <span className="text-muted-foreground">{count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / maxCount) * 100}%` }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {monthEntries.length > 0 ? (
        <Card className="glass border-border/60 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Uploads by month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-3">
              {monthEntries.map(([month, count], i) => {
                const max = Math.max(...monthEntries.map(([, c]) => c))
                const h = (count / max) * 100
                return (
                  <div key={month} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="w-full min-h-[4px] rounded-t-lg bg-primary/80"
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {month}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
