'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop&q=80"
                alt="Tresse Afro"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Tresse Afro</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/" className="text-sm hover:text-muted transition-colors">Accueil</Link>
            <Link href="/admin" className="text-sm px-3 py-2 rounded-lg bg-surface hover:bg-gray-200 transition-colors">Admin</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
