'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Zap, Phone, ShoppingBag, Tag, ChevronRight, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { title: 'Accueil', href: '/', icon: Home },
  { title: 'Produits', href: '/products', icon: Zap },
  { title: 'Marques', href: '/#brands', icon: Tag },
  { title: 'Pourquoi Nous', href: '/#why-us', icon: Zap },
  { title: 'Contact', href: '/contact', icon: Phone },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'
  const navbarRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const transparent = isHome && !scrolled

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#') && isHome) {
      e.preventDefault()
      const sectionId = href.replace('/#', '')
      const section = document.getElementById(sectionId)
      if (section) {
        const navHeight = 80
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - navHeight
        window.scrollTo({ top: sectionTop, behavior: 'smooth' })
        setMenuOpen(false)
      }
    }
  }

  return (
    <>
      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#cc0000] to-transparent z-[60]" />

      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#cc0000] blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative font-display text-xl sm:text-3xl text-black dark:text-white tracking-tight">
                  JOUET<span className="text-[#cc0000]">.</span>MAROC
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, i) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="group relative px-4 py-2.5 overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Hover background */}
                  <div
                    className={`absolute inset-0 bg-[#cc0000]/5 dark:bg-[#cc0000]/5 transition-transform duration-500 ${
                      hoveredIndex === i ? 'scale-100' : 'scale-0'
                    }`}
                    style={{ borderRadius: '4px' }}
                  />

                  {/* Active indicator */}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cc0000]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="relative flex items-center gap-2">
                    <item.icon
                      size={14}
                      className={`transition-colors duration-300 ${
                        pathname === item.href
                          ? 'text-[#cc0000]'
                          : 'text-black/40 dark:text-white/40 group-hover:text-[#cc0000]'
                      }`}
                    />
                    <span className={`font-black text-xs uppercase tracking-widest transition-colors duration-300 ${
                      pathname === item.href
                        ? 'text-[#cc0000]'
                        : 'text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))}

              <div className="ml-4 flex items-center gap-4">
                <ThemeToggle />
                
                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="group relative flex items-center gap-2 bg-[#cc0000]/10 hover:bg-[#cc0000] border border-[#cc0000]/30 hover:border-[#cc0000] text-[#cc0000] hover:text-white font-black text-xs px-6 py-3 uppercase tracking-widest transition-all duration-300"
                >
                  <ShoppingBag size={14} />
                  <span>Commander</span>
                  <ChevronRight
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile/Tablet Hamburger */}
            <div className="flex lg:hidden items-center gap-4">
              <ThemeToggle />
              <button
                className="relative w-10 h-10 flex items-center justify-center text-black dark:text-white focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? 'rotate-45 top-2' : 'top-0'
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? 'opacity-0' : 'opacity-100'
                    } top-2`}
                  />
                  <span
                    className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                      menuOpen ? '-rotate-45 top-2' : 'top-4'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-40 lg:hidden"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white dark:bg-[#0a0a0a] border-l border-black/10 dark:border-white/10 z-50 lg:hidden"
              >
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10">
                  <span className="font-display text-xl text-black dark:text-white">
                    JOUET<span className="text-[#cc0000]">.</span>MAROC
                  </span>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Mobile Links */}
                <div className="p-6 space-y-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`group flex items-center gap-4 px-4 py-4 rounded-lg transition-all duration-300 ${
                          pathname === item.href && !item.href.startsWith('/#')
                            ? 'bg-[#cc0000]/10 border border-[#cc0000]/30'
                            : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={`transition-colors ${
                            pathname === item.href && !item.href.startsWith('/#')
                              ? 'text-[#cc0000]'
                              : 'text-black/40 dark:text-white/40 group-hover:text-[#cc0000]'
                          }`}
                        />
                        <span className={`font-black text-sm uppercase tracking-widest transition-colors ${
                          pathname === item.href && !item.href.startsWith('/#')
                            ? 'text-[#cc0000]'
                            : 'text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white'
                        }`}>
                          {item.title}
                        </span>
                        <ChevronRight size={14} className="ml-auto text-black/20 dark:text-white/20 group-hover:text-[#cc0000] transition-colors" />
                      </Link>
                    </motion.div>
                  ))}

                  {/* Mobile CTA */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                    className="pt-4"
                  >
                    <Link
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-center gap-2 bg-[#cc0000] hover:bg-[#e50000] text-white font-black text-xs px-6 py-4 uppercase tracking-widest transition-all duration-300"
                    >
                      <ShoppingBag size={14} />
                      <span>Commander Maintenant</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                  <p className="text-white/20 text-xs uppercase tracking-widest text-center">
                    Vitesse. Puissance. Style.
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
