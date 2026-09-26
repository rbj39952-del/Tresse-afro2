'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronLeft, MapPin, Phone } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { fetchServices } from '@/lib/supabase'
import { getFavorites, toggleFavorite } from '@/lib/favorites'
import { slugify } from '@/lib/slug'
import type { Service } from '@/lib/data'

function getContactHref(contact: string) {
  const trimmed = contact.trim()
  if (/^[0-9+\s().-]+$/.test(trimmed)) {
    return 'tel:' + trimmed.replace(/[\s().-]/g, '')
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return 'https://' + trimmed
}

export default function SalonPage({ params }: { params: { slug: string } }) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const all = await fetchServices()
      setServices(all as Service[])
      setLoading(false)
    }
    load()
    setFavorites(getFavorites())
  }, [])

  const handleToggleFavorite = (id: string) => {
    setFavorites(toggleFavorite(id))
  }

  const salonServices = useMemo(() => {
    return services.filter((s) => slugify(s.salon_name) === params.slug)
  }, [services, params.slug])

  const salon = salonServices[0]

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted mb-6">
            <ChevronLeft className="w-4 h-4" />
            Retour à l'annuaire
          </Link>

          {loading ? (
            <p className="text-muted">Chargement...</p>
          ) : !salon ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold mb-2">Salon introuvable</p>
              <p className="text-sm text-muted">Ce salon n'existe pas ou plus.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  {salon.salon_name}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-muted mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{salon.city}</span>
                </div>
                <p className="text-sm text-muted mb-4">
                  {salonServices.length} style{salonServices.length > 1 ? 's' : ''} proposé
                  {salonServices.length > 1 ? 's' : ''}
                </p>
                <a
                  href={getContactHref(salon.contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contacter</span>
                </a>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {salonServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={() => handleSelectService(service)}
                    isFavorite={favorites.includes(service.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedService(null)
        }}
      />

      <Footer />
    </div>
  )
}
