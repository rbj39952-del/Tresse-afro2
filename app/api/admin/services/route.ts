import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  )
}

function checkPassword(password: string) {
  return password === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const supabase = getAdminClient()
  const { password, id, ...data } = body

  if (id) {
    const { data: updated, error } = await supabase
      .from('services')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ service: updated?.[0] })
  }

  const { data: created, error } = await supabase.from('services').insert([data]).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ service: created?.[0] })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  if (!checkPassword(body.password)) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  const supabase = getAdminClient()
  const { error } = await supabase.from('services').delete().eq('id', body.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
