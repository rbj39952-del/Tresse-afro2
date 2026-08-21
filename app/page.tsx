'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { fetchServices, fetchHairstyleTypes } from '@/lib/supabase'
import type { Service, HairstyleType } from '@/lib/data'

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [hairstyleTypes, setHairstyleTypes] = useState<HairstyleType[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function load() {
      const [svc, types] = await Promise.all([fetchServices(), fetchHairstyleTypes()])
      setServices(svc as Service[])
      setHairstyleTypes(types as HairstyleType[])
      setLoading(false)
    }
    load()
  }, [])

  const cities = useMemo(() => {
    return Array.from(new Set(services.map((s) => s.city))).sort()
  }, [services])

  const typeNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const type of hairstyleTypes) {
      map[type.id] = type.name
    }
    return map
  }, [hairstyleTypes])

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        search === '' ||
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.salon_name.toLowerCase().includes(search.toLowerCase())
      const matchesType = selectedType === '' || service.type_id === selectedType
      const matchesCity = selectedCity === '' || service.city === selectedCity
      return matchesSearch && matchesType && matchesCity
    })
  }, [services, search, selectedType, selectedCity])

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
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Tresse Afro</h1>
            <p className="text-lg text-muted mb-8 max-w-2xl">
              Trouvez votre prochaine coiffure afro a Paris et en Ile-de-France. Contactez directement le salon ou la coiffeuse.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            <SearchBar value={search} onChange={setSearch} placeholder="Chercher un style, un salon..." />
            <FilterPanel
              hairstyleTypes={hairstyleTypes}
              selectedType={selectedType}
              selectedCity={selectedCity}
              cities={cities}
              onTypeChange={setSelectedType}
              onCityChange={setSelectedCity}
            />
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
                      typeName={getTypeNameById(service.type_id)}
                      onClick={() => handleSelectService(service)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted text-lg mb-2">Aucun resultat trouve</p>
                  <p className="text-sm text-muted">Essayez en modifiant vos filtres ou votre recherche.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <ServiceModal
        service={selectedService}
        typeName={selectedService ? getTypeNameById(selectedService.type_id) : undefined}
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
