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
    name: '',
    type_id: '',
    city: '',
    price_range: 'medium',
    price_min: 0,
    price_max: 0,
    duration_minutes: 0,
    salon_name: '',
    salon_phone: '',
    instagram_url: '',
    whatsapp_url: '',
    image_url: '',
    description: '',
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

  const resetForm = () => {
    setFormData({
      name: '',
      type_id: '',
      city: '',
      price_range: 'medium',
      price_min: 0,
      price_max: 0,
      duration_minutes: 0,
      salon_name: '',
      salon_phone: '',
      instagram_url: '',
      whatsapp_url: '',
      image_url: '',
      description: '',
    })
  }

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.type_id || !formData.city) {
      alert('Veuillez remplir les champs obligatoires')
      return
    }
    if (editingService) {
      setServices(
        services.map((s) =>
          s.id === editingService.id
            ? {
                ...formData,
                id: editingService.id,
                created_at: editingService.created_at,
                updated_at: new Date().toISOString(),
              }
            : s
        )
      )
      setEditingService(null)
    } else {
      const newService: Service = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      setServices([...services, newService])
    }
    resetForm()
    setShowAddService(false)
  }

  const handleDeleteService = (id: string) => {
    if (confirm('Supprimer ce service ?')) {
      setServices(services.filter((s) => s.id !== id))
    }
  }

  const handleEditService = (service: Service) => {
    setFormData({
      name: service.name,
      type_id: service.type_id,
      city: service.city,
      price_range: service.price_range,
      price_min: service.price_min,
      price_max: service.price_max,
      duration_minutes: service.duration_minutes,
      salon_name: service.salon_name,
      salon_phone: service.salon_phone || '',
      instagram_url: service.instagram_url || '',
      whatsapp_url: service.whatsapp_url || '',
      image_url: service.image_url,
      description: service.description || '',
    })
    setEditingService(service)
    setShowAddService(true)
  }

  const handleAddType = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newType.trim()) return
    setHairstyleTypes([
      ...hairstyleTypes,
      { id: newType.toLowerCase().replace(/\s+/g, '-'), name: newType },
    ])
    setNewType('')
    setShowAddType(false)
  }

  const typeNameMap = useMemo(() => {
    const map: Record<string, string> = {}
    for (const type of hairstyleTypes) {
      map[type.id] = type.name
    }
    return map
  }, [hairstyleTypes])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="border border-border rounded-2xl p-8">
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-muted mb-8">Connectez-vous pour gerer le contenu</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="input w-full"
                  placeholder="Mot de passe admin"
                />
                <button type="submit" className="btn btn-primary w-full">
                  Se connecter
                </button>
              </form>
              <p className="text-xs text-muted mt-4 text-center">Mot de passe: tresse2024</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-muted hover:text-ink transition-colors"
            >
              Se deconnecter
            </button>
          </div>

          <div className="flex gap-4 mb-8 border-b border-border">
            <button className="px-4 py-2 border-b-2 border-ink font-medium">Services</button>
            <button
              onClick={() => setShowAddType(!showAddType)}
              className="px-4 py-2 text-muted hover:text-ink transition-colors"
            >
              Types de coiffure
            </button>
          </div>

          {showAddType && (
            <div className="mb-12 p-6 border border-border rounded-lg bg-surface">
              <h2 className="text-xl font-bold mb-4">Types de coiffure</h2>
              <form onSubmit={handleAddType} className="mb-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="Ajouter un nouveau type..."
                    className="input flex-1"
                  />
                  <button type="submit" className="btn btn-primary">
                    Ajouter
                  </button>
                </div>
              </form>
              <div className="space-y-2">
                {hairstyleTypes.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center justify-between p-3 bg-white border border-border rounded-lg"
                  >
                    <span>{type.name}</span>
                    <span className="text-xs text-muted">{type.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Services</h2>
              <button
                onClick={() => {
                  setShowAddService(!showAddService)
                  setEditingService(null)
                  resetForm()
                }}
                className="btn btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter un service
              </button>
            </div>

            {showAddService && (
              <form onSubmit={handleAddService} className="mb-12 p-6 border border-border rounded-lg bg-surface">
                <h3 className="text-lg font-bold mb-6">
                  {editingService ? 'Modifier le service' : 'Ajouter un service'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Nom du style *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    required
                  />

                  <select
                    value={formData.type_id}
                    onChange={(e) => setFormData({ ...formData, type_id: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="">Selectionner un type *</option>
                    {hairstyleTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Ville *"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="input"
                    required
                  />

                  <select
                    value={formData.price_range}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price_range: e.target.value as 'budget' | 'medium' | 'premium',
                      })
                    }
                    className="input"
                  >
                    <option value="budget">Budget (une baguette)</option>
                    <option value="medium">Moyen (deux baguettes)</option>
                    <option value="premium">Premium (trois baguettes)</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Prix min (euros)"
                    value={formData.price_min}
                    onChange={(e) =>
                      setFormData({ ...formData, price_min: parseInt(e.target.value) || 0 })
                    }
                    className="input"
                  />

                  <input
                    type="number"
                    placeholder="Prix max (euros)"
                    value={formData.price_max}
                    onChange={(e) =>
                      setFormData({ ...formData, price_max: parseInt(e.target.value) || 0 })
                    }
                    className="input"
                  />

                  <input
                    type="number"
                    placeholder="Duree (minutes)"
                    value={formData.duration_minutes}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_minutes: parseInt(e.target.value) || 0,
                      })
                    }
                    className="input"
                  />

                  <input
                    type="text"
                    placeholder="Nom du salon *"
                    value={formData.salon_name}
                    onChange={(e) => setFormData({ ...formData, salon_name: e.target.value })}
                    className="input"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Telephone salon"
                    value={formData.salon_phone}
                    onChange={(e) => setFormData({ ...formData, salon_phone: e.target.value })}
                    className="input"
                  />

                  <input
                    type="url"
                    placeholder="URL Instagram"
                    value={formData.instagram_url}
                    onChange={(e) =>
                      setFormData({ ...formData, instagram_url: e.target.value })
                    }
                    className="input"
                  />

                  <input
                    type="url"
                    placeholder="URL WhatsApp"
                    value={formData.whatsapp_url}
                    onChange={(e) => setFormData({ ...formData, whatsapp_url: e.target.value })}
                    className="input"
                  />

                  <input
                    type="url"
                    placeholder="URL Image *"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="input"
                    required
                  />
                </div>

                <textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input w-full h-24 mb-4"
                />

                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary">
                    {editingService ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddService(false)
                      setEditingService(null)
                    }}
                    className="btn btn-secondary"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-sm text-muted">
                      {typeNameMap[service.type_id]} - {service.city} - {service.price_min}e-{service.price_max}e
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
