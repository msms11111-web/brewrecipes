"use client";

import Link from 'next/link';
import { ArrowUpLeft, Clock3, Droplets, Heart, Thermometer } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore, useHydrated } from '@/lib/app-store';
import type { Recipe } from '@/app/types';
import RecipeImage from './RecipeImage';

function readableDuration(seconds: number) {
  if (seconds >= 3600) return (seconds / 3600).toLocaleString('ar-SA', { maximumFractionDigits: 1 }) + ' ساعة';
  return Math.round(seconds / 60) + ' د';
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const hydrated = useHydrated();
  const favorites = useAppStore((s) => s.favorites);
  const toggleFavorite = useAppStore((s) => s.toggleFavorite);
  const favorited = hydrated && favorites.includes(recipe.slug);
  const href = '/recipe/' + encodeURIComponent(recipe.slug);
  const handleFavorite = () => {
    toggleFavorite(recipe.slug);
    toast.success(favorited ? 'أُزيلت من المفضلة' : 'أُضيفت إلى المفضلة');
  };

  return (
    <article className="q-recipe-card">
      <div className="q-recipe-cover">
        <Link href={href} aria-label={'عرض وصفة ' + recipe.title} className="block w-full h-full">
          <RecipeImage src={recipe.image_url} alt={recipe.title} />
        </Link>
        <span className="q-recipe-type">{recipe.coffee_type}</span>
        <button type="button" className="q-recipe-heart" aria-label={favorited ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'} aria-pressed={favorited} onClick={handleFavorite}>
          <Heart size={18} fill={favorited ? '#B95D4A' : 'none'} stroke={favorited ? '#B95D4A' : 'currentColor'}/>
        </button>
      </div>
      <div className="q-recipe-body">
        <Link href={href} className="no-underline text-[var(--foreground)] hover:text-[var(--accent)]"><h3>{recipe.title}</h3></Link>
        <p>{recipe.origin_country} · {recipe.roastery}</p>
        <div className="q-recipe-meta">
          <span><Droplets size={15}/>{recipe.water_ml} مل</span>
          <span><Thermometer size={15}/>{recipe.temperature}°</span>
          <span><Clock3 size={15}/>{readableDuration(recipe.brew_time)}</span>
        </div>
        <div className="q-recipe-bottom">
          <div><strong>{recipe.price}</strong><small> ر.س</small></div>
          <Link href={href}>عرض الوصفة <ArrowUpLeft size={17}/></Link>
        </div>
      </div>
    </article>
  );
}
