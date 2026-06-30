'use client'

import {
  BarChart3,
  Bell,
  CloudUpload,
  FileText,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/landing/logo'
import { useAuth } from '@/hooks/use-auth'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/upload', label: 'Upload', icon: CloudUpload },
  { href: '/dashboard/reports', label: 'Reports', icon: FileText },
  { href: '/dashboard/history', label: 'History', icon: History },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
]

const BOTTOM_NAV = [
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl">
      <div className="border-b border-border/60 p-4">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Platform
        </p>
        <nav className="flex flex-col gap-0.5">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                  active
                    ? 'bg-primary/10 text-primary glow-ring'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <p className="mb-2 mt-6 px-3 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          Account
        </p>
        <nav className="flex flex-col gap-0.5">
          {BOTTOM_NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all',
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-foreground',
                )}
              >
                <item.icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Plan badge */}
      <div className="border-t border-border/60 p-4">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-accent" />
            <span className="text-xs font-medium capitalize">
              {user?.plan ?? 'Free'} plan
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Upgrade for unlimited analyses
          </p>
          <Link
            href="/#pricing"
            className="mt-2 block text-xs font-medium text-primary hover:underline"
          >
            View plans →
          </Link>
        </div>

        <button
          type="button"
          onClick={() => signOut().then(() => (window.location.href = '/'))}
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
