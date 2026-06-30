'use client'

import { FileText } from 'lucide-react'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { usePlatformData } from '@/hooks/use-platform-data'

export default function ReportsPage() {
  const { reports, uploads } = usePlatformData()

  return (
    <>
      <DashboardHeader title="Reports" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {reports.length === 0 ? (
            <Card className="glass border-border/60 text-center">
              <CardContent className="py-16">
                <FileText className="mx-auto size-10 text-muted-foreground/50" />
                <p className="mt-3 text-sm text-muted-foreground">
                  No reports yet. Upload a fabric image to generate your first
                  analysis.
                </p>
                <Link href="/dashboard/upload">
                  <Button className="mt-4 glow-ring">Upload fabric</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            reports.map((report) => {
              const upload = uploads.find((u) => u.id === report.uploadId)
              return (
                <Link key={report.id} href={`/dashboard/reports/${report.id}`}>
                  <Card className="glass border-border/60 transition-all hover:-translate-y-0.5 hover:glow-ring">
                    <CardContent className="flex items-center justify-between p-5">
                      <div>
                        <p className="font-heading font-semibold">
                          {report.fabricType}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {upload?.fileName ?? 'Fabric sample'} ·{' '}
                          {report.threadDensity} TPI
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-2xl font-semibold text-accent">
                          {report.qualityScore}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          quality score
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })
          )}
        </div>
      </main>
    </>
  )
}
