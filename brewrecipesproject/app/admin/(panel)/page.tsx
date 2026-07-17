import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import RecipeImage from '@/app/components/RecipeImage';
import { Plus, Coffee, Images, TrendingUp, AlertCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'لوحة التحكم | Brew Recipes',
};

export default async function AdminDashboard() {
  const [recipes, totalRecipes, activeRecipes, totalMedia, withoutImage] = await Promise.all([
    prisma.recipe.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.recipe.count(),
    prisma.recipe.count({ where: { is_active: true } }),
    prisma.media.count(),
    prisma.recipe.count({ where: { image_url: null } }),
  ]);

  const stats = [
    { label: 'إجمالي الوصفات', value: totalRecipes, Icon: Coffee, href: '/admin/recipes' },
    { label: 'وصفات نشطة', value: activeRecipes, Icon: TrendingUp, href: '/admin/recipes' },
    { label: 'صور المكتبة', value: totalMedia, Icon: Images, href: '/admin/media' },
    { label: 'وصفات بلا صورة', value: withoutImage, Icon: AlertCircle, href: '/admin/recipes' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">لوحة التحكم</h1>
          <p className="opacity-60 mt-1">إدارة كاملة لوصفات وصور Brew Recipes</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/media" className="btn btn-secondary px-5 py-3"><Images className="w-4 h-4" /> مكتبة الصور</Link>
          <Link href="/admin/recipes/new" className="btn btn-gold px-5 py-3"><Plus className="w-4 h-4" /> وصفة جديدة</Link>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, Icon, href }) => (
          <Link key={label} href={href} className="admin-card card p-5 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-60">{label}</p>
                <p className="text-3xl font-bold tracking-tight mt-1">{value}</p>
              </div>
              <div className="p-2.5 bg-[var(--muted)] rounded-xl">
                <Icon className="w-5 h-5 text-[var(--accent)]" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent recipes */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-xl">أحدث الوصفات</h2>
        <Link href="/admin/recipes" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1">
          عرض الكل <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="card rounded-3xl p-12 text-center opacity-60">
          لا توجد وصفات بعد — <Link href="/admin/recipes/new" className="text-[var(--accent)] underline">أضف أول وصفة</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => (
            <Link key={r.id} href={`/admin/recipes/${r.id}/edit`} className="admin-card card rounded-2xl overflow-hidden">
              <div className="h-32 relative">
                <RecipeImage src={r.image_url} alt={r.title} />
                {!r.is_active && (
                  <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-black/60 text-white">موقوفة</span>
                )}
              </div>
              <div className="p-4">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs opacity-60 mt-0.5">{r.roastery} • {r.coffee_type}</div>
                <div className="text-sm font-semibold text-[var(--accent)] mt-2">{r.price} ر.س</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
