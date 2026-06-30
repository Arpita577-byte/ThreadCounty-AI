'use client'

import { DashboardHeader } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader title="Settings" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-lg space-y-6">
          <Card className="glass border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm">Email notifications</span>
                <input type="checkbox" defaultChecked className="accent-primary" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Analysis complete alerts</span>
                <input type="checkbox" defaultChecked className="accent-primary" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Weekly summary</span>
                <input type="checkbox" className="accent-primary" />
              </label>
            </CardContent>
          </Card>

          <Card className="glass border-destructive/30">
            <CardHeader>
              <CardTitle className="text-base text-destructive">
                Danger zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Permanently delete your account and all associated data.
              </p>
              <Button variant="destructive">Delete account</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
