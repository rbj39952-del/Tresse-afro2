export interface Service {
  id: string
  name: string
  type: string
  city: string
  price: number
  salon_name: string
  contact: string
  image_url: string
  description?: string | null
  status: string
  created_at: string
  updated_at: string
}

export function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|m4v|ogg)(\?.*)?$/i.test(url)
}
