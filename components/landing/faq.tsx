'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from './primitives'

const FAQS = [
  {
    q: 'How accurate is the AI analysis?',
    a: 'ThreadCounty achieves 99.2% measurement accuracy on calibrated benchmarks, matching microscope-based inspection within a single thread for most common weaves.',
  },
  {
    q: 'What image formats are supported?',
    a: 'You can upload JPG, JPEG, and PNG files. Images are automatically compressed and validated, with drag-and-drop, preview, and retry built in.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All uploads are encrypted at rest, isolated per account with row-level security, and processed under SOC 2 aligned controls. You own and can delete your data anytime.',
  },
  {
    q: 'Can I export and share reports?',
    a: 'Every analysis can be downloaded as a PDF, printed, or shared via a secure link. Professional plans also include API access and batch export.',
  },
  {
    q: 'Do you offer a free plan?',
    a: 'Absolutely. The Free plan includes 25 analyses per month with no credit card required, so you can evaluate ThreadCounty before upgrading.',
  },
]

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="font-heading text-base font-medium">{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-accent"
          >
            <Plus className="size-4" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                {a}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="Everything you need to know about ThreadCounty's textile intelligence platform."
        />
        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
