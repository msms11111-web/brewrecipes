"use client";

import { useState } from 'react';
import { Droplets, Coffee, Clock3 } from 'lucide-react';

interface RecipeCalculatorProps {
  initialCoffeeGrams: number;
  initialWaterMl: number;
  initialBrewTime: number;
}
function formatTime(seconds: number) {
  if (seconds >= 3600) return (seconds / 3600).toLocaleString('ar-SA', { maximumFractionDigits: 1 }) + ' ساعة';
  return (seconds / 60).toLocaleString('ar-SA', { maximumFractionDigits: 1 }) + ' دقيقة';
}
export default function RecipeCalculator({ initialCoffeeGrams, initialWaterMl, initialBrewTime }: RecipeCalculatorProps) {
  const safeGrams = initialCoffeeGrams > 0 ? initialCoffeeGrams : 15;
  const [coffeeGrams, setCoffeeGrams] = useState(safeGrams);
  const low = Math.min(8, safeGrams);
  const high = Math.max(35, safeGrams * 2);
  const ratio = initialWaterMl / safeGrams;
  const water = Math.round(coffeeGrams * ratio);
  return (
    <section className="calculator p-6 rounded-3xl border border-[var(--border)]" aria-labelledby="recipe-calculator-title">
      <h3 id="recipe-calculator-title" className="font-heading font-black text-xl mb-2">حاسبة المقادير</h3>
      <p className="text-sm text-[var(--muted-foreground)] leading-7 mb-6">اضبط كمية البن، وتتغيّر كمية الماء حسب نسبة هذه الوصفة.</p>
      <div className="flex justify-between gap-4 items-center mb-3"><label htmlFor="coffee-grams" className="flex gap-2 items-center"><Coffee size={17}/> البن</label><strong>{coffeeGrams} جرام</strong></div>
      <input id="coffee-grams" type="range" min={low} max={high} step="1" value={coffeeGrams} onChange={(e) => setCoffeeGrams(Number(e.target.value))} className="w-full accent-[var(--accent)]"/>
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4"><Droplets className="mb-3 text-[var(--accent)]" size={21}/><span className="block text-xs text-[var(--muted-foreground)]">الماء</span><strong className="text-3xl tabular-nums">{water}</strong><span className="text-xs"> مل</span></div>
        <div className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-4"><Clock3 className="mb-3 text-[var(--accent)]" size={21}/><span className="block text-xs text-[var(--muted-foreground)]">زمن الوصفة الأصلي</span><strong className="block text-lg">{formatTime(initialBrewTime)}</strong></div>
      </div>
      <p className="text-xs text-[var(--muted-foreground)] leading-6 mt-4">النسبة الأصلية 1:{ratio.toFixed(1)}. الزمن تقديري للكمية الأصلية؛ لا يزيد آليًا بنفس نسبة زيادة البن، ويحتاج ضبطًا بحسب الطحن والأداة.</p>
    </section>
  );
}
