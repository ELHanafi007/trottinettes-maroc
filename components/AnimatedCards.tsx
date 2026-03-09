'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Scooter } from '@/types'

interface AnimatedCardsProps {
  scooters: Scooter[]
}

export default function AnimatedCards({ scooters }: AnimatedCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
      {scooters.slice(0, 3).map((scooter, i) => (
        <motion.div
          key={scooter.id}
          className="bg-[#0a0a0a] group relative overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {scooter.badge && (
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-[#cc0000] text-white font-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 uppercase tracking-widest">
              {scooter.badge}
            </div>
          )}
          <div className="relative h-48 sm:h-56 bg-[#111] overflow-hidden border-b border-white/10">
            <Image
              src={scooter.images[0]}
              alt={scooter.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-right z-10">
              <div className="font-display text-2xl sm:text-3xl text-[#cc0000]">{scooter.maxSpeed}</div>
              <div className="text-white/60 text-[10px] sm:text-xs">km/h</div>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="font-display text-2xl sm:text-3xl mb-1 sm:mb-2 group-hover:text-[#cc0000] transition-colors duration-300">
              {scooter.name.toUpperCase()}
            </h3>
            <p className="text-white/40 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed">{scooter.description}</p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-2xl sm:text-3xl text-[#cc0000]">{scooter.price.toLocaleString()}</div>
                <div className="text-white/30 text-[10px] sm:text-xs uppercase tracking-widest">MAD</div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/products/${scooter.id}`}
                  className="bg-[#cc0000] hover:bg-[#e50000] text-white font-black text-[10px] sm:text-xs px-4 sm:px-5 py-2 sm:py-3 uppercase tracking-widest transition-colors duration-200 inline-block"
                >
                  Voir →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
