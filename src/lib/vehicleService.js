// ============================================================
// VEHICLE SERVICE — handles all database read/write operations
// ============================================================

import { supabase, STORAGE_BUCKET } from './supabase'

// Fetch all vehicles (for public site)
export async function getVehicles() {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

// Fetch single vehicle by ID
export async function getVehicle(id) {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

// Create new vehicle
export async function createVehicle(vehicle) {
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single()

  if (error) throw error
  return data
}

// Update existing vehicle
export async function updateVehicle(id, updates) {
  const { data, error } = await supabase
    .from('vehicles')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

// Delete vehicle
export async function deleteVehicle(id) {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Upload image to Supabase Storage
export async function uploadImage(file) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) throw uploadError

  // Get public URL
  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(filePath)

  return data.publicUrl
}

// Delete image from storage
export async function deleteImage(url) {
  try {
    const path = url.split(`${STORAGE_BUCKET}/`)[1]
    if (path) {
      await supabase.storage.from(STORAGE_BUCKET).remove([path])
    }
  } catch (e) {
    console.warn('Could not delete image:', e)
  }
}
