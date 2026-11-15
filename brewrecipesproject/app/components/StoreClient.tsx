"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, ArrowUpLeft, BookImage, Coffee, Clock3, Filter, Sparkles } from 'lucide-react';
import RecipeCard from './RecipeCard';
import IllustratedRecipeGallery from './IllustratedRecipeGallery';
import type { Recipe } from '@/app/types';

const roastLevels = [
  { key: 'Light', label: 'خفيف' },
  { key: 'Medium', label: 'متوسط' },
  { key: 'Medium-Dark', label: 'متوسط داكن' },
  { key: 'Dark', label: 'داكن' },
];

export default function StoreClient({ recipes, initialType }: { recipes: Recipe[]; initialType: string }) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState(initialType);
  const [roast, setRoast] = useState('');
  const [sort, setSort] = useState('default');
  const methods = useMemo(() => Array.from(new Set(recipes.map(r => r.coffee_type))).filter(Boolean), [recipes]);
  const result = useMemo(() => {
    const q = search.trim().toLocaleLowerCase();
    const values = recipes.filter(r =>
      (!type || r.coffee_type === type) &&
      (!roast || r.roast_level === roast) &&
      (!q || [r.title, r.origin_country, r.roastery, r.description].some(value => (value || '').toLocaleLowerCase().includes(q)))
    );
    if (sort === 'price-asc') values.sort((a,b) => a.price - b.price);
    if (sort === 'price-desc') values.sort((a,b) => b.price - a.price);
    if (sort === 'time-asc') values.sort((a,b) => a.brew_time - b.brew_time);
    return values;
  }, [recipes, search, type, roast, sort]);

  const clear = () => { setSearch(''); setType(''); setRoast(''); setSort('default'); };
  const filtersActive = Boolean(search || type || roast || sort !== 'default');

  return (
    <div className="sg-store">
      <header className="sg-store-hero">
        <div className="sg-store-hero-photo" aria-hidden="true" />
        <div className="sg-store-hero-shade" aria-hidden="true" />
        <div className="sg-container sg-store-hero-content">
          <div className="sg-eyebrow sg-store-eyebrow">THE BREW LIBRARY / QATRA</div>
          <h1>لكل محصول حكاية.<br /><em>ولكل كوب طريقته.</em></h1>
          <p>اكتشف وصفات التحضير بالمقادير الدقيقة، أو انتقل إلى البطاقات المصوّرة. كل شيء مرتب لتصل إلى وصفتك بسهولة.</p>
          <div className="sg-store-hero-actions">
            <a className="sg-button sg-button-gold" href="#sg-discover"><Search size={17}/> ابحث عن وصفة</a>
            <a className="sg-button sg-button-outline" href="#sg-illustrated"><BookImage size={17}/> الوصفات المصوّرة</a>
          </div>
          <div className="sg-store-counters"><span><Coffee size={17}/><strong>{recipes.length}</strong> وصفة في المكتبة</span><span><Sparkles size={17}/><strong>{methods.length}</strong> طرق تحضير</span></div>
        </div>
      </header>

      <section className="sg-discover" id="sg-discover" aria-label="البحث في مكتبة الوصفات">
        <div className="sg-container">
          <div className="sg-discover-heading">
            <div><span className="sg-eyebrow">FIND YOUR RITUAL</span><h2>اختَر وصفتك القادمة.</h2><p>فلتر بنوع الأداة أو درجة التحميص، أو اكتب اسم المحصول والمحمصة.</p></div>
            <div className="sg-sort">
              <span>{result.length} نتيجة</span>
              <label htmlFor="sg-recipe-sort">الترتيب</label>
              <select id="sg-recipe-sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">الافتراضي</option>
                <option value="price-asc">الأقل سعرًا</option>
                <option value="price-desc">الأعلى سعرًا</option>
                <option value="time-asc">الأسرع تحضيرًا</option>
              </select>
            </div>
          </div>

          <div className="sg-filter-panel">
            <div className="sg-search-input">
              <Search size={21} aria-hidden="true"/>
              <input type="search" aria-label="ابحث في الوصفات" value={search} onChange={e=>setSearch(e.target.value)} placeholder="اسم البن، المحمصة، بلد المنشأ..." />
              {search && <button type="button" aria-label="مسح البحث" onClick={()=>setSearch('')}><X size={17}/></button>}
            </div>
            <div className="sg-filter-group">
              <span className="sg-filter-caption"><Filter size={15}/> طريقة التحضير</span>
              <div className="sg-chip-row">
                <button type="button" className={!type?'sg-chip sg-chip-active':'sg-chip'} onClick={()=>setType('')} aria-pressed={!type}>كل الطرق</button>
                {methods.map(m=><button key={m} type="button" className={type===m?'sg-chip sg-chip-active':'sg-chip'} onClick={()=>setType(type===m?'':m)} aria-pressed={type===m}>{m}</button>)}
              </div>
            </div>
            <div className="sg-filter-group sg-filter-last">
              <span className="sg-filter-caption"><SlidersHorizontal size={15}/> درجة التحميص</span>
              <div className="sg-chip-row">
                {roastLevels.map(r=><button key={r.key} type="button" className={roast===r.key?'sg-chip sg-chip-active':'sg-chip'} onClick={()=>setRoast(roast===r.key?'':r.key)} aria-pressed={roast===r.key}>{r.label}</button>)}
              </div>
              {filtersActive && <button className="sg-reset-filters" type="button" onClick={clear}><X size={15}/> تصفير التصفية</button>}
            </div>
          </div>

          {result.length ? <div className="sg-library-grid">{result.map(recipe => <RecipeCard key={recipe.id} recipe={recipe}/>)}</div> :
            <div className="sg-library-empty"><Coffee size={35} strokeWidth={1}/><h3>ما لقينا وصفة بهذه المواصفات.</h3><p>غيّر أحد خيارات البحث أو اعرض المجموعة كاملة.</p><button onClick={clear} type="button" className="sg-button sg-button-gold">عرض جميع الوصفات <ArrowUpLeft size={16}/></button></div>}
        </div>
      </section>

      <div id="sg-illustrated" className="sg-archive-anchor"><IllustratedRecipeGallery compact /></div>
      <div className="sg-library-outro"><div className="sg-container"><div><span className="sg-eyebrow">LEARN / BREW / REFINE</span><h2>كل وصفة بداية لاكتشاف جديد.</h2></div><Link className="sg-button sg-button-gold" href="/academy">ادخل أكاديمية قَطرة <ArrowUpLeft size={17}/></Link></div></div>
    </div>
  );
}
