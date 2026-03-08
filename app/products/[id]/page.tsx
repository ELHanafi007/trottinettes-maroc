'use client'

import Link from 'next/link'
import Image from 'next/image'
import { scooters } from '@/data/scooters'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const scooter = scooters.find((s) => s.id === params.id)
  if (!scooter) return notFound()

  const specs = [
    { value: scooter.maxSpeed, unit: 'km/h', label: 'Vitesse Max' },
    { value: scooter.range, unit: 'km', label: 'Autonomie' },
    { value: scooter.motorPower, unit: 'W', label: 'Puissance' },
    { value: scooter.batteryCapacity, unit: 'Ah', label: 'Batterie' },
  ]

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen font-body">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/products" className="inline-flex items-center gap-2 text-white/30 hover:text-[#cc0000] font-black uppercase tracking-widest text-xs transition mb-12">
            ← Retour
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">

          {/* Left — image */}
          <motion.div
            className="bg-[#0a0a0a] relative overflow-hidden min-h-[420px] group"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={scooter.imageFull}
              alt={scooter.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 z-10">
              <div className="font-display text-7xl text-[#cc0000] animate-flicker">{scooter.maxSpeed}</div>
              <div className="text-white/50 text-xs uppercase tracking-widest font-black">km/h max</div>
            </div>
            {scooter.badge && (
              <div className="absolute top-6 right-6 z-10 bg-[#cc0000] text-white font-black text-xs px-3 py-1 uppercase tracking-widest">
                {scooter.badge}
              </div>
            )}
          </motion.div>

          {/* Right — info */}
          <motion.div
            className="bg-[#0a0a0a] p-10 flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-xs flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-[#cc0000]" /> Trotinettes.MA
            </span>
            <h1 className="font-display text-5xl md:text-6xl mb-4">{scooter.name.toUpperCase()}</h1>
            <p className="text-white/40 leading-relaxed mb-10">{scooter.description}</p>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-px bg-white/10 mb-10">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  className="bg-[#0a0a0a] p-5 hover:bg-white/[0.03] transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                >
                  <div className="font-display text-3xl text-[#cc0000]">
                    {spec.value}<span className="text-sm text-white/30 ml-1">{spec.unit}</span>
                  </div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mt-1">{spec.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8">
              {/* Stock + delivery */}
              <div className="flex items-center gap-4 mb-5">
                <span className="flex items-center gap-1.5 text-green-400 text-xs font-black uppercase tracking-widest">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  En stock
                </span>
                <span className="text-white/20 text-xs">|</span>
                <span className="text-white/40 text-xs">🚚 Livraison 2–5 jours ouvrables</span>
              </div>
              <div className="mb-6">
                <div className="font-display text-5xl text-[#cc0000]">{scooter.price.toLocaleString()}</div>
                <div className="text-white/30 text-xs uppercase tracking-widest">MAD — Garantie 1 an incluse</div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/contact?product=${scooter.id}`}
                  className="block text-center bg-[#cc0000] hover:bg-[#e50000] text-white font-black py-5 uppercase tracking-widest transition-colors duration-200 animate-glow text-sm mb-3"
                >
                  Commander maintenant →
                </Link>
              </motion.div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={`https://wa.me/212600000000?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20${encodeURIComponent(scooter.name)}%20%C3%A0%20${scooter.price}%20MAD`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/10 text-[#25D366] font-black py-4 uppercase tracking-widest transition-all duration-200 text-xs"
                  >
                    WhatsApp
                  </a>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contact"
                    className="block text-center border border-white/10 hover:border-[#cc0000] text-white/50 hover:text-white font-black py-4 uppercase tracking-widest transition-all duration-200 text-xs"
                  >
                    Devis
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom specs bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 mt-px">
          {[
            { label: 'Poids', value: `${scooter.weight} kg` },
            { label: 'Moteur', value: `${scooter.motorPower} W` },
            { label: 'Batterie', value: `${scooter.batteryCapacity} Ah` },
            { label: 'Autonomie', value: `${scooter.range} km` },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-[#0a0a0a] px-6 py-5 flex justify-between items-center hover:bg-white/[0.03] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.07 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-widest">{s.label}</span>
              <span className="font-black text-sm">{s.value}</span>
            </motion.div>
          ))}
        </div>

        {/* Related products */}
        <div className="mt-16">
          <h2 className="font-display text-3xl mb-6">AUTRES <span className="text-[#cc0000]">MODÈLES</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {scooters.filter(s => s.id !== scooter.id).slice(0, 3).map((s, i) => (
              <motion.div
                key={s.id}
                className="bg-[#0a0a0a] group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative h-36 overflow-hidden">
                  <Image src={s.image} alt={s.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-display text-lg group-hover:text-[#cc0000] transition-colors">{s.name.toUpperCase()}</div>
                    <div className="font-display text-[#cc0000] text-sm">{s.price.toLocaleString()} MAD</div>
                  </div>
                  <Link href={`/products/${s.id}`} className="bg-[#cc0000] hover:bg-[#e50000] text-white font-black text-xs px-3 py-2 uppercase tracking-widest transition-colors">
                    Voir →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
