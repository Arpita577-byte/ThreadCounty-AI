'use client'

import { motion } from 'framer-motion'
import { CloudUpload, Cpu, FileText } from 'lucide-react'
import { Reveal, SectionHeading } from './primitives'

const STEPS = [
  {
    icon: CloudUpload,
    step: '01',
    title: 'Upload your fabric',
    desc: 'Drag and drop a JPG or PNG. Images are compressed, validated, and securely stored.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI runs the analysis',
    desc: 'Our vision models detect weave structure, count threads, and estimate composition.',
  },
  {
    icon: FileText,
    step: '03',
    title: 'Get a precise report',
    desc: 'Receive thread density, warp & weft counts, quality rating, and exportable PDF reports.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="How It Works"
          title="From photo to report in three steps"
          description="No hardware. No training. Just upload and let ThreadCounty handle the precision."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px md:block"
            style={{
              background:
                'linear-gradient(to right, transparent, oklch(0.66 0.18 250 / 0.5), oklch(0.72 0.15 165 / 0.5), transparent)',
            }}
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.12}>
                <div className="relative flex flex-col items-start">
                  <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="relative z-10 grid size-14 place-items-center rounded-2xl border border-border bg-card glow-ring"
                  >
                    <s.icon className="size-6 text-accent" />
                  </motion.div>
                  <span className="mt-5 font-mono text-xs tracking-widest text-muted-foreground">
                    STEP {s.step}
                  </span>
                  <h3 className="mt-1 font-heading text-xl font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
