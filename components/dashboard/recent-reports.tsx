'use client'

import { motion } from 'framer-motion'
import { Gauge, Layers, Zap } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { usePlatformData } from '@/hooks/use-platform-data'

export function RecentReports() {
  const { reports } = usePlatformData()
  const recent = reports.slice(0, 3)

  return (
    <Card className="glass border-border/60">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Recent reports</CardTitle>
        <Link
          href="/dashboard/reports"
          className="text-xs text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.map((report, i) => (
          <Link key={report.id} href={`/dashboard/reports/${report.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border/50 bg-secondary/20 p-4 transition-all hover:-translate-y-0.5 hover:glow-ring"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="size-4 text-accent" />
                  <p className="font-medium">{report.fabricType}</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {report.processingTimeMs}ms
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-background/50 p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Density</p>
                  <p className="font-heading text-sm font-semibold">
                    {report.threadDensity}
                  </p>
                </div>
                <div className="rounded-lg bg-background/50 p-2 text-center">
                  <p className="flex items-center justify-center gap-0.5 text-[10px] text-muted-foreground">
                    <Gauge className="size-2.5" /> Quality
                  </p>
                  <p className="font-heading text-sm font-semibold text-accent">
                    {report.qualityScore}
                  </p>
                </div>
                <div className="rounded-lg bg-background/50 p-2 text-center">
                  <p className="flex items-center justify-center gap-0.5 text-[10px] text-muted-foreground">
                    <Zap className="size-2.5" /> Conf.
                  </p>
                  <p className="font-heading text-sm font-semibold">
                    {report.confidenceScore}%
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
