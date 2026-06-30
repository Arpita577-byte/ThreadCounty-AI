'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MousePointer2, Play, Sparkles } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Aurora } from './aurora'
import { HeroHud } from './hero-hud'
import { HeroMobileStats } from './hero-mobile-stats'
import { Magnetic } from './primitives'
import { LineReveal, TextReveal } from './text-reveal'

const TextileMesh = dynamic(() => import('./textile-mesh'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="size-16 animate-pulse rounded-full bg-primary/10 blur-xl" />
    </div>
  ),
})

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24 pb-8"
    >
      <Aurora />

      {/* Ambient light beams */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[70vh] w-[120vw] -translate-x-1/2 opacity-40"
        style={{
          background:
            'conic-gradient(from 200deg at 50% 0%, transparent, oklch(0.66 0.18 250 / 0.12), oklch(0.72 0.15 165 / 0.08), transparent)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* ── Copy column ── */}
          <div className="flex flex-col items-start gap-6 lg:max-w-xl">
            <LineReveal delay={0.1}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
                <Sparkles className="size-3.5 text-accent" />
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Enterprise-grade textile intelligence
                </span>
              </span>
            </LineReveal>

            <h1 className="font-heading text-balance text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              <TextReveal text="AI-Powered" gradient />
              <br />
              <span className="mt-1 block">
                <TextReveal text="Textile Intelligence" />
              </span>
            </h1>

            <LineReveal delay={0.55}>
              <p className="max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                Upload fabric images and receive instant AI-driven analysis —
                thread density, warp &amp; weft counts, and quality scoring in
                seconds. Move your cursor over the fabric to explore.
              </p>
            </LineReveal>

            <LineReveal delay={0.7} className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="/signup">
                  <Button
                    size="lg"
                    className="group glow-ring h-12 px-7 text-base font-medium"
                  >
                    Get Started Free
                    <ArrowRight className="ml-1.5 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#how">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 border-border/80 bg-secondary/30 px-7 text-base backdrop-blur-md hover:bg-secondary/50"
                  >
                    <Play className="mr-1.5 size-4 text-accent" />
                    Watch Demo
                  </Button>
                </a>
              </Magnetic>
            </LineReveal>

            <LineReveal
              delay={0.85}
              className="flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {[
                { color: 'bg-accent', label: '99.2% accuracy' },
                { color: 'bg-primary', label: '<1s processing' },
                { color: 'bg-accent', label: 'SOC 2 ready' },
              ].map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className={`size-1.5 rounded-full ${item.color}`} />
                  {item.label}
                </span>
              ))}
            </LineReveal>
          </div>

          {/* ── Interactive 3D viewport ── */}
          <LineReveal delay={0.35} className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none">
              {/* Outer glow ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[2rem] opacity-60"
                style={{
                  background:
                    'conic-gradient(from 180deg, oklch(0.66 0.18 250 / 0.3), oklch(0.72 0.15 165 / 0.2), oklch(0.58 0.16 280 / 0.25), oklch(0.66 0.18 250 / 0.3))',
                  filter: 'blur(24px)',
                }}
              />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/20 shadow-2xl shadow-black/40 backdrop-blur-sm">
                {/* Corner accents */}
                <div className="pointer-events-none absolute left-3 top-3 size-6 border-l-2 border-t-2 border-primary/40 rounded-tl-lg" />
                <div className="pointer-events-none absolute right-3 top-3 size-6 border-r-2 border-t-2 border-accent/40 rounded-tr-lg" />
                <div className="pointer-events-none absolute bottom-3 left-3 size-6 border-b-2 border-l-2 border-accent/40 rounded-bl-lg" />
                <div className="pointer-events-none absolute bottom-3 right-3 size-6 border-b-2 border-r-2 border-primary/40 rounded-br-lg" />

                <div className="relative aspect-square w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                  <TextileMesh className="!absolute inset-0 cursor-crosshair" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-background/20" />
                  <HeroHud />
                </div>

                {/* Bottom status bar */}
                <div className="flex items-center justify-between border-t border-border/50 bg-card/40 px-4 py-2.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <MousePointer2 className="size-3 text-primary" />
                    Interactive 3D fabric scan
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                    <span className="font-mono text-[10px] text-accent">
                      0.48s
                    </span>
                  </div>
                </div>
              </div>
              <HeroMobileStats />
            </div>
          </LineReveal>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute inset-x-0 bottom-4 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Scroll
          </span>
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-border/60 p-1">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="size-1.5 rounded-full bg-foreground/60"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
