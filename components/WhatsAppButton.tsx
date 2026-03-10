'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Show tooltip after 3s then hide
    const t1 = setTimeout(() => setShowTooltip(true), 3000)
    const t2 = setTimeout(() => setShowTooltip(false), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white text-[#0a0a0a] text-xs font-black uppercase tracking-wide px-4 py-2 shadow-xl whitespace-nowrap"
        >
          💬 Réponse en moins d&apos;1h !
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45" />
        </motion.div>
      )}

      <motion.a
        href="https://wa.me/212600000000?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20machines%20%C3%A9lectriques!"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Commander via WhatsApp — Réponse en moins d'1h"
        className="relative flex items-center gap-3 bg-[#25D366] text-white font-black text-xs uppercase tracking-widest px-5 py-4 shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.7)] transition-all duration-300"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.524 5.847L.057 23.882a.5.5 0 0 0 .606.633l6.168-1.615A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.497-5.189-1.367l-.372-.214-3.862 1.012 1.03-3.752-.235-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
        <span className="hidden sm:block">WhatsApp</span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#25D366] rounded-full animate-ping opacity-75" aria-hidden="true" />
      </motion.a>
    </div>
  )
}
