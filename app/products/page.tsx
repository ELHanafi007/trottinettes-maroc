import Link from 'next/link'
import Image from 'next/image'
import { getScooters } from '@/data/scooters'
import { getBrands } from '@/data/brands'
import { motion } from 'framer-motion'

export default async function ProductsPage() {
  const scooters = await getScooters()
  const brands = await getBrands()

  const getBrandName = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId)
    return brand?.name || brandId
  }

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen font-body">

      {/* Page Header */}
      <div className="border-b border-white/10 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs flex items-center gap-2 mb-3">
              <motion.span
                className="block h-[2px] bg-[#cc0000]"
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              Catalogue Complet
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">NOS<br /><span className="text-[#cc0000]">MACHINES</span></h1>
          </motion.div>
          <motion.p
            className="text-white/30 text-xs sm:text-sm max-w-xs text-right leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {scooters.length} modèles disponibles. Du city rider au monstre de vitesse.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {scooters.map((scooter, i) => (
            <motion.div
              key={scooter.id}
              className="bg-white/[0.02] border border-white/5 hover:border-[#cc0000]/50 transition-all duration-500 group relative overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Red line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Badge */}
              {scooter.badge && (
                <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 z-10 font-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 uppercase tracking-widest ${scooter.badge === 'Haut de Gamme' ? 'bg-white text-[#0a0a0a]' : 'bg-[#cc0000] text-white'}`}>
                  {scooter.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 sm:h-56 bg-[#111] overflow-hidden border-b border-white/5">
                <Image
                  src={scooter.images[0]}
                  alt={scooter.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />

                {/* Brand badge */}
                <Link
                  href={`/brands/${scooter.brand}`}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 backdrop-blur-sm border border-white/10 hover:border-[#cc0000] text-white/70 hover:text-white font-black text-[10px] sm:text-[11px] px-2 sm:px-3 py-1.5 uppercase tracking-widest transition-all"
                >
                  {getBrandName(scooter.brand)}
                </Link>

                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-right z-10">
                  <div className="font-display text-2xl sm:text-3xl text-[#cc0000]">{scooter.maxSpeed}</div>
                  <div className="text-white/50 text-[10px] sm:text-xs">km/h</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="font-display text-xl sm:text-2xl mb-1 group-hover:text-[#cc0000] transition-colors duration-300">
                  {scooter.name.toUpperCase()}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed">{scooter.description}</p>

                {/* Specs mini row */}
                <div className="grid grid-cols-3 gap-2 mb-4 sm:mb-5">
                  {[
                    { val: scooter.maxSpeed, unit: 'km/h' },
                    { val: scooter.range, unit: 'km' },
                    { val: scooter.motorPower, unit: 'W' },
                  ].map((s) => (
                    <div key={s.unit} className="bg-white/5 p-2 text-center border border-white/5">
                      <div className="font-display text-base sm:text-lg text-[#cc0000]">{s.val}</div>
                      <div className="text-white/30 text-[9px] sm:text-[10px] uppercase tracking-wider">{s.unit}</div>
                    </div>
                  ))}
                </div>

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
      </div>
    </div>
  )
}
