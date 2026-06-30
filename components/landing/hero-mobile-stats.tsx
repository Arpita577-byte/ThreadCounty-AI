'use client'

import { motion } from 'framer-motion'
import { Activity, Layers, Zap } from 'lucide-react'

const MOBILE_STATS = [
  { icon: Layers, label: 'Egyptian Cotton', value: 'Plain weave' },
  { icon: Activity, label: '847 TPI', value: 'Thread density' },
  { icon: Zap, label: '94.2', value: 'Quality score' },
]

export function HeroMobileStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="mt-4 grid grid-cols-3 gap-2 md:hidden"
    >
      {MOBILE_STATS.map((stat) => (
        <div
          key={stat.label}
          className="glass rounded-xl p-3 text-center"
        >
          <stat.icon className="mx-auto size-4 text-accent" />
          <p className="mt-1.5 font-heading text-sm font-semibold">
            {stat.label}
          </p>
          <p className="text-[10px] text-muted-foreground">{stat.value}</p>
        </div>
      ))}
    </motion.div>
  )
}
