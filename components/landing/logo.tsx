'use client'

import { motion } from 'framer-motion'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <motion.span
        whileHover={{ scale: 1.05, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="relative grid size-9 place-items-center rounded-xl border border-primary/20 bg-gradient-to-br from-secondary to-secondary/60 glow-ring"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5">
          <defs>
            <linearGradient id="tc-logo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.15 165)" />
              <stop offset="50%" stopColor="oklch(0.66 0.18 250)" />
              <stop offset="100%" stopColor="oklch(0.72 0.15 165)" />
            </linearGradient>
          </defs>
          <g stroke="url(#tc-logo)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" opacity="0.55" />
            <path d="M7 4v16M12 4v16M17 4v16" />
          </g>
        </svg>
        <motion.span
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute inset-0 rounded-xl bg-primary/10"
        />
      </motion.span>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Thread<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">County</span>
      </span>
    </div>
  )
}
