import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { toRecipe } from '@/lib/recipes';
import { updateRecipe } from '@/lib/admin-actions';
import RecipeForm from '@/app/components/RecipeForm';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'تعديل الوصفة | Brew Recipes',
};

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.recipe.findUnique({ where: { id } });
  if (!row) notFound();

  const recipe = toRecipe(row);
  const updateAction = updateRecipe.bind(null, id);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 lg:py-10">
      <Link href="/admin/recipes" className="text-sm mb-6 inline-block opacity-70 hover:text-[var(--accent)]">→ العودة إلى الوصفات</Link>

      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">تعديل الوصفة</h1>
      <p className="opacity-60 mb-8">{recipe.title}</p>

      <RecipeForm action={updateAction} recipe={recipe} submitLabel="حفظ التعديلات" />
    </div>
  );
}
