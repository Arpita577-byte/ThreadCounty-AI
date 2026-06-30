'use client'

import { Construction } from 'lucide-react'
import Link from 'next/link'
import { DashboardHeader } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ComingSoonPage({
  title,
}: {
  title: string
}) {
  return (
    <>
      <DashboardHeader title={title} />
      <main className="flex flex-1 items-center justify-center p-6">
        <Card className="glass max-w-md border-border/60 text-center">
          <CardContent className="flex flex-col items-center gap-4 p-10">
            <div className="grid size-14 place-items-center rounded-2xl bg-primary/10">
              <Construction className="size-7 text-primary" />
            </div>
            <h2 className="font-heading text-xl font-semibold">Coming soon</h2>
            <p className="text-sm text-muted-foreground">
              {title} is being built. Return to the dashboard overview for now.
            </p>
            <Link href="/dashboard">
              <Button className="glow-ring">Back to dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  )
}
