'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nom requis'
    if (!form.email.trim()) e.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide'
    if (form.phone && !/^(\+212|0)[0-9]{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Numéro invalide (ex: +212 6XX XXX XXX)'
    if (!form.message.trim()) e.message = 'Message requis'
    else if (form.message.length < 10) e.message = 'Message trop court (min. 10 caractères)'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  const Field = ({ id, label, error, required = true, children }: {
    id: string; label: string; error?: string; required?: boolean; children: React.ReactNode
  }) => (
    <div>
      <label htmlFor={id} className="block text-xs font-black uppercase tracking-widest text-white/40 mb-2">
        {label}{required && <span className="text-[#cc0000] ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[#cc0000] text-xs mt-1 font-medium"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )

  const inputClass = (field: string) =>
    `w-full bg-white/5 border ${errors[field] ? 'border-[#cc0000]' : 'border-white/10'} px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#cc0000] transition text-sm`

  return (
    <div className="bg-[#0a0a0a] text-[#f0f0f0] min-h-screen font-body">
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-[#cc0000] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2 mb-4">
            <span className="w-6 h-[2px] bg-[#cc0000]" /> On Est Là
          </span>
          <h1 className="font-display text-6xl md:text-8xl leading-none">
            PARLONS<br /><span className="text-[#cc0000]">VITESSE</span>
          </h1>
          <p className="text-white/30 text-sm mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Nous répondons généralement en moins d&apos;1 heure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">

          {/* Form */}
          <motion.div className="bg-[#0a0a0a] p-10" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 size={64} className="text-[#cc0000] mb-6 mx-auto" />
                  </motion.div>
                  <h2 className="font-display text-3xl mb-3">MESSAGE ENVOYÉ !</h2>
                  <p className="text-white/40 text-sm mb-8">Nous vous contacterons dans les plus brefs délais.</p>
                  <button
                    onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                    className="border border-white/10 hover:border-[#cc0000] text-white/50 hover:text-white font-black text-xs px-8 py-3 uppercase tracking-widest transition-all"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <h2 className="font-display text-2xl mb-8 text-white/70">ENVOYEZ UN MESSAGE</h2>

                  <Field id="name" label="Nom complet" error={errors.name}>
                    <input
                      id="name"
                      type="text"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className={inputClass('name')}
                      autoComplete="name"
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className={inputClass('email')}
                      autoComplete="email"
                    />
                  </Field>

                  <Field id="phone" label="Téléphone" error={errors.phone} required={false}>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+212 6XX XXX XXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className={inputClass('phone')}
                      autoComplete="tel"
                    />
                  </Field>

                  <Field id="message" label="Message" error={errors.message}>
                    <div className="relative">
                      <textarea
                        id="message"
                        rows={5}
                        placeholder="Quel modèle vous intéresse ?"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass('message')} resize-none`}
                        maxLength={500}
                      />
                      <span className="absolute bottom-3 right-4 text-white/20 text-xs">
                        {form.message.length}/500
                      </span>
                    </div>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#cc0000] hover:bg-[#e50000] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-5 uppercase tracking-widest transition-all duration-200 animate-glow text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 size={16} className="animate-spin" /> Envoi en cours...</>
                    ) : 'Envoyer →'}
                  </button>

                  <p className="text-white/20 text-xs text-center">
                    Les champs marqués <span className="text-[#cc0000]">*</span> sont obligatoires
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div className="bg-[#0a0a0a] p-10 flex flex-col justify-between" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div>
              <h2 className="font-display text-2xl mb-10 text-white/70">INFOS DE CONTACT</h2>
              <div className="space-y-8">
                {[
                  { icon: '📍', label: 'Adresse', value: 'Fès, Maroc', href: null },
                  { icon: '📞', label: 'Téléphone', value: '+212 6XX XXX XXX', href: 'tel:+212600000000' },
                  { icon: '✉️', label: 'Email', value: 'contact@trottinettes-fes.ma', href: 'mailto:contact@trottinettes-fes.ma' },
                  { icon: '🕐', label: 'Horaires', value: 'Lun–Sam : 9h–18h', href: null },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-5 group">
                    <div className="text-2xl" aria-hidden="true">{item.icon}</div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="font-black text-sm hover:text-[#cc0000] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="font-black text-sm">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 mt-12 space-y-4">
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/212600000000?text=Bonjour%2C%20je%20voudrais%20des%20informations%20sur%20vos%20trottinettes!"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-[#25D366]/30 hover:border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 text-[#25D366] font-black text-xs px-6 py-4 uppercase tracking-widest transition-all duration-200 w-full justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.524 5.847L.057 23.882a.5.5 0 0 0 .606.633l6.168-1.615A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.497-5.189-1.367l-.372-.214-3.862 1.012 1.03-3.752-.235-.389A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Commander via WhatsApp
              </a>

              {/* Promo */}
              <div className="bg-[#cc0000]/10 border border-[#cc0000]/30 p-6">
                <div className="font-display text-2xl text-[#cc0000] mb-2">LIVRAISON GRATUITE</div>
                <p className="text-white/40 text-sm">Pour toute commande passée cette semaine. Partout au Maroc.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
