'use client'

import { useState } from 'react'
import Link from 'next/link'

const CONTACT_EMAIL = 'tresseafromanagement@gmail.com'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0 -rotate-3">
              <span className="text-white text-xs font-bold tracking-tight rotate-3">TA</span>
            </div>
            <span className="font-bold text-lg">Tresse Afro</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] relative z-[60]"
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

      {open && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16" />

            <div className="pt-6 pb-2">
              <p className="text-xs text-muted mb-3">Parcourir par catégorie</p>
              <div className="flex flex-col">
                <Link
                  href="/?gender=femme"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 border-b border-border"
                >
                  <span className="italic font-serif text-3xl">Femme</span>
                </Link>
                <Link
                  href="/?gender=homme"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 border-b border-border"
                >
                  <span className="italic font-serif text-3xl">Homme</span>
                </Link>
                <Link
                  href="/?gender=mixte"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 border-b border-border"
                >
                  <span className="italic font-serif text-3xl">Mixte</span>
                </Link>
              </div>
            </div>

            <div className="pt-6 pb-10">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium border-b border-border"
              >
                Accueil
              </Link>
              <Link
                href="/?view=favoris"
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium border-b border-border"
              >
                Mes favoris
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium border-b border-border"
              >
                Nous contacter
              </a>
              <Link
                href="/proposer"
                onClick={() => setOpen(false)}
                className="block mt-4 text-center py-3 rounded-full bg-black text-white font-bold"
              >
                Ajouter ma coiffure
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block pt-5 text-sm text-gray-500"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
