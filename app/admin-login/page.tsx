'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Mot de passe incorrect')
      }
    } catch {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Red glow line at top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent z-50" />
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cc0000]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Card */}
        <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-block mb-6">
              <span className="font-display text-3xl text-white tracking-tight">
                TROPANDAA
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-[#cc0000]" />
              <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-xs">Admin Panel</span>
              <span className="w-8 h-[2px] bg-[#cc0000]" />
            </div>
            <h1 className="font-display text-2xl text-white/80 mt-4">Accès Réservé</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-xs font-black uppercase tracking-widest text-white/40 mb-3">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-white/[0.02] border border-white/10 rounded-lg focus:outline-none focus:border-[#cc0000] focus:ring-1 focus:ring-[#cc0000] text-white placeholder-white/20 transition-all duration-300 font-body"
                  placeholder="••••••••"
                  required
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#cc0000] text-sm bg-[#cc0000]/10 border border-[#cc0000]/20 rounded-lg px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#cc0000] hover:bg-[#e50000] text-white font-black py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase tracking-widest text-xs hover:shadow-lg hover:shadow-[#cc0000]/25 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5">
            <p className="text-white/30 text-xs text-center">
              Accès sécurisé réservé au personnel autorisé
            </p>
          </div>
        </div>

        {/* Footer links */}
        <div className="text-center mt-8">
          <a href="/" className="text-white/30 hover:text-white text-xs transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour au site
          </a>
        </div>
      </div>
    </div>
  )
}
