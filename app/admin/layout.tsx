import { isAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin-login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-body">
      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent z-50" />
      
      <nav className="bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-auto sm:h-20 py-3 sm:py-0">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 w-full sm:w-auto">
              <Link href="/admin/dashboard" className="group flex items-center gap-2">
                <div className="font-display text-xl sm:text-2xl text-white tracking-tight">
                  JOUET<span className="text-[#cc0000]">.</span>MAROC <span className="text-white/40 group-hover:text-[#cc0000] transition-colors">ADMIN</span>
                </div>
              </Link>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start">
                <Link href="/admin/dashboard" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#cc0000] px-2 py-1 transition-colors">
                  Tableau de Bord
                </Link>
                <Link href="/admin/brands" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#cc0000] px-2 py-1 transition-colors">
                  Marques
                </Link>
                <Link href="/admin/products" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#cc0000] px-2 py-1 transition-colors">
                  Produits
                </Link>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
              <Link href="/" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors" target="_blank">
                Voir le Site →
              </Link>
              <form action="/api/admin/logout" method="POST" className="inline">
                <button type="submit" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#cc0000] hover:text-white hover:bg-[#cc0000] px-4 py-2 border border-[#cc0000]/30 transition-all duration-300">
                  Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
    </div>
  )
}
