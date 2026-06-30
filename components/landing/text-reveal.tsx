'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: -40, filter: 'blur(12px)' },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.15 + i * 0.08,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export function TextReveal({
  text,
  className,
  gradient = false,
}: {
  text: string
  className?: string
  gradient?: boolean
}) {
  const words = text.split(' ')

  return (
    <span
      className={cn('inline-flex flex-wrap gap-x-[0.28em]', className)}
      style={{ perspective: 800 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="show"
          className={cn(
            'inline-block origin-bottom',
            gradient && 'text-gradient',
          )}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function LineReveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
