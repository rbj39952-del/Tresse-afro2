import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tresse Afro - Annuaire de coiffures afro a Paris',
  description: 'Decouvrez les plus beaux styles de coiffures afro a Paris et en Ile-de-France',
  appleWebApp: {
    capable: true,
    title: 'Tresse Afro',
    statusBarStyle: 'default',
  },
  icons: {
    apple: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=180&h=180&fit=crop&q=80',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090B',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-white text-ink antialiased`}>
        {children}
      </body>
    </html>
  )
}
