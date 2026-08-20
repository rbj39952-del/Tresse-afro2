'use client'

export function Footer() {
  return (
    <footer className="border-t border-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Tresse Afro</h4>
            <p className="text-sm text-muted">L'annuaire des plus beaux styles de coiffures afro.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="/" className="hover:text-ink transition-colors">Accueil</a></li>
              <li><a href="/admin" className="hover:text-ink transition-colors">Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Suivez-nous</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><a href="#" className="hover:text-ink transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted">
          <p>&copy; 2024 Tresse Afro. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
