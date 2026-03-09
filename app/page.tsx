import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import AnimatedCards from '@/components/AnimatedCards'
import BrandsSection from '@/components/BrandsSection'
import { getScooters } from '@/data/scooters'
import { getBrands } from '@/data/brands'

const marqueeItems = [
  'VITESSE MAXIMALE', 'LIVRAISON FES', 'GARANTIE 1 AN', 'PUISSANCE BRUTE',
  'ÉLECTRIQUE', 'TROTTINETTES.FES', 'TOP PERFORMANCE', 'ZÉRO ÉMISSION',
]

export default async function HomePage() {
  const [scooters, brands] = await Promise.all([
    getScooters(),
    getBrands(),
  ])

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] font-body overflow-x-hidden">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#cc0000]/40 bg-[#cc0000]/5 py-2 sm:py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display text-[10px] sm:text-sm tracking-widest text-[#cc0000] mx-4 sm:mx-8">
              {item} <span className="text-white/20 mx-1 sm:mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <StatsBar />

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0 mb-10 sm:mb-14">
            <div>
              <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs flex items-center gap-2 mb-3">
                <span className="w-4 sm:w-6 h-[2px] bg-[#cc0000]" /> Sélection Premium
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl">NOS BEST-SELLERS</h2>
            </div>
            <Link href="/products" className="text-white/40 hover:text-[#cc0000] font-black uppercase tracking-widest text-[10px] sm:text-xs transition border-b border-white/20 hover:border-[#cc0000] pb-1">
              Tout voir →
            </Link>
          </div>
          <AnimatedCards scooters={scooters} />
        </div>
      </section>

      {/* ── BRANDS ── */}
      <BrandsSection brands={brands} />

      {/* ── WHY US ── */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-white/10" id="why-us">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 sm:mb-14 md:mb-16">
            <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs flex items-center gap-2 mb-3">
              <span className="w-4 sm:w-6 h-[2px] bg-[#cc0000]" /> Pourquoi Nous
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight">L&apos;AVANTAGE<br /><span className="text-[#cc0000]">TROTTINETTES.FES</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              { num: '01', title: 'Livraison Rapide', body: 'Livraison à Fès et partout au Maroc en 2 à 5 jours ouvrables. Suivi en temps réel.', icon: '⚡' },
              { num: '02', title: 'Longue Autonomie', body: "Batteries haute performance jusqu'à 100km par charge. Jamais en panne.", icon: '🔋' },
              { num: '03', title: 'Garantie 1 An', body: 'Tous nos produits sont certifiés et garantis. SAV réactif à Fès.', icon: '🛡' },
            ].map((item) => (
              <div key={item.num} className="bg-[#0a0a0a] p-6 sm:p-8 md:p-10 group hover:bg-white/[0.03] transition-colors cursor-default">
                <div className="font-display text-5xl sm:text-6xl md:text-7xl text-white/5 group-hover:text-[#cc0000]/10 transition-colors mb-3 sm:mb-4">{item.num}</div>
                <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
                <h3 className="font-display text-xl sm:text-2xl mb-2 sm:mb-3 group-hover:text-[#cc0000] transition-colors">{item.title.toUpperCase()}</h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto relative overflow-hidden border border-[#cc0000]/30 bg-[#cc0000]/5 p-8 sm:p-12 md:p-16 text-center">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
          <p className="text-[#cc0000] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[10px] sm:text-xs mb-3 sm:mb-4">Prêt à rouler ?</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl mb-6 sm:mb-8 leading-tight">COMMANDEZ<br /><span className="text-[#cc0000]">MAINTENANT</span></h2>
          <p className="text-white/50 mb-6 sm:mb-10 text-xs sm:text-sm max-w-xs sm:max-w-md mx-auto leading-relaxed">Livraison rapide partout au Maroc. Paiement à la livraison disponible.</p>
          <Link
            href="/contact"
            className="inline-block bg-[#cc0000] hover:bg-[#e50000] text-white font-black px-8 sm:px-12 py-4 sm:py-5 uppercase tracking-widest transition-colors duration-200 animate-glow text-xs sm:text-sm w-full sm:w-auto"
          >
            Nous Contacter →
          </Link>
        </div>
      </section>

    </div>
  )
}
