import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { deleteRecipe, toggleRecipeActive } from '@/lib/admin-actions';
import RecipeImage from '@/app/components/RecipeImage';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'إدارة الوصفات | لوحة التحكم',
};

export default async function AdminRecipesPage() {
  const recipes = await prisma.recipe.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">إدارة الوصفات</h1>
          <p className="opacity-60 mt-1">{recipes.length} وصفة</p>
        </div>
        <Link href="/admin/recipes/new" className="btn btn-gold px-5 py-3 self-start">
          <Plus className="w-4 h-4" /> وصفة جديدة
        </Link>
      </header>

      {recipes.length === 0 ? (
        <div className="card rounded-3xl p-12 text-center opacity-60">
          لا توجد وصفات بعد — <Link href="/admin/recipes/new" className="text-[var(--accent)] underline">أضف أول وصفة</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="card rounded-2xl p-3 flex items-center gap-4">
              <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <RecipeImage src={recipe.image_url} alt={recipe.title} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{recipe.title}</div>
                <div className="text-xs opacity-60 mt-0.5 truncate">
                  {recipe.roastery} • {recipe.origin_country}
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--muted)]">{recipe.coffee_type}</span>
                  <span className="text-xs font-semibold text-[var(--accent)]">{recipe.price} ر.س</span>
                  {recipe.image_url ? null : (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">بلا صورة</span>
                  )}
                  {!recipe.is_active && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">موقوفة</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <form action={toggleRecipeActive}>
                  <input type="hidden" name="id" value={recipe.id} />
                  <button type="submit" className="p-2.5 hover:bg-[var(--muted)] rounded-xl" title={recipe.is_active ? 'إيقاف' : 'تفعيل'}>
                    {recipe.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4 opacity-50" />}
                  </button>
                </form>
                <Link href={`/admin/recipes/${recipe.id}/edit`} className="p-2.5 hover:bg-[var(--muted)] rounded-xl" title="تعديل">
                  <Edit className="w-4 h-4" />
                </Link>
                <form action={deleteRecipe}>
                  <input type="hidden" name="id" value={recipe.id} />
                  <button type="submit" className="p-2.5 hover:bg-red-100 dark:hover:bg-red-950/30 text-red-600 rounded-xl" title="حذف">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
