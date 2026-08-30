import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, type, city, price, salon_name, contact, image_url, description } = body

  if (!name || !type || !city || !salon_name || !contact || !image_url) {
    return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
  }

  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from('services')
    .insert([
      {
        name,
        type,
        city,
        price: price || 0,
        salon_name,
        contact,
        image_url,
        description: description || null,
        status: 'pending',
      },
    ])
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: data?.[0] })
}
