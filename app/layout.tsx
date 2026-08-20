import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tresse Afro - Annuaire de coiffures afro à Paris',
  description: 'Découvrez les plus beaux styles de coiffures afro à Paris et en Île-de-France'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
