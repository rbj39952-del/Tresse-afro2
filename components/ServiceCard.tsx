'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { MapPin, Heart } from 'lucide-react'
import { isVideoUrl } from '@/lib/data'
import type { Service } from '@/lib/data'

interface ServiceCardProps {
  service: Service
  onClick?: () => void
  isFavorite?: boolean
  onToggleFavorite?: (id: string) => void
}

export function ServiceCard({ service, onClick }: ServiceCardProps) {
export function ServiceCard({ service, onClick, isFavorite, onToggleFavorite }: ServiceCardProps) {
  const isVideo = isVideoUrl(service.image_url)

  return (
@@ -40,6 +42,21 @@ export function ServiceCard({ service, onClick }: ServiceCardProps) {
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
            {service.price} 
