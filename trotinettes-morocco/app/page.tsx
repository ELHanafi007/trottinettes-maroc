import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import StatsBar from '@/components/StatsBar'
import AnimatedCards from '@/components/AnimatedCards'
import BrandsSection from '@/components/BrandsSection'

const marqueeItems = [
  'VITESSE MAXIMALE', 'LIVRAISON FES', 'GARANTIE 1 AN', 'PUISSANCE BRUTE',
  'ÉLECTRIQUE', 'TROTTINETTES.FES', 'TOP PERFORMANCE', 'ZÉRO ÉMISSION',
]

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] font-body overflow-x-hidden">

      {/* ── HERO ── */}
      <HeroSection />

      {/* ── MARQUEE ── */}
      <div className="border-y border-[#cc0000]/40 bg-[#cc0000]/5 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-display text-sm tracking-widest text-[#cc0000] mx-8">
              {item} <span className="text-white/20 mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <StatsBar />

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2 mb-3">
                <span className="w-6 h-[2px] bg-[#cc0000]" /> Sélection Premium
              </span>
              <h2 className="font-display text-6xl">NOS BEST-SELLERS</h2>
            </div>
            <Link href="/products" className="hidden md:block text-white/40 hover:text-[#cc0000] font-black uppercase tracking-widest text-xs transition border-b border-white/20 hover:border-[#cc0000] pb-1">
              Tout voir →
            </Link>
          </div>
          <AnimatedCards />
        </div>
      </section>

      {/* ── BRANDS ── */}
      <BrandsSection />

      {/* ── WHY US ── */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#cc0000]" /> Pourquoi Nous
            </span>
            <h2 className="font-display text-6xl">L&apos;AVANTAGE<br /><span className="text-[#cc0000]">TROTTINETTES.FES</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {[
              { num: '01', title: 'Livraison Rapide', body: 'Livraison à Fès et partout au Maroc en 2 à 5 jours ouvrables. Suivi en temps réel.', icon: '⚡' },
              { num: '02', title: 'Longue Autonomie', body: "Batteries haute performance jusqu'à 100km par charge. Jamais en panne.", icon: '🔋' },
              { num: '03', title: 'Garantie 1 An', body: 'Tous nos produits sont certifiés et garantis. SAV réactif à Fès.', icon: '🛡' },
            ].map((item) => (
              <div key={item.num} className="bg-[#0a0a0a] p-10 group hover:bg-white/[0.03] transition-colors cursor-default">
                <div className="font-display text-7xl text-white/5 group-hover:text-[#cc0000]/10 transition-colors mb-4">{item.num}</div>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display text-2xl mb-3 group-hover:text-[#cc0000] transition-colors">{item.title.toUpperCase()}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto relative overflow-hidden border border-[#cc0000]/30 bg-[#cc0000]/5 p-16 text-center">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent" />
          <p className="text-[#cc0000] font-black uppercase tracking-[0.4em] text-xs mb-4">Prêt à rouler ?</p>
          <h2 className="font-display text-5xl md:text-7xl mb-8">COMMANDEZ<br /><span className="text-[#cc0000]">MAINTENANT</span></h2>
          <p className="text-white/50 mb-10 max-w-md mx-auto">Livraison rapide partout au Maroc. Paiement à la livraison disponible.</p>
          <Link
            href="/contact"
            className="inline-block bg-[#cc0000] hover:bg-[#e50000] text-white font-black px-12 py-5 uppercase tracking-widest transition-colors duration-200 animate-glow text-sm"
          >
            Nous Contacter →
          </Link>
        </div>
      </section>

    </div>
  )
}
