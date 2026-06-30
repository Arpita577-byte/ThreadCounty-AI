'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'
import { AuthLayout } from '@/components/auth/auth-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll send a recovery link to your email"
    >
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
          />
        </div>
        <Button type="submit" className="group h-11 w-full glow-ring">
          <Mail className="mr-1.5 size-4" />
          Send recovery link
        </Button>
        <Link
          href="/login"
          className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </motion.form>
    </AuthLayout>
  )
}
