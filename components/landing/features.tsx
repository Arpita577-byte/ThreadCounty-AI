'use client'

import {
  Boxes,
  Gauge,
  LineChart,
  Lock,
  ScanLine,
  Sparkles,
  Workflow,
  Layers,
} from 'lucide-react'
import { Reveal, SectionHeading, Stagger, StaggerItem, Tilt } from './primitives'

const FEATURES = [
  {
    icon: ScanLine,
    title: 'Thread Density Detection',
    desc: 'Pixel-level computer vision resolves warp and weft counts with sub-thread accuracy.',
  },
  {
    icon: Gauge,
    title: 'Instant Quality Scoring',
    desc: 'Every scan returns a calibrated quality rating and confidence score in milliseconds.',
  },
  {
    icon: Layers,
    title: 'Fabric Classification',
    desc: 'Identify weave type, composition, and finish across thousands of textile categories.',
  },
  {
    icon: LineChart,
    title: 'Analysis History',
    desc: 'Searchable, versioned reports with trend analytics across your entire catalog.',
  },
  {
    icon: Workflow,
    title: 'Pipeline Ready',
    desc: 'Plug analysis into QC workflows with webhooks, batch upload, and exportable reports.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'Row-level isolation, encrypted storage, and SOC 2 aligned controls by default.',
  },
]

const BENEFITS = [
  { stat: '40x', label: 'faster than manual inspection' },
  { stat: '99.2%', label: 'measurement accuracy' },
  { stat: '<1s', label: 'average processing time' },
]

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Product Overview"
          title={
            <>
              One platform for every{' '}
              <span className="text-gradient">thread</span>
            </>
          }
          description="ThreadCounty turns a single fabric photo into a complete, enterprise-grade textile report — no specialized hardware, no waiting."
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <StaggerItem key={f.title}>
              <Tilt className="h-full">
                <div className="group relative h-full overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:glow-ring">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(circle, oklch(0.66 0.18 250 / 0.4), transparent 70%)',
                    }}
                  />
                  <div className="relative">
                    <div className="grid size-11 place-items-center rounded-xl border border-border bg-secondary/60">
                      <f.icon className="size-5 text-accent" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Benefits strip */}
        <Reveal className="mt-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-1 bg-card px-6 py-8 text-center"
              >
                <span className="font-heading text-4xl font-semibold text-gradient">
                  {b.stat}
                </span>
                <span className="text-sm text-muted-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
