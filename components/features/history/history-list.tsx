'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpDown,
  FileText,
  Search,
  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePlatformData } from '@/hooks/use-platform-data'
import { cn } from '@/lib/utils'

type SortKey = 'date' | 'name' | 'quality'
type FilterStatus = 'all' | 'complete' | 'processing' | 'failed'

export function HistoryList() {
  const { uploads, reports, deleteUpload } = usePlatformData()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortKey>('date')
  const [filter, setFilter] = useState<FilterStatus>('all')

  const items = useMemo(() => {
    let list = uploads.map((upload) => ({
      upload,
      report: reports.find((r) => r.uploadId === upload.id),
    }))

    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        ({ upload, report }) =>
          upload.fileName.toLowerCase().includes(q) ||
          report?.fabricType.toLowerCase().includes(q),
      )
    }

    if (filter !== 'all') {
      list = list.filter(({ upload }) => upload.status === filter)
    }

    list.sort((a, b) => {
      if (sort === 'name') return a.upload.fileName.localeCompare(b.upload.fileName)
      if (sort === 'quality') {
        return (b.report?.qualityScore ?? 0) - (a.report?.qualityScore ?? 0)
      }
      return (
        new Date(b.upload.createdAt).getTime() -
        new Date(a.upload.createdAt).getTime()
      )
    })

    return list
  }, [uploads, reports, search, sort, filter])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by filename or fabric type…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterStatus)}
            className="h-10 rounded-lg border border-input bg-secondary/30 px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="complete">Complete</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
          <Button
            variant="outline"
            size="sm"
            className="h-10 gap-1"
            onClick={() =>
              setSort((s) => (s === 'date' ? 'quality' : s === 'quality' ? 'name' : 'date'))
            }
          >
            <ArrowUpDown className="size-3.5" />
            {sort === 'date' ? 'Date' : sort === 'quality' ? 'Quality' : 'Name'}
          </Button>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border/60 py-16 text-center">
          <FileText className="mx-auto size-10 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">No uploads found</p>
          <Link href="/dashboard/upload">
            <Button className="mt-4 glow-ring">Upload fabric</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(({ upload, report }, i) => (
            <motion.div
              key={upload.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group glass overflow-hidden rounded-2xl border border-border/60 transition-all hover:-translate-y-0.5 hover:glow-ring"
            >
              <div className="relative aspect-video bg-secondary/30">
                <Image
                  src={upload.thumbnailUrl}
                  alt={upload.fileName}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <span
                  className={cn(
                    'absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium capitalize',
                    upload.status === 'complete' && 'bg-accent/20 text-accent',
                    upload.status === 'processing' && 'bg-primary/20 text-primary',
                    upload.status === 'failed' && 'bg-destructive/20 text-destructive',
                  )}
                >
                  {upload.status}
                </span>
              </div>
              <div className="p-4">
                <p className="truncate font-medium">{upload.fileName}</p>
                {report ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {report.fabricType} · Q{report.qualityScore}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">Processing…</p>
                )}
                <div className="mt-3 flex gap-2">
                  {report ? (
                    <Link href={`/dashboard/reports/${report.id}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        View report
                      </Button>
                    </Link>
                  ) : null}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteUpload(upload.id)}
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
