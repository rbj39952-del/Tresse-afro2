'use client'

import Image from 'next/image'
import { X, MapPin, Clock, Phone } from 'lucide-react'
import type { Service } from '@/lib/data'

interface ServiceModalProps {
  service: Service | null
  typeName?: string
  isOpen: boolean
  onClose: () => void
}

function getContactHref(contact: string) {
  const trimmed = contact.trim()
  const isPhone = /^[0-9+\s().-]+$/.test(trimmed)
  if (isPhone) {
    return 'tel:' + trimmed.replace(/[\s().-]/g, '')
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }
  return 'https://' + trimmed
}

export function ServiceModal({ service, typeName, isOpen, onClose }: ServiceModalProps) {
  if (!isOpen || !service) return null

  const contactHref = getContactHref(service.contact)
  const isPhoneLink = contactHref.startsWith('tel:')

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%] sm:w-full sm:max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-2xl z-50">
        <div className="sticky top-0 bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{service.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative w-full h-80 rounded-lg overflow-hidden bg-surface">
            <Image src={service.image_url} alt={service.name} fill className="object-cover" />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-3xl font-bold">{service.price} EUR</span>
            {typeName && <span className="badge">{typeName}</span>}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{service.city}</span>
            </div>
            {service.duration_minutes ? (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{service.duration_minutes} min</span>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted mb-1">Salon / Coiffeuse</h3>
            <p className="font-medium">{service.salon_name}</p>
          </div>

          {service.description && (
            <div>
              <h3 className="text-sm font-semibold text-muted mb-1">Description</h3>
              <p className="text-sm leading-relaxed">{service.description}</p>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <a
              href={contactHref}
              target={isPhoneLink ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contacter</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
