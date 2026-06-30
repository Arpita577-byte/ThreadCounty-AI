'use client'

import { motion } from 'framer-motion'
import { Activity, Layers, Sparkles, Zap } from 'lucide-react'

const CARDS = [
  {
    icon: Layers,
    label: 'Fabric Type',
    value: 'Egyptian Cotton',
    sub: 'Plain weave · Giza 88',
    color: 'text-accent',
    delay: 0.6,
    position: 'top-4 right-0 lg:right-4',
  },
  {
    icon: Activity,
    label: 'Thread Density',
    value: '847 TPI',
    sub: 'Warp 432 · Weft 415',
    color: 'text-primary',
    delay: 0.85,
    position: 'top-[38%] -left-2 lg:left-0',
  },
  {
    icon: Zap,
    label: 'Quality Score',
    value: '94.2',
    sub: 'Confidence 98.7%',
    color: 'text-accent',
    delay: 1.1,
    position: 'bottom-16 right-2 lg:right-8',
  },
]

function AnimatedBar({ delay }: { delay: number }) {
  return (
    <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary/80">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
      />
    </div>
  )
}

export function HeroHud() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      {CARDS.map((card) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: card.delay,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute ${card.position} w-52`}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + card.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="glass glow-ring rounded-2xl p-4 shadow-2xl shadow-black/30"
          >
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg bg-secondary/80">
                <card.icon className={`size-4 ${card.color}`} />
              </div>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {card.label}
              </span>
            </div>
            <p className="mt-2 font-heading text-lg font-semibold tracking-tight">
              {card.value}
            </p>
            <p className="text-xs text-muted-foreground">{card.sub}</p>
            <AnimatedBar delay={card.delay + 0.3} />
          </motion.div>
        </motion.div>
      ))}

      {/* Live analysis badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <Sparkles className="size-3 text-accent" />
          <span className="text-[11px] font-medium text-accent">
            Live analysis preview
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
