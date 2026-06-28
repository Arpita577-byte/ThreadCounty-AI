'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Magnetic, SectionHeading, Stagger, StaggerItem, Tilt } from './primitives'

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: '/mo',
    desc: 'For exploring textile AI.',
    features: ['25 analyses / month', 'Basic thread density', 'PNG & JPG upload', 'Community support'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Student',
    price: '$9',
    period: '/mo',
    desc: 'For researchers and learners.',
    features: ['500 analyses / month', 'Full quality scoring', 'Analysis history', 'Email support'],
    cta: 'Get Student',
    featured: false,
  },
  {
    name: 'Professional',
    price: '$49',
    period: '/mo',
    desc: 'For studios and QC teams.',
    features: ['10,000 analyses / month', 'PDF reports & export', 'Batch upload', 'Priority support', 'API access'],
    cta: 'Go Professional',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For global operations.',
    features: ['Unlimited analyses', 'SSO & RBAC', 'Dedicated infra', 'SLA & onboarding', 'On-prem option'],
    cta: 'Contact sales',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Pricing"
          title="Plans that scale with your thread count"
          description="Start free and upgrade as your analysis volume grows. No hidden fees."
        />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name} className="h-full">
              <Tilt max={5} className="h-full">
                <div
                  className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                    plan.featured
                      ? 'border-primary/50 bg-card glow-ring'
                      : 'border-border bg-card/40'
                  }`}
                >
                  {plan.featured ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Recommended
                    </span>
                  ) : null}
                  <h3 className="font-heading text-lg font-semibold">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.desc}</p>
                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-heading text-4xl font-semibold">
                      {plan.price}
                    </span>
                    <span className="mb-1 text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Magnetic className="mt-6 w-full" strength={0.2}>
                    <a href="#contact" className="block">
                      <Button
                        className="w-full"
                        variant={plan.featured ? 'default' : 'outline'}
                      >
                        {plan.cta}
                      </Button>
                    </a>
                  </Magnetic>
                </div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
