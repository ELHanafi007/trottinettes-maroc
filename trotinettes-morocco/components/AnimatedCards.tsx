'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { scooters } from '@/data/scooters'

export default function AnimatedCards() {
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
            <div className="absolute top-4 left-4 z-10 bg-[#cc0000] text-white font-black text-xs px-3 py-1 uppercase tracking-widest">
              {scooter.badge}
            </div>
          )}
          <div className="relative h-56 bg-[#111] overflow-hidden border-b border-white/10">
            <Image
              src={scooter.image}
              alt={scooter.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
            <div className="absolute bottom-4 right-4 text-right z-10">
              <div className="font-display text-3xl text-[#cc0000]">{scooter.maxSpeed}</div>
              <div className="text-white/60 text-xs">km/h</div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display text-3xl mb-1 group-hover:text-[#cc0000] transition-colors duration-300">
              {scooter.name.toUpperCase()}
            </h3>
            <p className="text-white/40 text-sm mb-5 line-clamp-2">{scooter.description}</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-3xl text-[#cc0000]">{scooter.price.toLocaleString()}</div>
                <div className="text-white/30 text-xs uppercase tracking-widest">MAD</div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={`/products/${scooter.id}`}
                  className="bg-[#cc0000] hover:bg-[#e50000] text-white font-black text-xs px-5 py-3 uppercase tracking-widest transition-colors duration-200 inline-block"
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
