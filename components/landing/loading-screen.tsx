'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Logo } from './logo'

function WeavePattern() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="size-28 text-primary"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="weave-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.15 165)" />
          <stop offset="100%" stopColor="oklch(0.66 0.18 250)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.line
          key={`h-${i}`}
          x1="10"
          y1={15 + i * 15}
          x2="110"
          y2={15 + i * 15}
          stroke="url(#weave-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.5 + i * 0.05, scaleX: 1 }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          style={{ transformOrigin: 'left center' }}
        />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.line
          key={`v-${i}`}
          x1={15 + i * 15}
          y1="10"
          x2={15 + i * 15}
          y2="110"
          stroke="url(#weave-grad)"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.7 + i * 0.03, scaleY: 1 }}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
          style={{ transformOrigin: 'center top' }}
        />
      ))}
    </svg>
  )
}

export function LoadingScreen() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30"
            style={{
              background:
                'radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.66 0.18 250 / 0.15), transparent)',
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col items-center gap-8"
          >
            <WeavePattern />

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Logo />
            </motion.div>

            <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-secondary">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ delay: 0.3, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-xs tracking-[0.25em] text-muted-foreground uppercase"
            >
              Initializing intelligence
            </motion.p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
