'use server'

import { prisma } from './prisma'
import { requireAdmin } from './auth'
import { revalidatePath } from 'next/cache'

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB per image
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

export type MediaActionResult = { ok: true; id: string } | { ok: false; error: string }

function revalidateMediaPages() {
  revalidatePath('/admin/media')
  revalidatePath('/admin')
}

// Upload one image (from the admin's device) into the Media Library.
export async function uploadMedia(formData: FormData): Promise<MediaActionResult> {
  await requireAdmin()

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'لم يتم اختيار صورة' }
  }
  if (!ALLOWED.includes(file.type)) {
    return { ok: false, error: 'صيغة غير مدعومة (JPG, PNG, WEBP, GIF, AVIF فقط)' }
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'حجم الصورة يتجاوز 8 ميجابايت' }
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  const alt = ((formData.get('alt') as string) || '').trim() || null

  const media = await prisma.media.create({
    data: {
      filename: file.name || 'image',
      mimeType: file.type,
      size: bytes.length,
      alt,
      data: bytes,
    },
    select: { id: true },
  })

  revalidateMediaPages()
  return { ok: true, id: media.id }
}

// Update an image's descriptive text (alt).
export async function updateMediaAlt(id: string, alt: string): Promise<MediaActionResult> {
  await requireAdmin()
  if (!id) return { ok: false, error: 'معرّف غير صالح' }
  await prisma.media.update({ where: { id }, data: { alt: alt.trim() || null } })
  revalidateMediaPages()
  return { ok: true, id }
}

// Replace an image's binary contents while keeping the same id/URL, so every
// recipe already pointing at it updates automatically ("تعديل الصورة").
export async function replaceMedia(id: string, formData: FormData): Promise<MediaActionResult> {
  await requireAdmin()
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'لم يتم اختيار صورة' }
  }
  if (!ALLOWED.includes(file.type)) {
    return { ok: false, error: 'صيغة غير مدعومة' }
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'حجم الصورة يتجاوز 8 ميجابايت' }
  }

  const bytes = Buffer.from(await file.arrayBuffer())
  await prisma.media.update({
    where: { id },
    data: {
      filename: file.name || 'image',
      mimeType: file.type,
      size: bytes.length,
      data: bytes,
    },
  })

  revalidateMediaPages()
  revalidatePath('/')
  revalidatePath('/store')
  return { ok: true, id }
}

// Delete an image. Any recipe referencing it is detached (image_url → null)
// so it falls back to the in-app placeholder rather than a broken image.
export async function deleteMedia(id: string): Promise<MediaActionResult> {
  await requireAdmin()
  if (!id) return { ok: false, error: 'معرّف غير صالح' }

  const url = `/api/media/${id}`
  await prisma.$transaction([
    prisma.recipe.updateMany({ where: { image_url: url }, data: { image_url: null } }),
    prisma.media.delete({ where: { id } }),
  ])

  revalidateMediaPages()
  revalidatePath('/')
  revalidatePath('/store')
  return { ok: true, id }
}
