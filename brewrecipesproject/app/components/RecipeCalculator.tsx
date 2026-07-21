"use client";

import React, { useState } from 'react';

interface RecipeCalculatorProps {
  initialCoffeeGrams: number;
  initialWaterMl: number;
  initialBrewTime: number;
}

export default function RecipeCalculator({ 
  initialCoffeeGrams, 
  initialWaterMl, 
  initialBrewTime 
}: RecipeCalculatorProps) {
  const [coffeeGrams, setCoffeeGrams] = useState(initialCoffeeGrams);
  
  const waterRatio = initialWaterMl / initialCoffeeGrams;
  const calculatedWater = Math.round(coffeeGrams * waterRatio);
  const calculatedTime = Math.round((initialBrewTime / initialCoffeeGrams) * coffeeGrams);

  return (
    <div className="calculator p-7 rounded-3xl border border-[var(--border)]">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-bold tracking-tight">حاسبة الوصفة الذكية</h3>
      </div>
      <p className="text-xs text-[var(--muted-foreground)] mb-6">
        غيّر كمية البن وسيتم تحديث كمية الماء والوقت تلقائياً
      </p>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>كمية البن</span>
          <span className="font-mono font-bold text-lg tabular-nums">{coffeeGrams} <span className="text-xs">جرام</span></span>
        </div>
        <input 
          type="range" 
          min="8" 
          max="35" 
          step="1"
          value={coffeeGrams} 
          onChange={(e) => setCoffeeGrams(parseInt(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <div className="flex justify-between text-[10px] text-[var(--foreground)]/50 mt-1">
          <span>8g</span>
          <span>35g</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--card)] rounded-2xl p-5 text-center border border-[var(--border)]">
          <div className="text-[var(--accent)] text-xs tracking-widest mb-1">الماء</div>
          <div className="text-4xl font-bold tabular-nums tracking-tighter text-[var(--foreground)]">
            {calculatedWater}
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">مل</div>
        </div>
        
        <div className="bg-[var(--card)] rounded-2xl p-5 text-center border border-[var(--border)]">
          <div className="text-[var(--accent)] text-xs tracking-widest mb-1">وقت الاستخلاص</div>
          <div className="text-4xl font-bold tabular-nums tracking-tighter text-[var(--foreground)]">
            {calculatedTime}
          </div>
          <div className="text-xs text-[var(--muted-foreground)]">ثانية</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-[var(--muted-foreground)]">
          النسبة الأصلية: 1 : {waterRatio.toFixed(1)}
        </p>
      </div>
    </div>
  );
}
