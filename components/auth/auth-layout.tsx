'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/landing/logo'
import { Aurora } from '@/components/landing/aurora'

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle: string
}) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-12">
      <Aurora />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 0%, oklch(0.66 0.18 250 / 0.2), transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="glass glow-ring rounded-2xl border border-border/60 p-8 shadow-2xl shadow-black/30">
          <div className="mb-6 text-center">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to ThreadCounty&apos;s Terms and Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}
