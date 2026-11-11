import type { Metadata } from 'next'
import { ExternalLink, Download } from 'lucide-react'
import { xbloomRecipes, xbloomShareUrl } from '@/lib/xbloom-recipes'

export const metadata: Metadata = {
  title: 'وصفات xBloom | قَطرَة',
  description: 'وصفات مصوّرة مضبوطة لمكينة xBloom Studio، كل وصفة تفتح مباشرة في تطبيق xBloom.',
}

export default function XbloomPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10 max-w-3xl">
        <div className="text-[var(--accent)] text-xs tracking-[3px] font-semibold">XBLOOM STUDIO</div>
        <h1 className="text-5xl md:text-6xl tracking-tighter font-bold text-[var(--foreground)] mt-2">وصفات xBloom</h1>
        <p className="text-lg leading-relaxed text-[var(--muted-foreground)] mt-3">
          {xbloomRecipes.length} وصفة مصوّرة، مضبوطة على محاصيل حقيقية. كل بطاقة فيها الصبّات والحرارة، ورمز QR أو زر يفتح
          الوصفة مباشرة في تطبيق xBloom.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {xbloomRecipes.map((r) => (
          <article
            key={r.slug}
            id={r.slug}
            className="rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden flex flex-col"
          >
            <a href={`/images/xbloom/${r.slug}.png`} target="_blank" rel="noopener" className="block bg-[var(--panel-dark)]">
              <img
                src={`/images/xbloom/${r.slug}.webp`}
                alt={`بطاقة وصفة ${r.name}، ${r.tag}، ${r.dose} جرام`}
                width={1080}
                height={r.height}
                loading="lazy"
                className="w-full h-auto block"
              />
            </a>
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="text-2xl font-bold text-[var(--card-foreground)] m-0">{r.name}</h2>
                <span className="text-xs font-semibold rounded-full px-3 py-1 bg-[var(--primary)] text-[var(--primary-foreground)] whitespace-nowrap">
                  {r.tag}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] m-0">
                {r.origin}
                {r.roaster ? ` · ${r.roaster}` : ''} · {r.dose}g · {r.water}ml · {r.ratio}
              </p>
              <div className="flex gap-2 mt-1">
                <a
                  href={xbloomShareUrl(r)}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary flex-1 justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  افتح في xBloom
                </a>
                <a
                  href={`/images/xbloom/${r.slug}.png`}
                  download
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] px-4 text-[var(--card-foreground)] hover:text-[var(--accent)]"
                  aria-label={`تحميل صورة وصفة ${r.name}`}
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
