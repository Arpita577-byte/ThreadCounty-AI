'use client'

import { Counter, Reveal } from './primitives'

const STATS = [
  { to: 4.2, suffix: 'M+', decimals: 1, label: 'Fabrics analyzed' },
  { to: 99.2, suffix: '%', decimals: 1, label: 'Detection accuracy' },
  { to: 320, suffix: '+', decimals: 0, label: 'Enterprise teams' },
  { to: 48, suffix: 'ms', decimals: 0, label: 'Median latency' },
]

export function Stats() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-8 md:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.66 0.18 250 / 0.15), transparent 70%)',
              }}
            />
            <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading text-4xl font-semibold text-gradient md:text-5xl">
                    <Counter
                      to={s.to}
                      suffix={s.suffix}
                      decimals={s.decimals}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
