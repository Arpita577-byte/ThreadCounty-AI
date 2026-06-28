'use client'

import { motion } from 'framer-motion'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ''}`}>
      <motion.span
        initial={{ rotate: -8, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
        className="relative grid size-9 place-items-center rounded-xl bg-secondary glow-ring"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5">
          <defs>
            <linearGradient id="tc-logo" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.15 165)" />
              <stop offset="100%" stopColor="oklch(0.66 0.18 250)" />
            </linearGradient>
          </defs>
          {/* woven thread mark */}
          <g stroke="url(#tc-logo)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" opacity="0.55" />
            <path d="M7 4v16M12 4v16M17 4v16" />
          </g>
        </svg>
      </motion.span>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Thread<span className="text-primary">County</span>
      </span>
    </div>
  )
}
