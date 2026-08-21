import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error(error)
    return []
  }
  return data || []
}

export async function fetchSettings() {
  const { data, error } = await supabase.from('settings').select('*').eq('id', 1).single()
  if (error) {
    console.error(error)
    return null
  }
  return data
}

export async function uploadMedia(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = Date.now() + '-' + Math.random().toString(36).substring(2) + '.' + fileExt

  const { error } = await supabase.storage.from('photos').upload(fileName, file)
  if (error) {
    console.error(error)
    return null
  }

  const { data } = supabase.storage.from('photos').getPublicUrl(fileName)
  return data.publicUrl
}
