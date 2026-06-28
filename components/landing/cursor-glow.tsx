'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CursorGlow() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 120, damping: 20 })
  const sy = useSpring(y, { stiffness: 120, damping: 20 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Skip on touch / coarse pointers for performance.
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 160)
      y.set(e.clientY - 160)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden size-80 rounded-full opacity-50 mix-blend-screen md:block"
    >
      <div className="size-full rounded-full bg-[radial-gradient(circle,oklch(0.66_0.18_250_/_0.22),transparent_60%)]" />
    </motion.div>
  )
}
