import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// List all images in the Media Library (metadata only, admin-only).
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 })
  }

  const items = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      filename: true,
      mimeType: true,
      size: true,
      alt: true,
      createdAt: true,
    },
  })

  return NextResponse.json({
    items: items.map((m) => ({ ...m, url: `/api/media/${m.id}` })),
  })
}
