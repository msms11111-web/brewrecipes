"use client";

import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, ArrowUpLeft } from 'lucide-react';
import Link from 'next/link';
import RecipeCard from './RecipeCard';
import IllustratedRecipeGallery from './IllustratedRecipeGallery';
import type { Recipe } from '@/app/types';

const roastLevels = [
  {key:'Light',label:'خفيف'},
  {key:'Medium',label:'متوسط'},
  {key:'Medium-Dark',label:'متوسط داكن'},
  {key:'Dark',label:'داكن'},
];
export default function StoreClient({ recipes, initialType }: { recipes: Recipe[]; initialType: string }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState(initialType);
  const [roast, setRoast] = useState('');
  const [sort, setSort] = useState('default');
  const methods = useMemo(() => Array.from(new Set(recipes.map(r => r.coffee_type))), [recipes]);
  const result = useMemo(() => {
    const q = search.trim().toLocaleLowerCase();
    const values = recipes.filter(r => (!type || r.coffee_type === type) && (!roast || r.roast_level === roast) && (!q || [r.title, r.origin_country, r.roastery, r.description].some(field => field.toLocaleLowerCase().includes(q))));
    if (sort === 'price-asc') values.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') values.sort((a,b) => b.price - a.price);
    if (sort === 'time-asc') values.sort((a,b) => a.brew_time - b.brew_time);
    return values;
  }, [recipes, search, type, roast, sort]);
  const clear = () => { setSearch(''); setType(''); setRoast(''); };
  return <>
    <section className="q-academy-hero"><div className="q-wrap"><span className="q-overline q-overline-light">مكتبة قَطرة</span><h1>الوصفة المناسبة،<br/>تبدأ من هنا.</h1><p>استكشف الوصفات حسب الأداة، بلد المنشأ أو درجة التحميص، ثم ادخل لتفاصيل التحضير خطوة بخطوة.</p></div></section>
    <IllustratedRecipeGallery compact />
    <section className="q-section"><div className="q-wrap">
      <div className="flex gap-3 items-start md:items-center flex-col md:flex-row justify-between mb-7">
        <div><span className="q-overline"><SlidersHorizontal size={15}/> خيارات التصفية</span><h2 className="text-2xl font-black mt-2">استكشف المجموعة</h2></div>
        <div className="flex items-center gap-3"><span className="text-sm text-[var(--muted-foreground)]">{result.length} وصفة</span><select aria-label="ترتيب الوصفات" className="input py-2 text-sm" value={sort} onChange={e => setSort(e.target.value)}><option value="default">الترتيب الافتراضي</option><option value="price-asc">الأقل سعرًا</option><option value="price-desc">الأعلى سعرًا</option><option value="time-asc">الأسرع تحضيرًا</option></select></div>
      </div>
      <div className="relative mb-5"><Search size={19} className="absolute top-1/2 right-4 -translate-y-1/2 text-[var(--muted-foreground)]"/><input type="search" aria-label="البحث في الوصفات" placeholder="اسم البن، الأداة، المحمصة أو بلد المنشأ..." value={search} onChange={e=>setSearch(e.target.value)} className="input pr-12 text-base w-full"/></div>
      <div className="flex flex-wrap gap-2 mb-3"><button type="button" onClick={() => setType('')} className={'filter-chip '+(!type?'active':'')}>جميع الطرق</button>{methods.map(x=><button type="button" key={x} onClick={()=>setType(type===x?'':x)} className={'filter-chip '+(type===x?'active':'')}>{x}</button>)}</div>
      <div className="flex items-center gap-2 flex-wrap mb-9"><span className="text-xs text-[var(--muted-foreground)] ml-2">التحميص</span>{roastLevels.map(x=><button type="button" key={x.key} onClick={()=>setRoast(roast===x.key?'':x.key)} className={'filter-chip '+(roast===x.key?'active':'')}>{x.label}</button>)}{(type||roast||search)&&<button type="button" className="text-sm text-[var(--accent)] inline-flex items-center gap-1 mr-3 underline" onClick={clear}><X size={14}/> مسح الفلاتر</button>}</div>
      {result.length?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{result.map(recipe=><RecipeCard key={recipe.id} recipe={recipe}/>)}</div>:<div className="q-empty"><p className="mb-3">ما لقينا وصفات مطابقة لهذه الخيارات.</p><button type="button" className="q-inline-link" onClick={clear}>عرض جميع الوصفات <ArrowUpLeft size={16}/></button></div>}
      <div className="mt-12 text-center"><Link href="/academy" className="q-inline-link">احتجت مساعدة في التحضير؟ تعرّف على الأساسيات <ArrowUpLeft size={16}/></Link></div>
    </div></section>
  </>;
}
