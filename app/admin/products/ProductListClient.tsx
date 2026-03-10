'use client'

import { Scooter } from '@/types'
import Link from 'next/link'
import { Edit2, Trash2, Plus } from 'lucide-react'

interface ProductListClientProps {
  scooters: Scooter[]
  brandMap: Record<string, string>
}

export default function ProductListClient({ scooters, brandMap }: ProductListClientProps) {
  const handleDelete = async (id: string) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' })
      if (res.ok) window.location.reload()
    }
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-[10px] flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#cc0000]" /> Inventaire
          </span>
          <h1 className="font-display text-4xl sm:text-6xl text-white">GESTION PRODUITS</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[#cc0000] hover:bg-[#e50000] text-white px-8 py-4 font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-[#cc0000]/20 flex items-center gap-2 group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Nouveau Produit
        </Link>
      </div>

      <div className="bg-white/[0.02] border border-white/5 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="px-8 py-5 text-left text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Image</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Nom</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Marque</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Prix</th>
                <th className="px-8 py-5 text-left text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Specs</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {scooters.map((scooter) => (
                <tr key={scooter.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="px-8 py-4">
                    <div className="w-16 h-12 bg-[#111] overflow-hidden relative border border-white/5">
                      <img src={scooter.images[0]} alt={scooter.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="font-display text-lg text-white group-hover:text-[#cc0000] transition-colors">{scooter.name.toUpperCase()}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{brandMap[scooter.brand] || scooter.brand}</span>
                  </td>
                  <td className="px-8 py-4">
                    <span className="font-display text-xl text-[#cc0000]">{scooter.price.toLocaleString()} DH</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex gap-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-2 py-1">{scooter.range}km</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-2 py-1">{scooter.maxSpeed}km/h</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/products/edit/${scooter.id}`}
                        className="p-2 bg-white/5 hover:bg-blue-500/20 text-white/40 hover:text-blue-400 transition-all border border-white/5"
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(scooter.id)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-500 transition-all border border-white/5"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-white/5">
          {scooters.map((scooter) => (
            <div key={scooter.id} className="p-6 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start gap-6">
                <div className="w-24 h-20 bg-[#111] border border-white/5 flex-shrink-0 overflow-hidden relative">
                  <img src={scooter.images[0]} alt={scooter.name} className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl text-white truncate">{scooter.name.toUpperCase()}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-3">{brandMap[scooter.brand] || scooter.brand}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-[#cc0000]/10 text-[#cc0000] px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-[#cc0000]/20">{scooter.price.toLocaleString()} DH</span>
                    <span className="bg-white/5 text-white/30 px-3 py-1 text-[10px] font-black uppercase tracking-widest border border-white/10">{scooter.range} KM</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/edit/${scooter.id}`}
                      className="flex-1 bg-white/5 text-center py-3 text-[10px] font-black uppercase tracking-widest text-white/50 border border-white/10 hover:border-blue-500/50 hover:text-blue-400 transition-all"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(scooter.id)}
                      className="flex-1 bg-white/5 py-3 text-[10px] font-black uppercase tracking-widest text-white/30 border border-white/10 hover:border-red-500/50 hover:text-red-500 transition-all"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
