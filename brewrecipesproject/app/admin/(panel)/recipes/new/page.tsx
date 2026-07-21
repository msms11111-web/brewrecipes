import Link from 'next/link';
import RecipeForm from '@/app/components/RecipeForm';
import { createRecipe } from '@/lib/admin-actions';

export const metadata = {
  title: 'إضافة وصفة جديدة | قَطرَة',
};

export default function NewRecipePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 lg:py-10">
      <Link href="/admin/recipes" className="text-sm mb-6 inline-block opacity-70 hover:text-[var(--accent)]">→ العودة إلى الوصفات</Link>

      <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-8">إضافة وصفة جديدة</h1>

      <RecipeForm action={createRecipe} submitLabel="إضافة الوصفة" />
    </div>
  );
}
