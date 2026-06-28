'use client'

import { Factory, Shirt, Sofa, Stethoscope, Plane, Recycle } from 'lucide-react'
import { SectionHeading, Stagger, StaggerItem } from './primitives'

const INDUSTRIES = [
  { icon: Shirt, title: 'Apparel & Fashion', desc: 'Verify thread counts and fabric grade before production.' },
  { icon: Sofa, title: 'Home Textiles', desc: 'Quality-check upholstery, bedding, and drapery at scale.' },
  { icon: Factory, title: 'Manufacturing QC', desc: 'Automated inline inspection across production lines.' },
  { icon: Stethoscope, title: 'Medical Textiles', desc: 'Validate density specs for surgical and protective fabrics.' },
  { icon: Plane, title: 'Technical & Aerospace', desc: 'Certify performance materials against tight tolerances.' },
  { icon: Recycle, title: 'Sustainability', desc: 'Assess recycled and blended fibers with confidence.' },
]

export function Industries() {
  return (
    <section id="industries" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Industries"
          title="Trusted across the textile value chain"
          description="From the design studio to the factory floor, ThreadCounty adapts to how your team works."
        />
        <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((it) => (
            <StaggerItem key={it.title}>
              <div className="group flex items-start gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40 hover:bg-card">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/60 text-accent transition-colors group-hover:text-primary">
                  <it.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{it.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {it.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
