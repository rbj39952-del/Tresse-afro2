'use client'

import { ChevronDown } from 'lucide-react'
import type { HairstyleType } from '@/lib/data'

interface FilterPanelProps {
  hairstyleTypes: HairstyleType[]
  selectedType: string
  selectedCity: string
  selectedPrice: string
  cities: string[]
  onTypeChange: (value: string) => void
  onCityChange: (value: string) => void
  onPriceChange: (value: string) => void
}

export function FilterPanel({ hairstyleTypes, selectedType, selectedCity, selectedPrice, cities, onTypeChange, onCityChange, onPriceChange }: FilterPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative min-w-[200px]">
        <select value={selectedType} onChange={(e) => onTypeChange(e.target.value)} className="appearance-none w-full input pr-10 bg-white cursor-pointer">
          <option value="">Tous les styles</option>
          {hairstyleTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
      <div className="relative min-w-[200px]">
        <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)} className="appearance-none w-full input pr-10 bg-white cursor-pointer">
          <option value="">Toutes les villes</option>
          {cities.map((city) => <option key={city} value={city}>{city}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
      <div className="relative min-w-[180px]">
        <select value={selectedPrice} onChange={(e) => onPriceChange(e.target.value)} className="appearance-none w-full input pr-10 bg-white cursor-pointer">
          <option value="">Tous les budgets</option>
          <option value="budget">€ Budget</option>
          <option value="medium">€€ Moyen</option>
          <option value="premium">€€€ Premium</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
    </div>
  )
}
