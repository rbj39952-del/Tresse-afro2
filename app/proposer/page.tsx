'use client'

import { useState, useRef } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { uploadMedia } from '@/lib/supabase'
import { isVideoUrl } from '@/lib/data'

export default function ProposerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      !formData.name.trim() ||
      !formData.type.trim() ||
      !formData.city.trim() ||
      !formData.salon_name.trim() ||
      !formData.contact.trim() ||
      !formData.image_url
    ) {
      alert('Merci de remplir tous les champs obligatoires')
      return
    }

    setSending(true)
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        name: formData.name.trim(),
        type: formData.type.trim(),
        city: formData.city.trim(),
        salon_name: formData.salon_name.trim(),
        contact: formData.contact.trim(),
      }),
    })
    setSending(false)

    if (!res.ok) {
      alert('Une erreur est survenue, reessayez')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-3">Merci !</h1>
            <p className="text-muted">
              Votre coiffure a bien ete envoyee. Elle sera visible sur le site des sa validation.
            </p>
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
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-2">Ajouter votre coiffure</h1>
          <p className="text-muted mb-8">
            Salons et coiffeuses, ajoutez gratuitement une de vos realisations. Elle sera publiee apres verification.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
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
              placeholder="Prix (euros)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              className="input"
            />

            <input
              type="text"
              placeholder="Nom du salon ou de la coiffeuse *"
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

            <textarea
              placeholder="Description (optionnel)"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input w-full h-24"
            />

            <button type="submit" className="btn btn-primary w-full" disabled={uploading || sending}>
              {sending ? 'Envoi en cours...' : 'Envoyer pour validation'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
