"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Recipe } from '@/app/types';

const pillars = [
  { letter: 'ط', title: 'الطحن', text: 'حجم حبيبات متجانس يحدد سرعة التصريف وتوازن النكهة في الكوب.' },
  { letter: 'ح', title: 'الحرارة', text: 'بين 92 و96 درجة مئوية — أقل يعطي حموضة زائدة، وأعلى يعطي مرارة.' },
  { letter: 'و', title: 'الوقت', text: 'ضبط زمن تصريف الماء يوازن بين الحلاوة والحموضة والمرارة.' },
];

const dripDots = [0, 1, 2, 3, 4, 5].map((i) => ({ dur: 2.4 + (i % 3) * 0.4, delay: i * 0.7 }));
const dripDotsShort = [0, 1, 2].map((i) => ({ dur: 1.8 + i * 0.3, delay: i * 0.9 }));

const GALLERY_PAGE_SIZE = 8;

function formatBrewTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m} دقائق` : `${m}:${s.toString().padStart(2, '0')} دقيقة`;
}

function RecipeImage({ recipe, className }: { recipe: Recipe; className?: string }) {
  if (recipe.image_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={recipe.image_url} alt={recipe.title} className={`w-full h-full object-cover ${className ?? ''}`} />
    );
  }
  return (
    <div className={`img-placeholder w-full h-full flex items-center justify-center ${className ?? ''}`}>
      <span className="font-mono text-[11px] text-[oklch(45%_0.02_55)] text-center p-2.5">[{recipe.title}]</span>
    </div>
  );
}

interface HomeClientProps {
  featuredRecipes: Recipe[];
  allRecipes: Recipe[];
}

export default function HomeClient({ featuredRecipes, allRecipes }: HomeClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [layout, setLayout] = useState<'cards' | 'list'>('cards');
  const [galleryPage, setGalleryPage] = useState(1);

  const activeRecipe = featuredRecipes[Math.min(activeIndex, featuredRecipes.length - 1)];

  const galleryPages = Math.max(1, Math.ceil(allRecipes.length / GALLERY_PAGE_SIZE));
  const galleryItems = useMemo(
    () => allRecipes.slice((galleryPage - 1) * GALLERY_PAGE_SIZE, galleryPage * GALLERY_PAGE_SIZE),
    [allRecipes, galleryPage],
  );

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--panel-dark)] text-[var(--panel-dark-foreground)] px-6 md:px-14 pt-24 pb-28 md:pt-[100px] md:pb-[120px]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 20% 30%, oklch(35% 0.06 50 / 0.55), transparent 60%), radial-gradient(ellipse at 85% 75%, oklch(30% 0.05 55 / 0.45), transparent 55%)',
          }}
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, oklch(20% 0.02 50 / 0.96) 30%, oklch(20% 0.02 50 / 0.72) 60%, oklch(20% 0.02 50 / 0.35) 100%)',
          }}
        />

        {/* Drip line + falling drops */}
        <div className="drip-line absolute start-8 md:start-16 top-0 bottom-0 w-[2px] opacity-60 z-[2] pointer-events-none" />
        {dripDots.map((d, i) => (
          <div
            key={i}
            className="absolute start-[27px] md:start-[59px] -top-2.5 w-3 h-3 rounded-full bg-[var(--accent)] z-[2] pointer-events-none"
            style={{ animation: `dripFall ${d.dur}s linear infinite`, animationDelay: `${d.delay}s` }}
          />
        ))}

        <div className="relative z-[3] max-w-6xl mx-auto md:grid md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:items-center">
          <div className="ps-8 md:ps-16">
            <span className="inline-block text-[13px] tracking-wide text-[var(--accent)] font-bold mb-4 border border-[oklch(60%_0.02_70_/_0.4)] px-3.5 py-1.5 rounded-full">
              القهوة المقطرة يدويًا
            </span>
            <h1 className="font-heading font-black text-4xl md:text-[58px] leading-[1.15] mb-5">
              استخلاص
              <br />
              كل قطرة نكهة
            </h1>
            <p className="text-base md:text-lg leading-[1.9] text-[oklch(85%_0.015_70)] max-w-[480px] mb-8">
              وصفات دقيقة للقهوة المقطرة — V60، كيميكس، وكاليتا ويف — بأوزان وحرارة وتوقيت مضبوط لكل صبة، لكوب متوازن في كل مرة.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#recipes"
                className="bg-[var(--accent)] text-[oklch(99%_0.005_70)] px-7 py-[15px] rounded-[10px] no-underline font-extrabold text-base hover:opacity-90 transition-opacity"
              >
                استعرض الوصفات
              </a>
              <a
                href="#guide"
                className="text-[oklch(92%_0.01_70)] no-underline font-semibold text-[15px] border-b border-[oklch(60%_0.02_70_/_0.5)] pb-0.5 hover:text-[var(--accent)] transition-colors"
              >
                تعلّم أساسيات القطر
              </a>
            </div>
            <div className="flex flex-wrap gap-8 md:gap-10 mt-12 md:mt-14">
              <div>
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-[var(--accent)]">92–96°</div>
                <div className="text-[13px] text-[oklch(75%_0.015_70)]">درجة حرارة الماء المثالية</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-[var(--accent)]">1:16</div>
                <div className="text-[13px] text-[oklch(75%_0.015_70)]">نسبة القهوة إلى الماء</div>
              </div>
              <div>
                <div className="font-heading text-2xl md:text-3xl font-extrabold text-[var(--accent)]">3 دقائق</div>
                <div className="text-[13px] text-[oklch(75%_0.015_70)]">متوسط زمن التقطير</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </section>

      {/* Guide pillars */}
      <section id="guide" className="max-w-7xl mx-auto px-6 md:px-14 py-20 md:py-[110px] grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p) => (
          <div key={p.title} className="p-8 md:px-[30px] md:py-9 bg-[var(--card)] border border-[var(--border)] rounded-[18px]">
            <div className="w-[52px] h-[52px] rounded-full bg-[var(--accent)] text-[oklch(99%_0.005_70)] flex items-center justify-center font-heading font-black text-xl mb-5">
              {p.letter}
            </div>
            <h3 className="font-heading font-extrabold text-[22px] mb-2.5">{p.title}</h3>
            <p className="text-[15px] leading-[1.8] text-[var(--muted-foreground)] m-0">{p.text}</p>
          </div>
        ))}
      </section>

      {/* Recipes */}
      <section id="recipes" className="max-w-7xl mx-auto px-6 md:px-14 pb-20 md:pb-[110px]">
        <div className="flex flex-wrap gap-4 items-baseline justify-between mb-10">
          <div>
            <span className="text-[var(--accent)] font-bold text-[13px]">
              {String(featuredRecipes.length).padStart(2, '0')} طرق مختارة
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl mt-1.5">وصفات القهوة المقطرة</h2>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => setLayout('cards')}
              className="px-[18px] py-[9px] rounded-lg text-[13.5px] font-bold cursor-pointer border transition-colors"
              style={
                layout === 'cards'
                  ? { borderColor: 'var(--accent)', background: 'var(--accent)', color: 'oklch(99% 0.005 70)' }
                  : { borderColor: 'var(--border)', background: 'transparent', color: 'var(--foreground)' }
              }
            >
              كروت
            </button>
            <button
              onClick={() => setLayout('list')}
              className="px-[18px] py-[9px] rounded-lg text-[13.5px] font-bold cursor-pointer border transition-colors"
              style={
                layout === 'list'
                  ? { borderColor: 'var(--accent)', background: 'var(--accent)', color: 'oklch(99% 0.005 70)' }
                  : { borderColor: 'var(--border)', background: 'transparent', color: 'var(--foreground)' }
              }
            >
              قائمة
            </button>
          </div>
        </div>

        <div className={layout === 'cards' ? 'grid grid-cols-1 md:grid-cols-3 gap-7' : 'flex flex-col gap-[18px]'}>
          {featuredRecipes.map((r, i) => (
            <div
              key={r.id}
              onClick={() => setActiveIndex(i)}
              className={`cursor-pointer bg-[var(--card)] rounded-[18px] p-5 border-2 transition-colors ${
                layout === 'cards' ? 'flex flex-col' : 'flex flex-col sm:flex-row gap-6 sm:items-center'
              }`}
              style={{ borderColor: i === activeIndex ? 'var(--accent)' : 'var(--border)' }}
            >
              <div
                className="rounded-[14px] overflow-hidden shrink-0 min-w-[160px] mb-[18px] sm:mb-0"
                style={{ aspectRatio: layout === 'cards' ? '4/3' : '16/9', marginBottom: layout === 'cards' ? 18 : undefined }}
              >
                <RecipeImage recipe={r} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <h3 className="font-heading font-extrabold text-[21px] m-0">{r.title}</h3>
                  <span className="text-xs font-bold text-[var(--accent)] whitespace-nowrap">{formatBrewTime(r.brew_time)}</span>
                </div>
                <p className="text-sm text-[var(--muted-foreground)] leading-[1.7] mb-3.5 line-clamp-2">{r.description}</p>
                <div className="flex flex-wrap gap-4 text-[12.5px]">
                  <span>☕ {r.coffee_grams}غ</span>
                  <span>💧 {r.water_ml}مل</span>
                  <span>🌡 {r.temperature}°م</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My recipes gallery */}
      <section id="gallery" className="max-w-7xl mx-auto px-6 md:px-14 pb-20 md:pb-[110px]">
        <div className="flex flex-wrap gap-4 items-baseline justify-between mb-9">
          <div>
            <span className="text-[var(--accent)] font-bold text-[13px]">معرض الوصفات</span>
            <h2 className="font-heading font-black text-3xl md:text-4xl mt-1.5">وصفاتي المصوّرة</h2>
          </div>
          <span className="text-[13.5px] text-[var(--muted-foreground)] font-medium">
            صفحة {galleryPage} من {galleryPages}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((r) => (
            <Link
              key={r.id}
              href={`/recipe/${r.slug}`}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-3.5 flex flex-col gap-3 no-underline text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
            >
              <div className="aspect-square rounded-xl overflow-hidden">
                <RecipeImage recipe={r} />
              </div>
              <h4 className="font-heading font-extrabold text-[17px] m-0">{r.title}</h4>
              <p className="text-[13.5px] leading-[1.7] text-[var(--muted-foreground)] m-0 line-clamp-3">{r.description}</p>
            </Link>
          ))}
        </div>

        {galleryPages > 1 && (
          <div className="flex justify-center gap-2.5 mt-10">
            {Array.from({ length: galleryPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setGalleryPage(p)}
                className="w-[42px] h-[42px] rounded-[10px] text-[15px] font-extrabold cursor-pointer font-heading border transition-colors"
                style={
                  galleryPage === p
                    ? { borderColor: 'var(--accent)', background: 'var(--accent)', color: 'oklch(99% 0.005 70)' }
                    : { borderColor: 'var(--border)', background: 'transparent', color: 'var(--foreground)' }
                }
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Featured recipe detail */}
      {activeRecipe && (
        <section id="detail" className="max-w-7xl mx-auto px-6 md:px-14 pb-24 md:pb-[120px]">
          <div className="bg-[var(--panel-dark)] rounded-[28px] p-8 md:p-16 text-[var(--panel-dark-foreground)] grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">
            <div>
              <span className="text-[var(--accent)] font-bold text-[13px]">وصفة مُفصّلة</span>
              <h2 className="font-heading font-black text-3xl md:text-[38px] mt-2.5 mb-5">{activeRecipe.title}</h2>
              <p className="text-[15.5px] leading-[1.9] text-[oklch(82%_0.015_70)] mb-7">{activeRecipe.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-7">
                <div className="bg-[var(--panel-dark-soft)] rounded-xl p-4">
                  <div className="text-xs text-[oklch(70%_0.015_70)]">القهوة</div>
                  <div className="font-heading font-extrabold text-[19px]">{activeRecipe.coffee_grams}غ</div>
                </div>
                <div className="bg-[var(--panel-dark-soft)] rounded-xl p-4">
                  <div className="text-xs text-[oklch(70%_0.015_70)]">الماء</div>
                  <div className="font-heading font-extrabold text-[19px]">{activeRecipe.water_ml}مل</div>
                </div>
                <div className="bg-[var(--panel-dark-soft)] rounded-xl p-4">
                  <div className="text-xs text-[oklch(70%_0.015_70)]">الحرارة</div>
                  <div className="font-heading font-extrabold text-[19px]">{activeRecipe.temperature}°م</div>
                </div>
                <div className="bg-[var(--panel-dark-soft)] rounded-xl p-4">
                  <div className="text-xs text-[oklch(70%_0.015_70)]">الطحن</div>
                  <div className="font-heading font-extrabold text-[19px]">{activeRecipe.grind_size}</div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <RecipeImage recipe={activeRecipe} />
              </div>
              <Link
                href={`/recipe/${activeRecipe.slug}`}
                className="inline-block mt-6 text-[var(--accent)] font-bold text-[14.5px] no-underline border-b border-[var(--accent)] pb-0.5"
              >
                عرض الوصفة كاملة
              </Link>
            </div>

            <div className="relative ps-[46px]">
              <div
                className="absolute start-[15px] top-2 bottom-2 w-[2px]"
                style={{
                  background: 'repeating-linear-gradient(to bottom, oklch(55% 0.02 60 / 0.6) 0 6px, transparent 6px 14px)',
                }}
              />
              {dripDotsShort.map((d, i) => (
                <div
                  key={i}
                  className="absolute start-[10px] -top-1.5 w-3 h-3 rounded-full bg-[var(--accent)]"
                  style={{ animation: `dripFallShort ${d.dur}s linear infinite`, animationDelay: `${d.delay}s` }}
                />
              ))}
              {activeRecipe.steps.map((step, i) => (
                <div key={i} className="relative mb-8 z-[1]">
                  <div className="absolute -start-[46px] top-0 w-8 h-8 rounded-full bg-[var(--accent)] text-[oklch(99%_0.005_70)] flex items-center justify-center font-extrabold text-sm font-heading">
                    {i + 1}
                  </div>
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <h4 className="font-heading font-extrabold text-lg m-0">الخطوة {i + 1}</h4>
                  </div>
                  <p className="text-[14.5px] leading-[1.8] text-[oklch(80%_0.015_70)] m-0">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
