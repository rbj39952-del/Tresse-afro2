'use client'

import Image from 'next/image'
import { MapPin, Heart } from 'lucide-react'
import { isVideoUrl } from '@/lib/data'
import type { Service } from '@/lib/data'

interface ServiceCardProps {
  service: Service
  onClick?: () => void
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}

export function ServiceCard({ service, onClick, isFavorite, onToggleFavorite }: ServiceCardProps) {
  const isVideo = isVideoUrl(service.image_url)

  return (
    <div onClick={onClick} className="cursor-pointer group">
      <div className="relative w-full aspect-[4/5] bg-surface overflow-hidden rounded-xl border border-border">
        {isVideo ? (
          <video
            src={service.image_url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            muted
            loop
            autoPlay
            playsInline
          />
        ) : (
          <Image
            src={service.image_url}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        <div className="absolute top-3 left-3">
          <span className="inline-block px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
            {service.type}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite?.(service.id)
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
          aria-label="Favori"
        >
          <Heart
            className="w-4 h-4"
            fill={isFavorite ? '#ffffff' : 'none'}
            stroke="#ffffff"
          />
        </button>

        <div className="absolute bottom-3 left-3">
          <span className="inline-block px-3 py-1.5 rounded-lg bg-white text-ink font-bold text-base shadow-md">
            {service.price} EUR
          </span>
        </div>
      </div>

      <div className="pt-3">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{service.name}</h3>
        <div className="flex items-center gap-1 text-sm text-muted mb-0.5">
          <MapPin className="w-3.5 h-3.5" />
          <span>{service.city}</span>
        </div>
        <p className="text-sm text-muted">{service.salon_name}</p>
      </div>
    </div>
  )
}
