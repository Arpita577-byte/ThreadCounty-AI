'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const x = useMotionValue(-300)
  const y = useMotionValue(-300)
  const sx = useSpring(x, { stiffness: 80, damping: 18 })
  const sy = useSpring(y, { stiffness: 80, damping: 18 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Primary glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        className="pointer-events-none fixed left-0 top-0 z-[55] hidden size-[500px] rounded-full opacity-40 mix-blend-screen md:block"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,oklch(0.66_0.18_250_/_0.18),transparent_55%)]" />
      </motion.div>
      {/* Secondary accent */}
      <motion.div
        aria-hidden="true"
        style={{
          x: sx,
          y: sy,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="pointer-events-none fixed left-0 top-0 z-[54] hidden size-48 rounded-full opacity-30 mix-blend-screen md:block"
      >
        <div className="size-full rounded-full bg-[radial-gradient(circle,oklch(0.72_0.15_165_/_0.25),transparent_60%)]" />
      </motion.div>
    </>
  )
}
