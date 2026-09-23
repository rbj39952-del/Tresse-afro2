'use client'

import { useState, useEffect, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceModal } from '@/components/ServiceModal'
import { fetchServices } from '@/lib/supabase'
import type { Service } from '@/lib/data'

export default function Home() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function load() {
      const svc = await fetchServices()
      setServices(svc as Service[])
      setLoading(false)
    }
    load()
  }, [])

  const cities = useMemo(() => {
    const map = new Map<string, string>()
    services.forEach((s) => {
      const key = s.city.trim().toLowerCase()
      if (key && !map.has(key)) map.set(key, s.city.trim())
    })
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b))
  }, [services])

  const types = useMemo(() => {
    const map = new Map
