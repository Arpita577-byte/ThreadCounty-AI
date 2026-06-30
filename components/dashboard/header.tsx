'use client'

import { Bell, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/use-auth'
import { MOCK_NOTIFICATIONS } from '@/lib/mock/dashboard'

export function DashboardHeader({ title }: { title: string }) {
  const { user } = useAuth()
  const unread = MOCK_NOTIFICATIONS.filter((n) => !n.read).length

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/60 bg-background/60 px-6 backdrop-blur-xl">
      <div>
        <h1 className="font-heading text-xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-muted-foreground">
          Welcome back, {user?.fullName?.split(' ')[0] ?? 'there'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            className="w-56 pl-9"
          />
        </div>
        <button
          type="button"
          className="relative grid size-9 place-items-center rounded-xl border border-border bg-secondary/40 transition-colors hover:bg-secondary/60"
          aria-label="Notifications"
        >
          <Bell className="size-4 text-muted-foreground" />
          {unread > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
              {unread}
            </span>
          ) : null}
        </button>
        <div className="grid size-9 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-heading text-sm font-semibold text-primary">
          {user?.fullName?.charAt(0) ?? 'U'}
        </div>
      </div>
    </header>
  )
}
