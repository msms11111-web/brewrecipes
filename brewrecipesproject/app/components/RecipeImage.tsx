'use client';

import { useState } from 'react';
import { Coffee } from 'lucide-react';

// Published images and admin-uploaded media always take precedence. Older bundled
// SVG sample art is replaced with a visual category photo, never presented as a
// photograph of a specific farm, lot, or roastery.
const methodPhotos: { term: string; src: string }[] = [
  { term: 'cold', src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=85' },
  { term: 'espresso', src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85' },
  { term: 'chemex', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85' },
  { term: 'kalita', src: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=900&q=85' },
  { term: 'origami', src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=85' },
  { term: 'v60', src: '/images/qatra-hero.webp' },
];

export default function RecipeImage({ src, alt, className = '', rounded = '' }: { src?: string | null; alt: string; className?: string; rounded?: string }) {
  const isBundled = !src || src.startsWith('/images/recipes/');
  const query = (src ?? '') + ' ' + alt.toLowerCase();
  const chosen = methodPhotos.find(entry=>query.toLowerCase().includes(entry.term))?.src ?? '/images/qatra-hero.webp';
  const [broken, setBroken] = useState(false);
  const image = isBundled ? chosen : src;
  if (broken || !image) return <div className={`w-full h-full flex flex-col justify-center items-center gap-2 ${rounded} bg-[#213C31] text-[#DEC7A5]`} role="img" aria-label={alt}><Coffee size={36}/><span className="text-xs">قَطرة</span></div>;
  return <img src={image} alt={isBundled ? `صورة توضيحية لطريقة التحضير — ${alt}` : alt} loading="lazy" decoding="async" onError={()=>setBroken(true)} className={`w-full h-full object-cover ${className}`}/>;
}
