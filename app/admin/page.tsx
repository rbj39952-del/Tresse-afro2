'use client'

import { useState, useMemo } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { EXAMPLE_HAIRSTYLE_TYPES, EXAMPLE_SERVICES } from '@/lib/data'
import { Trash2, Edit2, Plus } from 'lucide-react'
import type { Service, HairstyleType } from '@/lib/data'

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [services, setServices] = useState<Service[]>(EXAMPLE_SERVICES)
  const [hairstyleTypes, setHairstyleTypes] = useState<HairstyleType[]>(EXAMPLE_HAIRSTYLE_TYPES)
  const [showAddService, setShowAddService] = useState(false)
  const [showAddType, setShowAddType] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [newType, setNewType] = useState('')

  const [formData, setFormData] = useState<{
    name: string
    type_id: string
    city: string
    price_range: 'budget' | 'medium' | 'premium'
    price_min: number
    price_max: number
    duration_minutes: number
    salon_name: string
    salon_phone: string
    instagram_url: string
    whatsapp_url: string
    image_url: string
    description: string
  }>({
    name: '', type_id: '', city: '', price_range: 'medium',
    price_min: 0, price_max: 0, duration_minutes: 0, salon_name: '',
    salon_phone: '', instagram_url: '', whatsapp_url: '', image_url: '', description: '',
  })

  const ADMIN_PASSWORD = 'tresse2024'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setAdminPassword('')
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const resetForm = () => setFormData({ name: '', type_id: '', city: '', price_range: 'medium', price_min: 0, price_max: 0, duration_minutes: 0, salon_name: '', salon_phone: '', instagram_url: '', whatsapp_url: '', image_url: '', description: '' })

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.type_id || !formData.city) {
      alert('Veuillez remplir les champs obligatoires')
      return
    }
    if (editingService) {
      setServices(services.map((s) => s.id === editingService.id ? { ...formData, id: editingService.id, created_at: editingService.created_at, updated_at: new Date().toISOString() } : s))
      setEditingService(null)
    } else {
      const newService: Service = { id: Math.random().toString(36).substr(2, 9), ...formData, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
      setServices([...services, newService])
    }
    resetForm()
    setShowAddService(false)
  }

  const handleDeleteService = (id: string) => {
    if (confirm('Supprimer ce service ?')) setServices(services.filter((s) => s.id !== id))
  }

  const handleEditService = (service: Service) => {
    setFormData({ name: service.name, type_id: service.type_id, city: service.city, price_range: service.price_range, price_min: service.price_min, price_max: service.price_max, duration_minutes: service.duration_minutes, salon_name: service.salon_name, salon_phone: service.salon_phone || '', instagram_url: service.instagram_url || '', whatsapp_url: service.whatsapp_url || '', image_url: service.image_url, description: service.description || '' })
    setEditingService(service)
    setShowAddService(true)
  }

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newType.trim()) return
    setHairstyleTypes([...hairstyleTypes, { id: newType.toLowerCase().replace(/\s+/g, '-'), name: newType }])
    setNewType('')
    setShowAddType(false)
  }

  const typeNameMap = useMemo(() => hairstyleTypes.reduce((acc, type) => ({ ...acc, [type.id]: type.name }), {} as Record<string, string>), [hairstyleTypes])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="border border-border rounded-2xl p-8">
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-muted mb-8">Connectez-vous pour gérer le contenu</p>
              
