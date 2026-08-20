'use client'

import Image from 'next/image'
import { MapPin, Clock, Euro } from 'lucide-react'
import type { Service } from '@/lib/data'

interface ServiceCardProps {
  service: Service
  typeName?: string
  onClick?: () => void
}

const priceEmoji = { budget: '€', medium: '€€', premium: '€€€' }

export function ServiceCard({ service, typeName, onClick }: ServiceCardProps) {
  return (
    <div onClick={onClick} className="card cursor-pointer group">
      <div className="relative w-full h-64 bg-surface overflow-hidden">
        <Image src={service.image_url} alt={service.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 left-3">
          <span className="badge bg-white/95 text-ink text-xs font-medium">{typeName || service.type_id}</span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="badge bg-ink text-white">{priceEmoji[service.price_range as keyof typeof priceEmoji]}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-3 line-clamp-2">{service.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="w-4 h-4" /><span>{service.city}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Clock className="w-4 h-4" /><span>{service.duration_minutes}min</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Euro className="w-4 h-4" /><span>{service.price_min}€ - {service.price_max}€</span>
          </div>
        </div>
        <p className="text-sm text-muted font-medium">{service.salon_name}</p>
      </div>
    </div>
  )
}
