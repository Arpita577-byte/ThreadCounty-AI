'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BarChart3,
  CloudUpload,
  FileText,
  HardDrive,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { Counter } from '@/components/landing/primitives'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MOCK_STATS } from '@/lib/mock/dashboard'
import { cn } from '@/lib/utils'

const STATS = [
  {
    label: 'Total uploads',
    value: MOCK_STATS.totalUploads,
    suffix: '',
    decimals: 0,
    icon: CloudUpload,
    trend: '+12%',
    color: 'text-primary',
  },
  {
    label: 'Reports generated',
    value: MOCK_STATS.totalReports,
    suffix: '',
    decimals: 0,
    icon: FileText,
    trend: '+8%',
    color: 'text-accent',
  },
  {
    label: 'Avg quality score',
    value: MOCK_STATS.avgQualityScore,
    suffix: '',
    decimals: 1,
    icon: BarChart3,
    trend: '+2.1',
    color: 'text-primary',
  },
  {
    label: 'This month',
    value: MOCK_STATS.analysesThisMonth,
    suffix: ' analyses',
    decimals: 0,
    icon: Sparkles,
    trend: 'On track',
    color: 'text-accent',
  },
]

export function StatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          <Card className="glass border-border/60 transition-all hover:-translate-y-0.5 hover:glow-ring">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div
                  className={cn(
                    'grid size-10 place-items-center rounded-xl bg-secondary/60',
                    stat.color,
                  )}
                >
                  <stat.icon className="size-5" />
                </div>
                <span className="text-[10px] font-medium text-accent">
                  {stat.trend}
                </span>
              </div>
              <p className="mt-4 font-heading text-3xl font-semibold">
                <Counter
                  to={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export function StorageCard() {
  const pct = Math.round(
    (MOCK_STATS.storageUsedMb / MOCK_STATS.storageLimitMb) * 100,
  )

  return (
    <Card className="glass border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <HardDrive className="size-4 text-primary" />
          Storage usage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <p className="font-heading text-2xl font-semibold">
            {MOCK_STATS.storageUsedMb}{' '}
            <span className="text-base font-normal text-muted-foreground">
              / {MOCK_STATS.storageLimitMb} MB
            </span>
          </p>
          <span className="text-sm text-muted-foreground">{pct}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickActions() {
  const actions = [
    { href: '/dashboard/upload', label: 'Upload fabric', icon: CloudUpload },
    { href: '/dashboard/reports', label: 'View reports', icon: FileText },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  ]

  return (
    <Card className="glass border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {actions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Button
              variant="outline"
              className="group h-11 w-full justify-between border-border/60 bg-secondary/20"
            >
              <span className="flex items-center gap-2">
                <action.icon className="size-4 text-accent" />
                {action.label}
              </span>
              <ArrowUpRight className="size-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </Button>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
