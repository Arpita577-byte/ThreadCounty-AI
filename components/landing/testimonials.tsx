'use client'

import { Quote } from 'lucide-react'
import { Reveal, SectionHeading, Stagger, StaggerItem } from './primitives'

const PARTNERS = [
  'LOOMWORKS',
  'FIBERLINE',
  'ATELIER NORD',
  'WEFT LABS',
  'TEXTURA',
  'MERIDIAN MILLS',
  'CRAFTED CO.',
]

const TESTIMONIALS = [
  {
    quote:
      'ThreadCounty replaced three manual QC stations. We catch density defects before they ever leave the line.',
    name: 'Amara Okafor',
    role: 'Head of Quality, Meridian Mills',
  },
  {
    quote:
      'Our buyers used to wait days for lab reports. Now a sourcing manager scans a swatch and has numbers instantly.',
    name: 'Daniel Roth',
    role: 'VP Sourcing, Atelier Nord',
  },
  {
    quote:
      'The accuracy is uncanny. It matches our calibrated microscopes within a thread, at a fraction of the cost.',
    name: 'Priya Nair',
    role: 'Materials Scientist, Weft Labs',
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32">
      {/* Partners marquee */}
      <Reveal className="mb-20">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Trusted by modern textile teams
        </p>
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="font-heading text-lg font-semibold tracking-wide text-muted-foreground/70"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="Precision teams ship with confidence"
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="flex h-full flex-col justify-between rounded-2xl glass p-6">
                <Quote className="size-6 text-primary/70" />
                <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary font-heading text-sm font-semibold text-accent">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
