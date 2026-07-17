import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// Serve the raw image bytes. Public (images appear on public recipe pages),
// but only ids that exist resolve — there is no listing here.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const media = await prisma.media.findUnique({
    where: { id },
    select: { data: true, mimeType: true, updatedAt: true },
  })

  if (!media) {
    return NextResponse.json({ error: 'الصورة غير موجودة' }, { status: 404 })
  }

  const body = new Uint8Array(media.data)
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': media.mimeType,
      'Content-Length': String(body.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Last-Modified': media.updatedAt.toUTCString(),
    },
  })
}
