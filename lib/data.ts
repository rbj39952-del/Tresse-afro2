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
  salon_phone?: string
  instagram_url?: string
  whatsapp_url?: string
  tiktok_url?: string
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
    id: '1',
    name: 'Barrel Twist',
    type_id: 'barrel-twist',
    city: 'Paris',
    price: 120,
    duration_minutes: 240,
    salon_name: 'Salon Tresses Beauty',
    salon_phone: '0612345678',
    instagram_url: 'https://instagram.com/tressesbeauty',
    whatsapp_url: 'https://wa.me/33612345678',
    image_url: 'https://images.unsplash.com/photo-1590617888195-97a61a14b18d?w=500&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Vanille Doree',
    type_id: 'vanille',
    city: 'Montreuil',
    price: 90,
    duration_minutes: 180,
    salon_name: 'Coiffure Afro Excellence',
    salon_phone: '0698765432',
    instagram_url: 'https://instagram.com/coiffureafro',
    whatsapp_url: 'https://wa.me/33698765432',
    image_url: 'https://images.unsplash.com/photo-1585114674953-d954a2c67fbd?w=500&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Box Braids Jumbo',
    type_id: 'box-braids',
    city: 'Paris',
    price: 170,
    duration_minutes: 360,
    salon_name: 'Studio Braids Paris',
    salon_phone: '0712345678',
    instagram_url: 'https://instagram.com/studiobraids',
    whatsapp_url: 'https://wa.me/33712345678',
    tiktok_url: 'https://tiktok.com/@studiobraids',
    image_url: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=500&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Knotless Braids',
    type_id: 'knotless-braids',
    city: 'Cergy',
    price: 140,
    duration_minutes: 300,
    salon_name: 'Cergy Tresses',
    salon_phone: '0856789012',
    instagram_url: 'https://instagram.com/cergytresses',
    whatsapp_url: 'https://wa.me/33856789012',
    image_url: 'https://images.unsplash.com/photo-1590617888195-97a61a14b18d?w=500&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Faux Locs',
    type_id: 'faux-locs',
    city: 'Paris',
    price: 210,
    duration_minutes: 420,
    salon_name: 'Salon Luxe Afro',
    salon_phone: '0934567890',
    instagram_url: 'https://instagram.com/luxeafro',
    whatsapp_url: 'https://wa.me/33934567890',
    tiktok_url: 'https://tiktok.com/@luxeafro',
    image_url: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=500&q=80',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
