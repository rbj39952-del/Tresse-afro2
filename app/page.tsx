'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { fetchServices } from '@/lib/supabase'
import { getFavorites, toggleFavorite } from '@/lib/favorites'
import { geocodeCity, haversineDistance } from '@/lib/geo'
import type { Service } from '@/lib/data'

type Coords = { lat: number; lon: number }

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const [userLocation, setUserLocation] = useState<Coords | null>(null)
  const [cityCoords, setCityCoords] = useState<Record<string, Coords | null>>({})
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState('')

  useEffect(() => {
    async function load() {
      const svc = await fetchServices()
      setServices(svc as Service[])
      setLoading(false)
    }
    load()
    setFavorites(getFavorites())

    const params = new URLSearchParams(window.location.search)
    const g = params.get('gender')
    if (g === 'femme' || g === 'homme' || g === 'mixte') setSelectedGender(g)
    if (params.get('view') === 'favoris') setShowFavoritesOnly(true)
  }, [])

  const handleToggleFavorite = (id: string) => {
    setFavorites(toggleFavorite(id))
  }

  const handleNearMe = () => {
    if (sortBy === 'distance') {
      setSortBy('')
      return
    }
    setGeoError('')
    if (!navigator.geolocation) {
      setGeoError("La géolocalisation n'est pas disponible sur cet appareil.")
      return
    }
    setGeoLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude }
        setUserLocation(loc)

        const uniqueCities = Array.from(new Set(services.map((s) => s.city.trim())))
        const missing = uniqueCities.filter((c) => !(c in cityCoords))
        const results = await Promise.all(missing.map((c) => geocodeCity(c)))
        const updates: Record<string, Coords | null> = {}
        missing.forEach((c, i) => {
          updates[c] = results[i]
        })
        setCityCoords((prev) => ({ ...prev, ...updates }))
        setSortBy('distance')
        setGeoLoading(false)
      },
      () => {
        setGeoError("Impossible d'accéder à votre position. Vérifiez les autorisations de localisation.")
        setGeoLoading(false)
      }
    )
  }

  const cities = useMemo(() => {
    const map = new Map<string, string>()
    services.forEach((s) => {
      const key = s.city.trim().toLowerCase()
      if (key && !map.has(key)) map.set(key, s.city.trim())
    })
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b))
  }, [services])

  const types = useMemo(() => {
    const map = new Map<string, string>()
    services.forEach((s) => {
      const key = s.type.trim().toLowerCase()
      if (key && !map.has(key)) map.set(key, s.type.trim())
    })
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b))
  }, [services])

  const totalSalons = useMemo(() => {
    const set = new Set(services.map((s) => s.salon_name.trim().toLowerCase()))
    return set.size
  }, [services])

  const filteredServices = useMemo(() => {
    let result = services.filter((service) => {
      const matchesSearch =
        search === '' ||
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.salon_name.toLowerCase().includes(search.toLowerCase())
      const matchesType =
        selectedType === '' ||
        service.type.trim().toLowerCase() === selectedType.trim().toLowerCase()
      const matchesCity =
        selectedCity === '' ||
        service.city.trim().toLowerCase() === selectedCity.trim().toLowerCase()
      const matchesFavorite = !showFavoritesOnly || favorites.includes(service.id)
      const g = (service.gender || 'mixte').toLowerCase()
      const matchesGender =
        selectedGender === '' ||
        (selectedGender === 'mixte' ? g === 'mixte' : g === selectedGender || g === 'mixte')
      return matchesSearch && matchesType && matchesCity && matchesFavorite && matchesGender
    })

    if (sortBy === 'price_asc') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price_desc') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'distance' && userLocation) {
      result = [...result].sort((a, b) => {
        const ca = cityCoords[a.city.trim()]
        const cb = cityCoords[b.city.trim()]
        if (!ca && !cb) return 0
        if (!ca) return 1
        if (!cb) return -1
        const da = haversineDistance(userLocation.lat, userLocation.lon, ca.lat, ca.lon)
        const db = haversineDistance(userLocation.lat, userLocation.lon, cb.lat, cb.lon)
        return da - db
      })
    }

    return result
  }, [services, search, selectedType, selectedCity, selectedGender, sortBy, showFavoritesOnly, favorites, userLocation, cityCoords])

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase mb-1.5">Le·la</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-3">meilleur·e<br />coiffeur·se afro</h1>
            <p className="text-base max-w-2xl">près de chez vous, dans toute la France.</p>
          </div>

          {!loading && services.length > 0 && (
            <div className="flex border-t border-b border-border py-4 mb-10">
              <div className="flex-1 text-center">
                <div className="text-xl font-extrabold">{services.length}</div>
                <div className="text-xs text-muted mt-0.5">style{services.length > 1 ? 's' : ''}</div>
              </div>
              <div className="flex-1 text-center border-l border-border">
                <div className="text-xl font-extrabold">{totalSalons}</div>
                <div className="text-xs text-muted mt-0.5">salon{totalSalons > 1 ? 's' : ''}</div>
              </div>
              <div className="flex-1 text-center border-l border-border">
                <div className="text-xl font-extrabold">{cities.length}</div>
                <div className="text-xs text-muted mt-0.5">ville{cities.length > 1 ? 's' : ''}</div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-10">
            <SearchBar value={search} onChange={setSearch} placeholder="Chercher un style, un salon..." />
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
              <FilterPanel
                types={types}
                selectedType={selectedType}
                selectedCity={selectedCity}
                cities={cities}
                sortBy={sortBy}
                selectedGender={selectedGender}
                onTypeChange={setSelectedType}
                onCityChange={setSelectedCity}
                onSortChange={setSortBy}
                onGenderChange={setSelectedGender}
              />
              <button
                onClick={handleNearMe}
                className={`px-4 py-2.5 rounded-lg border text-sm font-semibold whitespace-nowrap ${
                  sortBy === 'distance'
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-ink border-border'
                }`}
              >
                {geoLoading ? '📍 Localisation...' : '📍 Près de moi'}
              </button>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`px-4 py-2.5 rounded-lg border text-sm font-semibold whitespace-nowrap ${
                  showFavoritesOnly
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-ink border-border'
                }`}
              >
                ❤ Mes favoris {favorites.length > 0 ? `(${favorites.length})` : ''}
              </button>
            </div>
            {geoError && <p className="text-sm text-red-600">{geoError}</p>}
          </div>

          {loading ? (
            <div className="text-center py-16">
              <p className="text-muted">Chargement...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-muted">
                  {filteredServices.length} resultat{filteredServices.length > 1 ? 's' : ''}
                </p>
              </div>

              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onClick={() => handleSelectService(service)}
                      isFavorite={favorites.includes(service.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted text-lg mb-2">
                    {showFavoritesOnly ? 'Aucun favori pour le moment' : 'Aucun resultat trouve'}
                  </p>
                  <p className="text-sm text-muted">
                    {showFavoritesOnly
                      ? 'Touchez le cœur sur une photo pour l\'ajouter ici.'
                      : 'Essayez en modifiant vos filtres ou votre recherche.'}
                  </p>
                </div>
              )}
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
