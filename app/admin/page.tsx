'use client'

import { useState, useEffect, useRef } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { fetchServices, fetchSettings, uploadMedia } from '@/lib/supabase'
import { isVideoUrl } from '@/lib/data'
import { Trash2, Edit2, Plus } from 'lucide-react'
import type { Service } from '@/lib/data'

export default function AdminPage() {
  const [adminPassword, setAdminPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddService, setShowAddService] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    price: 0,
    salon_name: '',
    contact: '',
    image_url: '',
    description: '',
  })

  const [currentLogoUrl, setCurrentLogoUrl] = useState('')
  const [newLogoUrl, setNewLogoUrl] = useState('')
  const [logoUploading, setLogoUploading] = useState(false)
  const [savingLogo, setSavingLogo] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const loadData = async () => {
    setLoading(true)
    const svc = await fetchServices()
    setServices(svc as Service[])
    const settings = await fetchSettings()
    if (settings?.logo_url) {
      setCurrentLogoUrl(settings.logo_url)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword }),
    })
    if (res.ok) {
      setIsAuthenticated(true)
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      city: '',
      price: 0,
      salon_name: '',
      contact: '',
      image_url: '',
      description: '',
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const url = await uploadMedia(file)
    setUploading(false)
    if (url) {
      setFormData((prev) => ({ ...prev, image_url: url }))
    } else {
      alert('Erreur lors du telechargement')
    }
  }

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.type.trim() || !formData.city.trim() || !formData.image_url) {
      alert('Veuillez remplir les champs obligatoires (dont la photo ou video)')
      return
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      type: formData.type.trim(),
      city: formData.city.trim(),
      salon_name: formData.salon_name.trim(),
      contact: formData.contact.trim(),
    }

    const res = await fetch('/api/admin/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password: adminPassword,
        id: editingService?.id,
        ...payload,
      }),
    })
    const result = await res.json()

    if (!res.ok) {
      alert(result.error || 'Erreur lors de l enregistrement')
      return
    }

    await loadData()
    resetForm()
    setEditingService(null)
    setShowAddService(false)
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm('Supprimer ce service ?')) return
    const res = await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword, id }),
    })
    if (!res.ok) {
      const result = await res.json()
      alert(result.error || 'Erreur lors de la suppression')
      return
    }
    await loadData()
  }

  const handleEditService = (service: Service) => {
    setFormData({
      name: service.name,
      type: service.type,
      city: service.city,
      price: service.price,
      salon_name: service.salon_name,
      contact: service.contact,
      image_url: service.image_url,
      description: service.description || '',
    })
    setEditingService(service)
    setShowAddService(true)
  }

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoUploading(true)
    const url = await uploadMedia(file)
    setLogoUploading(false)
    if (url) {
      setNewLogoUrl(url)
    } else {
      alert('Erreur lors du telechargement du logo')
    }
  }

  const handleSaveLogo = async () => {
    if (!newLogoUrl) {
      alert('Choisissez une photo avant d enregistrer')
      return
    }
    setSavingLogo(true)
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword, logo_url: newLogoUrl }),
    })
    setSavingLogo(false)
    const result = await res.json()
    if (!res.ok) {
      alert(result.error || 'Erreur lors de l enregistrement du logo')
      return
    }
    setCurrentLogoUrl(newLogoUrl)
    setNewLogoUrl('')
    if (logoInputRef.current) {
      logoInputRef.current.value = ''
    }
    alert('Logo mis a jour')
  }

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
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 text-muted hover:text-ink transition-colors"
            >
              Parametres du site
            </button>
          </div>

          {showSettings && (
            <div className="mb-12 p-6 border border-border rounded-lg bg-surface">
              <h2 className="text-xl font-bold mb-4">Logo du site</h2>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted mb-1">Logo actuel</p>
                  {currentLogoUrl && (
                    <img
                      src={currentLogoUrl}
                      alt="Logo actuel"
                      className="w-16 h-16 object-cover rounded-lg border border-border"
                    />
                  )}
                </div>

                {newLogoUrl && (
                  <div>
                    <p className="text-xs text-muted mb-1">Nouveau logo</p>
                    <img
                      src={newLogoUrl}
                      alt="Nouveau logo"
                      className="w-16 h-16 object-cover rounded-lg border border-border"
                    />
                  </div>
                )}
              </div>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoFileChange}
                className="input mb-3"
              />
              {logoUploading && <p className="text-sm text-muted mb-3">Telechargement en cours...</p>}

              <button
                onClick={handleSaveLogo}
                className="btn btn-primary"
                disabled={savingLogo || logoUploading}
              >
                {savingLogo ? 'Enregistrement...' : 'Enregistrer le logo'}
              </button>
            </div>
          )}

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

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Photo ou video *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="input"
                />
                {uploading && <p className="text-sm text-muted mt-2">Telechargement en cours...</p>}
                {formData.image_url && !uploading && (
                  isVideoUrl(formData.image_url) ? (
                    <video
                      src={formData.image_url}
                      className="mt-3 w-32 h-32 object-cover rounded-lg border border-border"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={formData.image_url}
                      alt="Apercu"
                      className="mt-3 w-32 h-32 object-cover rounded-lg border border-border"
                    />
                  )
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nom du style *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  required
                />

                <input
                  type="text"
                  placeholder="Type de coiffure (ex: Vanille, Box Braids...) *"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input"
                  required
                />

                <input
                  type="text"
                  placeholder="Ville *"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input"
                  required
                />

                <input
                  type="number"
                  placeholder="Prix (euros) *"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                  className="input"
                  required
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
                  type="text"
                  placeholder="Contact (numero, lien Instagram, TikTok...) *"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
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
                <button type="submit" className="btn btn-primary" disabled={uploading}>
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

          {loading ? (
            <p className="text-muted">Chargement...</p>
          ) : (
            <div className="space-y-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-surface transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {isVideoUrl(service.image_url) ? (
                      <video src={service.image_url} className="w-12 h-12 object-cover rounded-lg" muted />
                    ) : (
                      <img
                        src={service.image_url}
                        alt={service.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted">
                        {service.type} - {service.city} - {service.price} EUR
                      </p>
                    </div>
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
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
