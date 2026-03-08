'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { value: 65, unit: 'km/h', label: 'Vitesse Max' },
  { value: 100, unit: 'km', label: 'Autonomie Max' },
  { value: 6, unit: '+', label: 'Modèles Dispo' },
  { value: 1, unit: ' AN', label: 'Garantie' },
]

export default function StatsBar() {
  return (
    <section className="border-b border-white/10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="py-10 px-8 text-center hover:bg-white/5 transition-colors group cursor-default"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div className="font-display text-5xl text-[#cc0000] group-hover:scale-110 transition-transform duration-300 inline-block">
              <AnimatedNumber value={stat.value} suffix={stat.unit} />
            </div>
            <div className="text-white/40 text-xs uppercase tracking-widest mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
