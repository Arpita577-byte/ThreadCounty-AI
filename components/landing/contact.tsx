'use client'

import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Reveal, SectionHeading } from './primitives'

const inputClass =
  'w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:bg-secondary/70'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Let's talk textiles"
              description="Have a question or want a tailored demo for your team? Reach out — we usually reply within one business day."
            />
            <div className="mt-10 flex flex-col gap-5">
              {[
                { icon: Mail, label: 'Email', value: 'hello@threadcounty.ai' },
                { icon: MapPin, label: 'Studio', value: 'Lisbon · Remote-first' },
                { icon: Clock, label: 'Hours', value: 'Mon–Fri · 9:00–18:00 WET' },
              ].map((c) => (
                <Reveal key={c.label}>
                  <div className="flex items-center gap-4">
                    <div className="grid size-11 place-items-center rounded-xl border border-border bg-secondary/60 text-accent">
                      <c.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {c.label}
                      </p>
                      <p className="text-sm font-medium">{c.value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl glass p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input id="name" required placeholder="Jane Doe" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <input id="company" placeholder="Acme Textiles" className={inputClass} />
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your use case…"
                  className={`${inputClass} resize-none`}
                />
              </div>
              <Button type="submit" className="mt-5 w-full" size="lg">
                {sent ? (
                  <motion.span
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    Message sent — thank you!
                  </motion.span>
                ) : (
                  <>
                    Send message
                    <Send className="ml-1 size-4" />
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
