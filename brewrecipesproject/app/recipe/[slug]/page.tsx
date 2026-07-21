import { notFound } from 'next/navigation';
import { getRecipeBySlug } from '@/lib/recipes';
import RecipeDetailClient from '../../components/RecipeDetailClient';

export const dynamic = 'force-dynamic';

// المعامل يصل مشفَّراً بالنسبة للأحرف العربية، لذا نفك ترميزه قبل البحث
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(decodeSlug(slug));
  if (!recipe) return { title: 'وصفة غير موجودة | قَطرَة' };
  return {
    title: `${recipe.title} | قَطرَة`,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(decodeSlug(slug));

  if (!recipe) notFound();

  return <RecipeDetailClient recipe={recipe} />;
}
