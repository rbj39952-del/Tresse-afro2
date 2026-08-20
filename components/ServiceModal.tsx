'use client'

import Image from 'next/image'
import { X, Instagram, MessageCircle } from 'lucide-react'
import type { Service } from '@/lib/data'

interface ServiceModalProps {
  service: Service | null
  typeName?: string
  isOpen: boolean
  onClose: () => void
}

const priceEmoji = { budget: '€', medium: '€€', premium: '€€€' }

export function ServiceModal({ service, typeName, isOpen, onClose }: ServiceModalProps) {
  if (!isOpen || !service) return null
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-full sm:max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-2xl z-50">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{service.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-lg transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="relative w-full h-80 rounded-lg overflow-hidden bg-surface">
            <Image src={service.image_url} alt={service.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3 bg-surface rounded-lg"><div className="text-xs text-muted mb-1">Type</div><div className="font-semibold">{typeName || service.type_id}</div></div>
            <div className="p-3 bg-surface rounded-lg"><div className="text-xs text-muted mb-1">Ville</div><div className="font-semibold">{service.city}</div></div>
            <div className="p-3 bg-surface rounded-lg"><div className="text-xs text-muted mb-1">Durée</div><div className="font-semibold">{service.duration_minutes}min</div></div>
            <div className="p-3 bg-surface rounded-lg"><div className="text-xs text-muted mb-1">Budget</div><div className="font-semibold">{priceEmoji[service.price_range as keyof typeof priceEmoji]}</div></div>
          </div>
          <div className="space-y-3">
            <div><h3 className="text-sm font-semibold text-muted mb-1">Salon/Coiffeuse</h3><p className="font-medium">{service.salon_name}</p></div>
            <div><h3 className="text-sm font-semibold text-muted mb-1">Prix</h3><p className="font-medium">{service.price_min}€ - {service.price_max}€</p></div>
            {service.description && <div><h3 className="text-sm font-semibold text-muted mb-1">Description</h3><p className="text-sm leading-relaxed">{service.description}</p></div>}
            {service.salon_phone && <div><h3 className="text-sm font-semibold text-muted mb-1">Téléphone</h3><p className="font-medium">{service.salon_phone}</p></div>}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
            {service.instagram_url && <a href={service.instagram_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center justify-center gap-2"><Instagram className="w-4 h-4" /><span>Instagram</span></a>}
            {service.whatsapp_url && <a href={service.whatsapp_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary flex items-center justify-center gap-2"><MessageCircle className="w-4 h-4" /><span>WhatsApp</span></a>}
          </div>
        </div>
      </div>
    </>
  )
}
