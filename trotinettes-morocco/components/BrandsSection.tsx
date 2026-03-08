'use client'

import { motion } from 'framer-motion'
import { brands } from '@/data/brands'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Calendar } from 'lucide-react'

export default function BrandsSection() {
  return (
    <section className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-[#cc0000] font-black uppercase tracking-[0.4em] text-xs mb-4">
            <span className="w-8 h-[2px] bg-[#cc0000]" />
            <span className="w-1 h-1 bg-[#cc0000] rotate-45" />
            <span className="w-8 h-[2px] bg-[#cc0000]" />
          </span>
          <h2 className="font-display text-5xl md:text-7xl leading-none mb-6">
            NOS <span className="text-[#cc0000]">MARQUES</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Les meilleures marques mondiales de trottinettes électriques. 
            Qualité certifiée, garantie officielle et SAV au Maroc.
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-[#cc0000]/50 transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Red line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              {/* Logo Area */}
              <div className="relative h-40 flex items-center justify-center bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/5">
                <div className="relative w-48 h-24 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={192}
                    height={96}
                    className="object-contain max-h-20 w-auto opacity-80 group-hover:opacity-100 transition-all duration-500"
                    unoptimized
                  />
                </div>
                {/* Decorative number */}
                <div className="absolute top-4 right-4 font-display text-6xl text-white/5 group-hover:text-[#cc0000]/10 transition-colors">
                  0{i + 1}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Brand name + tagline */}
                <div className="mb-4">
                  <h3 className="font-display text-2xl group-hover:text-[#cc0000] transition-colors duration-300">
                    {brand.name.toUpperCase()}
                  </h3>
                  <p className="text-white/30 text-xs uppercase tracking-widest mt-1">{brand.tagline}</p>
                </div>

                {/* Description */}
                <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-2">
                  {brand.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 mb-6 text-xs text-white/30">
                  {brand.origin && (
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#cc0000]" />
                      <span>{brand.origin}</span>
                    </div>
                  )}
                  {brand.founded && (
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#cc0000]" />
                      <span>Depuis {brand.founded}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={`/brands/${brand.id}`}
                  className="group/btn flex items-center justify-between w-full border border-white/10 hover:border-[#cc0000] bg-white/[0.02] hover:bg-[#cc0000]/5 text-white/60 hover:text-[#cc0000] font-black text-xs py-4 px-5 uppercase tracking-widest transition-all duration-300"
                >
                  <span>Découvrir la gamme</span>
                  <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-3 text-white/40 hover:text-[#cc0000] font-black uppercase tracking-widest text-xs transition-colors border-b border-white/20 hover:border-[#cc0000] pb-1"
          >
            Voir tous les produits →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
