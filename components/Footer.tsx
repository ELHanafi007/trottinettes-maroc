import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 font-body" role="contentinfo">

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10">

        {/* Brand */}
        <div className="bg-[#0a0a0a] p-8 md:col-span-2">
          <Link href="/" className="font-display text-4xl mb-4 block hover:text-[#cc0000] transition-colors">
            TROTTINETTES<span className="text-[#cc0000]">.</span>FES
          </Link>
          <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">
            Les trottinettes électriques les plus rapides de Fès. Vitesse. Puissance. Style. Zéro compromis.
          </p>
          <div className="flex gap-3">
            {[
              { name: 'Instagram', href: 'https://instagram.com' },
              { name: 'Facebook', href: 'https://facebook.com' },
              { name: 'TikTok', href: 'https://tiktok.com' },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Suivez-nous sur ${s.name}`}
                className="border border-white/10 hover:border-[#cc0000] text-white/30 hover:text-[#cc0000] text-xs font-black px-3 py-2 uppercase tracking-widest transition-all duration-200"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="bg-[#0a0a0a] p-8">
          <h2 className="text-white/30 font-black uppercase tracking-[0.3em] text-xs mb-6">Navigation</h2>
          <nav aria-label="Footer navigation">
            <ul className="space-y-4">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Produits', href: '/products' },
                { label: 'Marques', href: '/#brands' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/40 hover:text-[#cc0000] font-black uppercase tracking-widest text-xs transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contact */}
        <div className="bg-[#0a0a0a] p-8">
          <h2 className="text-white/30 font-black uppercase tracking-[0.3em] text-xs mb-6">Contact</h2>
          <ul className="space-y-4 text-xs">
            <li className="flex items-start gap-2 text-white/40">
              <span aria-hidden="true">📍</span>
              <span>Fès, Maroc</span>
            </li>
            <li>
              <a
                href="tel:+212600000000"
                className="flex items-start gap-2 text-white/40 hover:text-[#cc0000] transition-colors"
                aria-label="Appelez-nous"
              >
                <span aria-hidden="true">📞</span>
                <span>+212 6XX XXX XXX</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:contact@trottinettes-fes.ma"
                className="flex items-start gap-2 text-white/40 hover:text-[#cc0000] transition-colors"
                aria-label="Envoyez-nous un email"
              >
                <span aria-hidden="true">✉️</span>
                <span>contact@trottinettes-fes.ma</span>
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/40">
              <span aria-hidden="true">🕐</span>
              <span>Lun–Sam : 9h–18h</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-white/20 text-xs uppercase tracking-widest">
            © {year} Trottinettes.FES — Tous droits réservés.
          </span>
          <span className="text-[#cc0000]/50 text-xs uppercase tracking-widest font-black animate-flicker" aria-hidden="true">
            VITESSE. PUISSANCE. STYLE.
          </span>
        </div>
      </div>
    </footer>
  )
}
