'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [dot, setDot] = useState({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setDot({ x: e.clientX, y: e.clientY })
    }

    const addHover = () => setIsHovering(true)
    const removeHover = () => setIsHovering(false)

    window.addEventListener('mousemove', move)

    const attach = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#cc0000]"
        animate={{
          x: pos.x - (isHovering ? 24 : 16),
          y: pos.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-[#cc0000]"
        animate={{ x: dot.x - 3, y: dot.y - 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
    </>
  )
}
