'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import { Brand } from '@/types'
import { ArrowLeft, Upload, Save } from 'lucide-react'
import Link from 'next/link'

export default function EditBrandPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [logoPreview, setLogoPreview] = useState('')
  const [formData, setFormData] = useState<Omit<Brand, 'products'>>({
    id: '',
    name: '',
    logo: '',
    tagline: '',
    description: '',
    founded: '',
    origin: '',
  })

  useEffect(() => {
    fetch(`/api/admin/brands?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data)
        setLogoPreview(data.logo)
        setFetching(false)
      })
  }, [id])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const dataForm = new FormData()
    dataForm.append('file', file)

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: dataForm })
      const data = await res.json()
      if (data.url) {
        setFormData(prev => ({ ...prev, logo: data.url }))
        setLogoPreview(data.url)
      }
    } catch (err) {
      console.error('Upload failed:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push('/admin/brands')
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
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <Link href="/admin/brands" className="inline-flex items-center gap-2 text-white/30 hover:text-[#cc0000] font-black uppercase tracking-widest text-[10px] transition-colors mb-4">
            <ArrowLeft size={14} /> Retour à la liste
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl text-white">MODIFIER <span className="text-[#cc0000]">MARQUE</span></h1>
          <p className="text-white/20 text-xs mt-2 uppercase tracking-widest">ID: {id}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/5 p-8 sm:p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>ID de la Marque (URL slug)</label>
            <input
              type="text"
              required
              readOnly
              value={formData.id}
              className={`${inputClass} opacity-50 cursor-not-allowed`}
            />
          </div>

          <div>
            <label className={labelClass}>Nom de la Marque</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Logo</label>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative flex-1 w-full group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full bg-white/[0.02] border-2 border-dashed border-white/10 group-hover:border-[#cc0000]/50 py-10 flex flex-col items-center justify-center transition-all duration-300">
                  <Upload size={24} className="text-white/20 group-hover:text-[#cc0000] transition-colors mb-3" />
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">Mettre à jour le logo</p>
                </div>
              </div>
              {logoPreview && (
                <div className="w-32 h-32 bg-white flex items-center justify-center p-4 border border-white/10 flex-shrink-0">
                  <Image src={logoPreview} alt="Logo preview" width={128} height={128} className="max-w-full max-h-full object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Slogan (Tagline)</label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
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
            <label className={labelClass}>Année de Fondation</label>
            <input
              type="text"
              value={formData.founded}
              onChange={(e) => setFormData(prev => ({ ...prev, founded: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Origine</label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
              className={inputClass}
            />
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
                 Sauvegarde...
               </span>
            ) : (
              <>
                <Save size={18} />
                Enregistrer Marque
              </>
            )}
          </button>
          <Link
            href="/admin/brands"
            className="flex-1 bg-white/5 hover:bg-white/10 text-white font-black py-5 uppercase tracking-widest text-sm text-center border border-white/10 transition-colors"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
