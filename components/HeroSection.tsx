'use client'

import Link from 'next/link'
import { GLSLHills } from '@/components/ui/glsl-hills'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100vh', minHeight: '-webkit-fill-available' }}>
      <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
        <GLSLHills height="100vh" width="100vw" speed={0.4} />
      </motion.div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 dark:from-[#0a0a0a]/60 via-transparent to-white dark:to-[#0a0a0a]" />
      <div className="absolute left-4 md:left-8 top-1/4 bottom-1/4 w-[2px] bg-[#cc0000] z-20 animate-flicker hidden sm:block" />

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-20 flex flex-col justify-center h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-4 sm:mb-6">
            <motion.span
              className="block h-[2px] bg-[#cc0000]"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            <span className="hidden xs:inline">Fès N°1 — </span>Scooter Électrique
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-display text-[clamp(3rem,15vw,7rem)] sm:text-[clamp(4rem,13vw,9rem)] md:text-[clamp(5rem,13vw,11rem)] leading-none mb-4 sm:mb-6"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            JOUET<br />
            <span className="text-[#cc0000]">MAROC</span>
          </motion.h1>
        </div>

        <motion.p
          className="text-[#f0f0f0]/60 text-sm sm:text-base max-w-xs sm:max-w-md mb-6 sm:mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Les machines les plus rapides de Fès. Zéro compromis sur la vitesse, la puissance et le style.
        </motion.p>

        <motion.div
          className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
            <Link href="/products" className="inline-block bg-[#cc0000] hover:bg-[#e50000] text-white font-black px-8 sm:px-10 py-3 sm:py-4 uppercase tracking-widest transition-colors duration-200 animate-glow text-xs sm:text-sm w-full text-center">
              Explorer →
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="w-full xs:w-auto">
            <Link href="/contact" className="inline-block border border-white/20 hover:border-[#cc0000] text-white/70 hover:text-white font-black px-8 sm:px-10 py-3 sm:py-4 uppercase tracking-widest transition-all duration-200 text-xs sm:text-sm w-full text-center">
              Commander
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest">Défiler</span>
        <motion.div
          className="w-[1px] h-8 sm:h-10 bg-gradient-to-b from-white/40 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      </motion.div>
    </section>
  )
}
