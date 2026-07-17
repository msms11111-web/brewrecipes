import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import RecipeImage from '@/app/components/RecipeImage';
import { Coffee, Images, Plus, Check, X, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'إدارة المحتوى | لوحة التحكم',
};

function Flag({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full ${
      ok ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400'
         : 'bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400'
    }`}>
      {ok ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {label}
    </span>
  );
}

export default async function ContentPage() {
  const [recipes, mediaCount] = await Promise.all([
    prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.media.count(),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">إدارة المحتوى</h1>
        <p className="opacity-60 mt-1">نظرة شاملة على محتوى الموقع واكتمال كل وصفة.</p>
      </header>

      {/* Quick entry cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        <Link href="/admin/recipes/new" className="admin-card card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[var(--muted)] rounded-xl"><Plus className="w-5 h-5 text-[var(--accent)]" /></div>
          <div><div className="font-semibold">وصفة جديدة</div><div className="text-xs opacity-60">أضف محتوى جديد</div></div>
        </Link>
        <Link href="/admin/recipes" className="admin-card card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[var(--muted)] rounded-xl"><Coffee className="w-5 h-5 text-[var(--accent)]" /></div>
          <div><div className="font-semibold">{recipes.length} وصفة</div><div className="text-xs opacity-60">إدارة الوصفات</div></div>
        </Link>
        <Link href="/admin/media" className="admin-card card p-6 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-[var(--muted)] rounded-xl"><Images className="w-5 h-5 text-[var(--accent)]" /></div>
          <div><div className="font-semibold">{mediaCount} صورة</div><div className="text-xs opacity-60">مكتبة الصور</div></div>
        </Link>
      </div>

      <h2 className="font-semibold text-xl mb-4">اكتمال المحتوى</h2>
      {recipes.length === 0 ? (
        <div className="card rounded-3xl p-12 text-center opacity-60">
          لا يوجد محتوى بعد — <Link href="/admin/recipes/new" className="text-[var(--accent)] underline">ابدأ بإضافة وصفة</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((r) => (
            <div key={r.id} className="card rounded-2xl p-3 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <RecipeImage src={r.image_url} alt={r.title} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.title}</div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <Flag ok={!!r.image_url} label="صورة" />
                  <Flag ok={r.description.trim().length > 0} label="وصف" />
                  <Flag ok={r.steps !== '[]' && r.steps.length > 2} label="خطوات" />
                  <Flag ok={r.tasting_notes !== '[]' && r.tasting_notes.length > 2} label="نكهات" />
                  <Flag ok={r.price > 0} label="سعر" />
                </div>
              </div>
              <Link href={`/admin/recipes/${r.id}/edit`} className="btn btn-secondary text-sm px-4 py-2 shrink-0">
                تعديل <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
