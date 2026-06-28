'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Aurora } from './aurora'
import { Magnetic } from './primitives'

const TextileMesh = dynamic(() => import('./textile-mesh'), {
  ssr: false,
  loading: () => null,
})

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pt-28"
    >
      <Aurora />
      {/* 3D layer */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <TextileMesh />
      </div>
      {/* readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex max-w-3xl flex-col items-start gap-6"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="size-3.5 text-accent" />
            Enterprise-grade textile intelligence
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            <span className="text-gradient">AI-Powered</span>
            <br />
            Textile Intelligence
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Upload fabric images and receive instant AI-driven textile analysis
            with enterprise-grade precision — thread density, warp &amp; weft
            counts, and quality scoring in seconds.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#pricing">
                <Button size="lg" className="group glow-ring h-12 px-6 text-base">
                  Get Started
                  <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#how">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-border bg-secondary/40 px-6 text-base backdrop-blur"
                >
                  <Play className="mr-1 size-4 text-accent" />
                  Try Live Demo
                </Button>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" />
              99.2% analysis accuracy
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              Sub-second processing
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-accent" />
              SOC 2 compliant
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="size-1.5 rounded-full bg-foreground/70"
          />
        </div>
      </motion.div>
    </section>
  )
}
