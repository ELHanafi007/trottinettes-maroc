import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'TROPANDAA — Scooters Électriques Premium',
  description: 'Les scooters électriques les plus performants du Maroc. Vitesse. Puissance. Style.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#f0f0f0] transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <WhatsAppButton />
          <BackToTop />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
