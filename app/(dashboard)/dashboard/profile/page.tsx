'use client'

import { useState } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <>
      <DashboardHeader title="Profile" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-lg space-y-6">
          <Card className="glass border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Personal information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    defaultValue={user?.fullName ?? ''}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email ?? ''}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plan</Label>
                  <Input
                    value={user?.plan ?? 'free'}
                    disabled
                    className="capitalize"
                  />
                </div>
                <Button type="submit" className="glow-ring">
                  {saved ? 'Saved!' : 'Save changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="glass border-border/60">
            <CardHeader>
              <CardTitle className="text-base">Change password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
              <Button variant="outline">Update password</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
