'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { EXAMPLE_HAIRSTYLE_TYPES, EXAMPLE_SERVICES } from '@/lib/data'
import type { Service } from '@/lib/data'

export default function Home() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const cities = useMemo(() => {
    return Array.from(new Set(EXAMPLE_SERVICES.map((s) => s.city))).sort()
  }, [])

  const typeNameMap = useMemo(() => {
    return EXAMPLE_HAIRSTYLE_TYPES.reduce(
      (acc, type) => ({ ...acc, [type.id]: type.name }),
      {} as Record<string, string>
    )
  }, [])

  const filteredServices = useMemo(() => {
    return EXAMPLE_SERVICES.filter((service) => {
      const matchesSearch = search === '' || service.name.toLowerCase().includes(search.toLowerCase()) || service.salon_name.toLowerCase().includes(search.toLowerCase())
      const matchesType = selectedType === '' || service.type_id === selectedType
      const matchesCity = selectedCity === '' || service.city === selectedCity
      const matchesPrice = selectedPrice === '' || service.price_range === selectedPrice
      return matchesSearch && matchesType && matchesCity && matchesPrice
    })
  }, [search, selectedType, selectedCity, selectedPrice])

  const handleSelectService = (service: Service) => {
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const getTypeNameById = (typeId: string) => typeNameMap[typeId] || typeId

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Tresse Afro</h1>
            <p className="text-lg text-muted mb-8 max-w-2xl">Découvrez les plus beaux styles de coiffures afro à Paris et en Île-de-France. Inspirez-vous et trouvez votre prochain look.</p>
          </div>
          <div className="space-y-4 mb-12">
            <SearchBar value={search} onChange={setSearch} placeholder="Chercher un style, un salon..." />
            <FilterPanel hairstyleTypes={EXAMPLE_HAIRSTYLE_TYPES} selectedType={selectedType} selectedCity={selectedCity} selectedPrice={selectedPrice} cities={cities} onTypeChange={setSelectedType} onCityChange={setSelectedCity} onPriceChange={setSelectedPrice} />
          </div>
          <div className="mb-6">
            <p className="text-sm text-muted">{filteredServices.length} résultat{filteredServices.length > 1 ? 's' : ''}</p>
          </div>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} typeName={getTypeNameById(service.type_id)} onClick={() => handleSelectService(service)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted text-lg mb-2">Aucun résultat trouvé</p>
              <p className="text-sm text-muted">Essayez en modifiant vos filtres ou votre recherche.</p>
            </div>
          )}
        </div>
      </main>
      <ServiceModal service={selectedService} typeName={selectedService ? getTypeNameById(selectedService.type_id) : undefined} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedService(null) }} />
      <Footer />
    </div>
  )
}
