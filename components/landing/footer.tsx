'use client'

import { AtSign, Globe, MessageCircle } from 'lucide-react'
import { Logo } from './logo'

const COLUMNS = [
  {
    title: 'Product',
    links: ['Features', 'How it works', 'Pricing', 'Live demo'],
  },
  {
    title: 'Company',
    links: ['About', 'Industries', 'Careers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API reference', 'Changelog', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'DPA'],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-powered textile intelligence for teams that measure twice and
              ship once.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[MessageCircle, Globe, AtSign].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm font-semibold">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} ThreadCounty. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
