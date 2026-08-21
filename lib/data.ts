export interface HairstyleType {
  id: string
  name: string
}

export interface Service {
  id: string
  name: string
  type_id: string
  city: string
  price: number
  duration_minutes: number
  salon_name: string
  contact: string
  image_url: string
  description?: string | null
  created_at: string
  updated_at: string
}
