export interface HairstyleType {
  id: string
  name: string
}

export interface Service {
  id: string
  name: string
  type_id: string
  city: string
  price_range: 'budget' | 'medium' | 'premium'
  price_min: number
  price_max: number
  duration_minutes: number
  salon_name: string
  salon_phone?: string
  instagram_url?: string
  whatsapp_url?: string
  image_url: string
  description?: string
  created_at: string
  updated_at: string
}

export const EXAMPLE_HAIRSTYLE_TYPES: HairstyleType[] = [
  { id: 'barrel-twist', name: 'Barrel Twist' },
  { id: 'vanille', name: 'Vanille' },
  { id: 'box-braids', name: 'Box Braids' },
  { id: 'knotless-braids', name: 'Knotless Braids' },
  { id: 'faux-locs', name: 'Faux Locs' },
  { id: 'locks', name: 'Locks' },
]

export const EXAMPLE_SERVICES: Service[] = [
  {
    id: '1', name: 'Barrel Twist Premium', type_id: 'barrel-twist', city: 'Paris',
    price_range: 'medium', price_min: 100, price_max: 150, duration_minutes: 240,
    salon_name: 'Salon Tresses Beauty', instagram_url: 'https://instagram.com/tressesbeauty',
    whatsapp_url: 'https://wa.me/33612345678',
    image_url: 'https://images.unsplash.com/photo-1590617888195-97a61a14b18d?w=500&q=80',
    description: 'Magnifiques barrel twists avec finition premium',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '2', name: 'Vanille Dorée', type_id: 'vanille', city: 'Montreuil',
    price_range: 'budget', price_min: 80, price_max: 120, duration_minutes: 180,
    salon_name: 'Coiffure Afro Excellence', instagram_url: 'https://instagram.com/coiffureafro',
    whatsapp_url: 'https://wa.me/33698765432',
    image_url: 'https://images.unsplash.com/photo-1585114674953-d954a2c67fbd?w=500&q=80',
    description: 'Vanille avec touches dorées, très tendance',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '3', name: 'Box Braids Jumbo', type_id: 'box-braids', city: 'Paris',
    price_range: 'premium', price_min: 150, price_max: 200, duration_minutes: 360,
    salon_name: 'Studio Braids Paris', instagram_url: 'https://instagram.com/studiobraids',
    whatsapp_url: 'https://wa.me/33712345678',
    image_url: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=500&q=80',
    description: 'Box braids jumbo avec finition luxe',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '4', name: 'Knotless Braids', type_id: 'knotless-braids', city: 'Cergy',
    price_range: 'medium', price_min: 120, price_max: 160, duration_minutes: 300,
    salon_name: 'Cergy Tresses', instagram_url: 'https://instagram.com/cergytresses',
    whatsapp_url: 'https://wa.me/33856789012',
    image_url: 'https://images.unsplash.com/photo-1590617888195-97a61a14b18d?w=500&q=80',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
  {
    id: '5', name: 'Faux Locs Élégantes', type_id: 'faux-locs', city: 'Paris',
    price_range: 'premium', price_min: 180, price_max: 250, duration_minutes: 420,
    salon_name: 'Salon Luxe Afro', instagram_url: 'https://instagram.com/luxeafro',
    whatsapp_url: 'https://wa.me/33934567890',
    image_url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&q=80',
    created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
  },
]
