import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tresse Afro',
    short_name: 'Tresse Afro',
    description: 'Annuaire de coiffures afro a Paris et en Ile-de-France',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#09090B',
    icons: [
      {
        src: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=192&h=192&fit=crop&q=80',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=512&h=512&fit=crop&q=80',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
