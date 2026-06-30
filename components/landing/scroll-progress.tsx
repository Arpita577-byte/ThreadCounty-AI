'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-accent via-primary to-accent shadow-[0_0_12px_oklch(0.66_0.18_250_/_0.5)]" />
      </motion.div>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[59] h-8 origin-left opacity-30 blur-md"
        aria-hidden="true"
      >
        <div className="h-full w-full bg-gradient-to-r from-accent/40 via-primary/40 to-accent/40" />
      </motion.div>
    </>
  )
}
