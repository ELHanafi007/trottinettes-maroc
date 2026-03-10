'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Scooter, Brand } from '@/types'
import { ArrowLeft, Upload, X, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [brands, setBrands] = useState<Brand[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [formData, setFormData] = useState<Scooter>({
    id: '',
    name: '',
    description: '',
    price: 0,
    maxSpeed: 0,
    range: 0,
    weight: 0,
    motorPower: 0,
    batteryCapacity: 0,
    images: [],
    badge: '',
    brand: '',
  })

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/products?id=${id}`).then(res => res.json()),
      fetch('/api/admin/brands').then(res => res.json()),
    ]).then(([productData, brandsData]) => {
      setFormData(productData)
      setImagePreviews(productData.images)
      setBrands(brandsData)
      setFetching(false)
    })
  }, [id])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const dataForm = new FormData()
      dataForm.append('file', file)

      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: dataForm })
        const data = await res.json()
        if (data.url) {
          setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }))
          setImagePreviews(prev => [...prev, data.url])
        }
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/products')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.03] border border-white/10 px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#cc0000] transition-all duration-300 font-body text-sm"
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3"

  if (fetching) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cc0000]"></div>
    </div>
  )

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <Link href="/admin/products" className="inline-flex items-center gap-2 text-white/30 hover:text-[#cc0000] font-black uppercase tracking-widest text-[10px] transition-colors mb-4">
            <ArrowLeft size={14} /> Retour à la liste
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl text-white">MODIFIER <span className="text-[#cc0000]">PRODUIT</span></h1>
          <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">ID: {id}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 p-8 sm:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className={labelClass}>Nom du Produit</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Marque</label>
            <select
              required
              value={formData.brand}
              onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              {brands.map(brand => (
                <option key={brand.id} value={brand.id} className="bg-[#0a0a0a]">{brand.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Badge (Optionnel)</label>
            <input
              type="text"
              value={formData.badge || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Prix (DH)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Vitesse Max (km/h)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.maxSpeed}
              onChange={(e) => setFormData(prev => ({ ...prev, maxSpeed: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Autonomie (km)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.range}
              onChange={(e) => setFormData(prev => ({ ...prev, range: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Poids (kg)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.weight}
              onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Puissance Moteur (W)</label>
            <input
              type="number"
              required
              min="0"
              value={formData.motorPower}
              onChange={(e) => setFormData(prev => ({ ...prev, motorPower: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Capacité Batterie (Ah)</label>
            <input
              type="number"
              required
              min="0"
              step="0.1"
              value={formData.batteryCapacity}
              onChange={(e) => setFormData(prev => ({ ...prev, batteryCapacity: Number(e.target.value) }))}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Photos du Produit</label>
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full bg-white/[0.02] border-2 border-dashed border-white/10 group-hover:border-[#cc0000]/50 py-12 flex flex-col items-center justify-center transition-all duration-300">
                <Upload size={32} className="text-white/20 group-hover:text-[#cc0000] transition-colors mb-4" />
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Ajouter de nouvelles photos</p>
              </div>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative aspect-square bg-[#111] border border-white/5 group">
                    <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-[#cc0000] text-white w-6 h-6 flex items-center justify-center hover:bg-[#e50000] transition-colors shadow-lg"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-[#cc0000] hover:bg-[#e50000] text-white font-black py-5 uppercase tracking-widest transition-all duration-200 animate-glow text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
               <span className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
                 Mise à jour...
               </span>
            ) : (
              <>
                <Save size={18} />
                Mettre à jour
              </>
            )}
          </button>
          <Link
            href="/admin/products"
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-5 uppercase tracking-widest text-sm text-center border border-white/10 transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
