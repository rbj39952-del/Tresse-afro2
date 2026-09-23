'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center flex-shrink-0">
              <span className="text-[11px] font-extrabold tracking-tight">TA</span>
            </div>
            <span className="font-bold text-lg">Tresse Afro</span>
          </Link>
          <nav className="flex items-center gap-4 sm:gap-5">
            <Link href="/" className="text-sm font-medium text-black hidden sm:inline">
              Accueil
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              Admin
            </Link>
            <Link
              href="/proposer"
              className="text-sm font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Ajouter ma coiffure
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
