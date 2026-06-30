'use client'

import { motion } from 'framer-motion'
import { Clock, FileText, Loader2, Upload } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_UPLOADS } from '@/lib/mock/dashboard'
import { cn } from '@/lib/utils'

const STATUS_STYLES = {
  complete: 'bg-accent/15 text-accent',
  processing: 'bg-primary/15 text-primary',
  pending: 'bg-muted text-muted-foreground',
  failed: 'bg-destructive/15 text-destructive',
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

export function RecentUploads() {
  return (
    <Card className="glass border-border/60">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-base">Recent uploads</CardTitle>
        <Link
          href="/dashboard/history"
          className="text-xs text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {MOCK_UPLOADS.map((upload, i) => (
          <motion.div
            key={upload.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
          >
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border/60">
              <Image
                src={upload.thumbnailUrl}
                alt={upload.fileName}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{upload.fileName}</p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {formatDate(upload.createdAt)}
              </p>
            </div>
            <span
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize',
                STATUS_STYLES[upload.status],
              )}
            >
              {upload.status === 'processing' ? (
                <Loader2 className="size-3 animate-spin" />
              ) : upload.status === 'complete' ? (
                <FileText className="size-3" />
              ) : (
                <Upload className="size-3" />
              )}
              {upload.status}
            </span>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}
