import { notFound } from 'next/navigation'
import { getBrands } from '@/data/brands'
import { getScooters } from '@/data/scooters'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Zap, Battery, Gauge, Weight } from 'lucide-react'
import BrandHero from './BrandHero'
import { Brand, Scooter } from '@/types'

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const brands = await getBrands()
  return brands.map((brand) => ({
    slug: brand.id,
  }))
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brands = await getBrands()
  const scooters = await getScooters()
  
  const brand = brands.find((b: Brand) => b.id === slug)

  if (!brand) {
    notFound()
  }

  const brandScooters = scooters.filter((s: Scooter) => s.brand === brand.id)

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen font-body">
      {/* Hero Section with Client Component for animations */}
      <BrandHero brand={brand} />

      {/* Brand Info Bar */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {brand.origin && (
              <div className="flex items-center gap-3 text-white/60">
                <MapPin size={18} className="text-[#cc0000]" />
                <span className="font-black uppercase tracking-widest text-xs">
                  Origine: <span className="text-white">{brand.origin}</span>
                </span>
              </div>
            )}
            {brand.founded && (
              <div className="flex items-center gap-3 text-white/60">
                <Calendar size={18} className="text-[#cc0000]" />
                <span className="font-black uppercase tracking-widest text-xs">
                  Fondée: <span className="text-white">{brand.founded}</span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 text-white/60">
              <Zap size={18} className="text-[#cc0000]" />
              <span className="font-black uppercase tracking-widest text-xs">
                Modèles: <span className="text-white">{brandScooters.length}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back link */}
          <Link
            href="/#brands"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#cc0000] font-black uppercase tracking-widest text-xs transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Retour aux marques
          </Link>

          {/* Section header */}
          <div className="mb-16">
            <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-[#cc0000]" /> Notre Gamme
            </span>
            <h2 className="font-display text-5xl md:text-6xl leading-none">
              LES <span className="text-[#cc0000]">{brand.name.toUpperCase()}</span>
            </h2>
          </div>

          {brandScooters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandScooters.map((scooter: Scooter) => (
                <Link
                  key={scooter.id}
                  href={`/products/${scooter.id}`}
                  className="group relative bg-white/[0.02] border border-white/5 hover:border-[#cc0000]/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-b from-white/[0.05] to-transparent overflow-hidden">
                    <Image
                      src={scooter.images[0]}
                      alt={scooter.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {scooter.badge && (
                      <div className="absolute top-4 right-4 bg-[#cc0000] text-white font-black text-xs px-3 py-1 uppercase tracking-widest">
                        {scooter.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-2xl mb-2 group-hover:text-[#cc0000] transition-colors">
                      {scooter.name}
                    </h3>
                    <p className="text-white/40 text-sm mb-4 line-clamp-2">
                      {scooter.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="flex items-center gap-2 text-white/30">
                        <Gauge size={12} className="text-[#cc0000]" />
                        <span>{scooter.maxSpeed} km/h</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/30">
                        <Battery size={12} className="text-[#cc0000]" />
                        <span>{scooter.range} km</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/30">
                        <Zap size={12} className="text-[#cc0000]" />
                        <span>{scooter.motorPower}W</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/30">
                        <Weight size={12} className="text-[#cc0000]" />
                        <span>{scooter.weight}kg</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 text-xs uppercase tracking-widest">À partir de</span>
                      <span className="font-display text-2xl text-[#cc0000]">{scooter.price.toLocaleString()} MAD</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/10 bg-white/[0.02]">
              <p className="text-white/40 text-lg mb-6">
                Aucun modèle disponible pour le moment.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#cc0000] hover:bg-[#e50000] text-white font-black px-8 py-4 uppercase tracking-widest transition-colors text-sm"
              >
                Nous contacter →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            PRÊT À <span className="text-[#cc0000]">COMMANDER</span> ?
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Contactez-nous pour plus d&apos;informations sur les modèles {brand.name}.
            Livraison rapide partout au Maroc.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#cc0000] hover:bg-[#e50000] text-white font-black px-10 py-5 uppercase tracking-widest transition-colors text-sm"
            >
              Nous Contacter →
            </Link>
            <a
              href={`https://wa.me/212600000000?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20les%20trottinettes%20${encodeURIComponent(brand.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/20 hover:border-[#cc0000] text-white/70 hover:text-white font-black px-10 py-5 uppercase tracking-widest transition-all text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
