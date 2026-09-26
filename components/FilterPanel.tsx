'use client'

import { ChevronDown } from 'lucide-react'

interface FilterPanelProps {
  types: string[]
  selectedType: string
  selectedCity: string
  cities: string[]
  sortBy: string
  onTypeChange: (value: string) => void
  onCityChange: (value: string) => void
  onSortChange: (value: string) => void
}

export function FilterPanel({
  types,
  selectedType,
  selectedCity,
  cities,
  sortBy,
  onTypeChange,
  onCityChange,
  onSortChange,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="relative min-w-[200px]">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="appearance-none w-full input pr-10 bg-white cursor-pointer"
        >
          <option value="">Tous les styles</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>

      <div className="relative min-w-[200px]">
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="appearance-none w-full input pr-10 bg-white cursor-pointer"
        >
          <option value="">Toutes les villes</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>

      <div className="relative min-w-[200px]">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none w-full input pr-10 bg-white cursor-pointer"
        >
          <option value="">Trier par</option>
          <option value="price_asc">Prix croissant</option>
          <option value="price_desc">Prix décroissant</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      </div>
    </div>
  )
}
