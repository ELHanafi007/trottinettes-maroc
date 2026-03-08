import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: 'Trottinettes Fes — Scooters Électriques',
  description: 'Les scooters électriques les plus rapides de Fès. Vitesse. Puissance. Style.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#0a0a0a] text-[#f0f0f0]">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <WhatsAppButton />
        <BackToTop />
        <Footer />
      </body>
    </html>
  )
}
