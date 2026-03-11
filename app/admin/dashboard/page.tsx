import { getScooters, getBrands, getSales } from '@/lib/db'
import { TrendingUp, ShoppingBag, Tag, DollarSign } from 'lucide-react'
import Image from 'next/image'

export default async function DashboardPage() {
  const [scooters, brands, sales] = await Promise.all([
    getScooters(),
    getBrands(),
    getSales(),
  ])

  const totalEarnings = sales.reduce((acc, s) => acc + s.amount, 0)

  const stats = [
    { name: 'Produits', value: scooters.length, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Marques', value: brands.length, icon: Tag, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Ventes', value: sales.length, icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Revenus', value: `${totalEarnings.toLocaleString()} DH`, icon: DollarSign, color: 'text-[#cc0000]', bg: 'bg-[#cc0000]/10' },
  ]

  return (
    <div className="space-y-12">
      <div>
        <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2 mb-3">
          <span className="w-6 h-[2px] bg-[#cc0000]" /> Vue d&apos;ensemble
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-white">TABLEAU DE BORD</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/[0.02] border border-white/5 p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={64} className={stat.color} />
            </div>
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{stat.name}</p>
            <p className="text-3xl font-display text-white">{stat.value}</p>
            <div className={`mt-4 h-1 w-12 ${stat.color.replace('text-', 'bg-')} opacity-50`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Sales */}
        <div className="bg-white/[0.02] border border-white/5 p-8">
          <h2 className="font-display text-2xl mb-8 flex items-center gap-3">
            <TrendingUp size={20} className="text-[#cc0000]" />
            VENTES RÉCENTES
          </h2>
          <div className="space-y-4">
            {sales.slice(-5).reverse().map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-[#cc0000]/30 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg text-white truncate">{sale.productName.toUpperCase()}</p>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{sale.customerName} • {sale.date}</p>
                </div>
                <p className="text-[#cc0000] font-display text-xl whitespace-nowrap ml-4">+{sale.amount.toLocaleString()} DH</p>
              </div>
            ))}
            {sales.length === 0 && <p className="text-white/20 text-sm italic">Aucune vente enregistrée.</p>}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white/[0.02] border border-white/5 p-8">
          <h2 className="font-display text-2xl mb-8 flex items-center gap-3">
            <ShoppingBag size={20} className="text-[#cc0000]" />
            PRODUITS RÉCENTS
          </h2>
          <div className="space-y-4">
            {scooters.slice(0, 5).map((scooter) => (
              <div key={scooter.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-[#cc0000]/30 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 relative flex-shrink-0 bg-[#111] overflow-hidden">
                    <Image src={scooter.images[0]} alt={scooter.name} width={48} height={48} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg text-white truncate">{scooter.name.toUpperCase()}</p>
                    <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{scooter.brand}</p>
                  </div>
                </div>
                <p className="text-white/60 font-display text-xl whitespace-nowrap ml-4">{scooter.price.toLocaleString()} DH</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#cc0000]/5 border border-[#cc0000]/20 p-8">
        <h3 className="font-display text-xl mb-6 text-[#cc0000]">ACTIONS RAPIDES</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/products/new" className="bg-[#cc0000] hover:bg-[#e50000] text-white px-8 py-4 font-black uppercase tracking-widest text-xs transition-colors shadow-lg shadow-[#cc0000]/20">
            + Ajouter Produit
          </a>
          <a href="/admin/brands/new" className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 font-black uppercase tracking-widest text-xs border border-white/10 transition-colors">
            + Ajouter Marque
          </a>
        </div>
      </div>
    </div>
  )
}
