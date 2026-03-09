'use client'

import { motion } from 'framer-motion'
import { Brand } from '@/types'
import Image from 'next/image'

interface BrandHeroProps {
  brand: Brand
}

export default function BrandHero({ brand }: BrandHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#cc0000]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" />

      {/* Logo */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-64 h-32 flex items-center justify-center">
            <Image
              src={brand.logo}
              alt={`${brand.name} logo`}
              width={256}
              height={128}
              className="object-contain max-h-24 w-auto"
              unoptimized
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl leading-none mb-4"
        >
          {brand.name.toUpperCase()}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-sm mb-6"
        >
          {brand.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {brand.description}
        </motion.p>
      </div>
    </section>
  )
}
