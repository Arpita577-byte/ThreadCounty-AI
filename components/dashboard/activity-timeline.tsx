'use client'

import { motion } from 'framer-motion'
import { Download, FileText, LogIn, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_ACTIVITY } from '@/lib/mock/dashboard'
import { cn } from '@/lib/utils'

const ICONS = {
  upload: Upload,
  report: FileText,
  login: LogIn,
  export: Download,
}

const COLORS = {
  upload: 'text-primary bg-primary/10',
  report: 'text-accent bg-accent/10',
  login: 'text-muted-foreground bg-secondary',
  export: 'text-primary bg-primary/10',
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function ActivityTimeline() {
  return (
    <Card className="glass border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          <div className="absolute bottom-2 left-[15px] top-2 w-px bg-border" />
          {MOCK_ACTIVITY.map((item, i) => {
            const Icon = ICONS[item.type]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative flex gap-3 pb-5 last:pb-0"
              >
                <div
                  className={cn(
                    'relative z-10 grid size-8 shrink-0 place-items-center rounded-full',
                    COLORS[item.type],
                  )}
                >
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                    {timeAgo(item.createdAt)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
