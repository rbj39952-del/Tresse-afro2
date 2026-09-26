'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Header() {
  const [open, setOpen] = useState(false)

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

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block w-5 h-[2px] bg-black transition-transform ${
                open ? 'translate-y-[7px] rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-black transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-black transition-transform ${
                open ? '-translate-y-[7px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 border-b border-border ${
          open ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block py-3 text-base font-semibold border-b border-border"
          >
            Accueil
          </Link>
          <Link
            href="/proposer"
            onClick={() => setOpen(false)}
            className="block mt-3 text-center py-3 rounded-full bg-black text-white font-bold"
          >
            Ajouter ma coiffure
          </Link>
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="block pt-4 text-sm text-gray-500"
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  )
}
