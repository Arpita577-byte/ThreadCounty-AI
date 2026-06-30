'use client'

import { motion } from 'framer-motion'

const BRANDS = [
  'LVMH Textiles',
  'Arvind Mills',
  'Toray Industries',
  'PVH Corp',
  'Inditex',
  'H&M Group',
  'Welspun',
  'Lenzing AG',
  'LVMH Textiles',
  'Arvind Mills',
  'Toray Industries',
  'PVH Corp',
]

export function HeroMarquee() {
  return (
    <section className="relative border-y border-border/50 bg-card/20 py-6 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-8">
          <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by
          </span>
          <div className="relative flex-1 overflow-hidden mask-fade-x">
            <motion.div
              className="flex w-max gap-12"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <span
                  key={`${brand}-${i}`}
                  className="shrink-0 whitespace-nowrap font-heading text-sm font-medium tracking-wide text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {brand}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
