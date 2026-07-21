"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useAppStore, useHydrated } from '@/lib/app-store';
import type { Recipe } from '@/app/types';

export default function FavoritesPage() {
  const hydrated = useHydrated();
  const favorites = useAppStore((s) => s.favorites);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then(setRecipes)
      .catch(() => setRecipes([]));
  }, []);

  const favoriteRecipes = recipes?.filter((r) => favorites.includes(r.slug)) ?? [];
  const loading = !hydrated || recipes === null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-[var(--accent)] text-xs tracking-[3px] font-semibold">YOUR COLLECTION</div>
        <h1 className="text-6xl tracking-tighter font-bold text-[var(--foreground)]">المفضلة</h1>
        <p className="text-lg text-[var(--muted-foreground)] mt-2">الوصفات التي أضفتها إلى قائمتك المفضلة</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-96 rounded-3xl" />
          ))}
        </div>
      ) : favoriteRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="mx-auto w-20 h-20 rounded-full bg-[var(--secondary)] flex items-center justify-center mb-6">
            <Heart className="w-9 h-9 text-[var(--foreground)]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">قائمتك المفضلة فارغة</h2>
          <p className="text-[var(--muted-foreground)] mb-8">
            اضغط على أيقونة القلب في أي وصفة لإضافتها هنا
          </p>
          <Link href="/store" className="btn btn-gold px-10 py-3.5">تصفح المتجر</Link>
        </div>
      )}
    </div>
  );
}
