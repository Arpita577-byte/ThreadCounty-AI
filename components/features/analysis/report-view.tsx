'use client'

import { motion } from 'framer-motion'
import {
  Download,
  Layers,
  Printer,
  Share2,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Report, Upload } from '@/types/dashboard'

function ScoreRing({
  value,
  label,
  color,
}: {
  value: number
  label: string
  color: string
}) {
  const pct = Math.min(value, 100)
  const circumference = 2 * Math.PI * 36

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative size-24">
        <svg className="size-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-secondary"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (pct / 100) * circumference }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-heading text-lg font-semibold">
          {value}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

export function ReportView({
  report,
  upload,
}: {
  report: Report
  upload?: Upload
}) {
  const warpPct = Math.round(
    (report.warpCount / report.threadDensity) * 100,
  )
  const weftPct = 100 - warpPct

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image */}
        <Card className="glass overflow-hidden border-border/60">
          <div className="relative aspect-square bg-secondary/30">
            {upload?.thumbnailUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={upload.thumbnailUrl}
                alt={upload.fileName}
                className="size-full object-contain"
              />
            ) : null}
          </div>
          <CardContent className="p-4">
            <p className="text-sm font-medium">{upload?.fileName ?? 'Fabric sample'}</p>
            <p className="text-xs text-muted-foreground">
              Analyzed in {report.processingTimeMs}ms
            </p>
          </CardContent>
        </Card>

        {/* Scores */}
        <Card className="glass border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="size-5 text-accent" />
              {report.fabricType}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-around">
              <ScoreRing
                value={report.qualityScore}
                label="Quality"
                color="oklch(0.72 0.15 165)"
              />
              <ScoreRing
                value={report.confidenceScore}
                label="Confidence"
                color="oklch(0.66 0.18 250)"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Thread density
                </p>
                <p className="font-heading text-2xl font-semibold">
                  {report.threadDensity}
                </p>
                <p className="text-[10px] text-muted-foreground">TPI</p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Warp
                </p>
                <p className="font-heading text-2xl font-semibold text-primary">
                  {report.warpCount}
                </p>
              </div>
              <div className="rounded-xl bg-secondary/40 p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Weft
                </p>
                <p className="font-heading text-2xl font-semibold text-accent">
                  {report.weftCount}
                </p>
              </div>
            </div>

            {/* Warp/weft bar */}
            <div>
              <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                <span>Warp {warpPct}%</span>
                <span>Weft {weftPct}%</span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${warpPct}%` }}
                  transition={{ duration: 1 }}
                  className="bg-primary"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${weftPct}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="bg-accent"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions */}
      <Card className="glass border-border/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-4 text-accent" />
            AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {report.suggestions.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 rounded-lg bg-secondary/30 p-3 text-sm"
            >
              <Zap className="mt-0.5 size-4 shrink-0 text-primary" />
              {s}
            </motion.div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="gap-2" onClick={() => window.print()}>
          <Printer className="size-4" />
          Print report
        </Button>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `ThreadCounty — ${report.fabricType}`,
                text: `Quality: ${report.qualityScore}, Density: ${report.threadDensity} TPI`,
              })
            }
          }}
        >
          <Share2 className="size-4" />
          Share
        </Button>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Download PDF
        </Button>
      </div>
    </div>
  )
}
