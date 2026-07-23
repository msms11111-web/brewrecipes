"use client";

import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore, useHydrated } from '@/lib/app-store';
import type { Recipe } from '@/app/types';
import RecipeImage from './RecipeImage';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const hydrated = useHydrated();
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favorited = hydrated && favorites.includes(recipe.slug);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(recipe.slug);
    toast.success(favorited ? 'أُزيلت من المفضلة' : 'أُضيفت إلى المفضلة');
  };

  return (
    <Link href={`/recipe/${recipe.slug}`} className="group block h-full">
      <div className="recipe-card card rounded-3xl overflow-hidden h-full flex flex-col">
        <div className="relative h-56">
          <RecipeImage
            src={recipe.image_url}
            alt={recipe.title}
            className="group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 right-4 px-3.5 py-1 text-xs font-semibold bg-[oklch(16%_0.035_160_/_0.85)] rounded-full tracking-wider">
            {recipe.coffee_type}
          </div>
          <button
            onClick={handleFavorite}
            aria-label={favorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            className="absolute top-4 left-4 p-2.5 rounded-full bg-[oklch(16%_0.035_160_/_0.85)] hover:scale-110 transition-transform"
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-red-500 text-red-500' : 'text-[var(--foreground)]'}`} />
          </button>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-bold text-2xl tracking-tight mb-1">{recipe.title}</h3>
            <p className="text-sm text-[var(--muted-foreground)]">
              {recipe.roastery} • {recipe.origin_country}
            </p>

            {recipe.rating != null && (
              <div className="flex items-center gap-1.5 mt-2 text-sm">
                <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                <span>{recipe.rating}</span>
                <span className="text-[var(--muted-foreground)]">({recipe.reviewsCount})</span>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 mt-4">
              {recipe.tasting_notes.slice(0, 3).map((note, i) => (
                <span
                  key={i}
                  className="text-[10px] px-3 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--foreground)]"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-[var(--border)]">
            <div>
              <span className="text-3xl font-bold tracking-tighter text-[var(--foreground)]">
                {recipe.price}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]"> ر.س</span>
            </div>
            <div className="btn btn-primary text-sm px-6 py-2.5">عرض التفاصيل</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
