"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpLeft, BookOpen, Coffee, Droplets, FlaskConical, MoveUpRight, Waves } from 'lucide-react';
import type { Recipe } from '@/app/types';
import RecipeCard from './RecipeCard';
import MethodIllustration from './MethodIllustration';

const methods = [
  { name: 'V60', ar: 'التقطير المخروطي', no: '01' },
  { name: 'Chemex', ar: 'قوام ناعم وصفاء', no: '02' },
  { name: 'Kalita Wave', ar: 'استخلاص متوازن', no: '03' },
  { name: 'Origami', ar: 'مساحة للتجربة', no: '04' },
  { name: 'Espresso', ar: 'نكهة مكثفة', no: '05' },
  { name: 'Cold Brew', ar: 'قهوة باردة', no: '06' },
];

export default function HomeClient({ featuredRecipes, allRecipes }: { featuredRecipes: Recipe[]; allRecipes: Recipe[] }) {
  const [grams, setGrams] = useState(20);
  const [ratio, setRatio] = useState(15);
  const water = useMemo(() => grams * ratio, [grams, ratio]);
  const count = allRecipes.length;

  return (
    <div className="ed-home">
      <section className="ed-hero" aria-labelledby="ed-title">
        <div className="ed-hero-photo" role="img" aria-label="تحضير قهوة V60 بإبريق زجاجي وتقطير الماء" />
        <div className="ed-hero-vignette" aria-hidden="true" />
        <div className="ed-shell ed-hero-shell">
          <div className="ed-hero-copy">
            <div className="ed-kicker"><span className="ed-kicker-line" /> QATRA / قَطرة</div>
            <h1 id="ed-title">قهوة أدق.<br /><em>وتجربة أعمق.</em></h1>
            <p>وصفات للقهوة المختصة، مشروحة بالصور والمقادير خطوة بخطوة. اكتشف طريقة تحضيرك، واضبط كل تفصيلة في كوبك.</p>
            <div className="ed-hero-actions">
              <Link className="ed-button ed-button-gold" href="/store">استكشف الوصفات <ArrowUpLeft size={18}/></Link>
              <Link className="ed-button ed-button-ghost" href="/xbloom">وصفات xBloom <MoveUpRight size={17}/></Link>
            </div>
            <div className="ed-hero-footnote"><span className="ed-hero-stroke"/>من البن إلى آخر قطرة</div>
          </div>
        </div>
        <div className="ed-hero-edge" aria-hidden="true"><span>THE ART OF BREWING</span><span>01 / 2026</span></div>
      </section>

      <section className="ed-methods" aria-labelledby="ed-methods-title">
        <div className="ed-shell">
          <div className="ed-row-header"><div><span className="ed-tag">01 — اختر أداتك</span><h2 id="ed-methods-title">لكل أداة أسلوبها.</h2></div><Link href="/store" className="ed-plain-link">جميع الطرق <ArrowUpLeft size={17}/></Link></div>
          <div className="ed-methods-track">
            {methods.map((m) => <Link key={m.name} href={'/store?type=' + encodeURIComponent(m.name)} className="ed-method">
              <div className="ed-method-art"><MethodIllustration method={m.name}/></div>
              <div className="ed-method-detail"><small>{m.no}</small><strong dir="auto">{m.name}</strong><span>{m.ar}</span></div>
              <ArrowUpLeft className="ed-method-arrow" size={16}/>
            </Link>)}
          </div>
        </div>
      </section>

      <section className="ed-picks" aria-labelledby="ed-picks-title">
        <div className="ed-shell">
          <div className="ed-picks-head"><div><span className="ed-tag">02 — من المكتبة</span><h2 id="ed-picks-title">وصفات اخترناها لك.</h2><p>مقادير واضحة، خطوات مرتبة، وتفاصيل تساعدك تضبط النكهة.</p></div><Link href="/store" className="ed-plain-link">تصفح {count} وصفات <ArrowUpLeft size={17}/></Link></div>
          {featuredRecipes.length ? <div className="ed-cards">{featuredRecipes.map((recipe, i) => <div key={recipe.id} className={'ed-card-outer ed-card-' + i}><RecipeCard recipe={recipe}/></div>)}</div> : <div className="ed-blank">ما فيه وصفات منشورة حاليًا.</div>}
        </div>
      </section>

      <section className="ed-spotlight" aria-labelledby="ed-spot-title">
        <div className="ed-shell ed-spot-grid">
          <div className="ed-spot-photo"><img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85" alt="جلسة قهوة وتفاصيل تحضير على طاولة" loading="lazy"/><div className="ed-photo-caption">قَطرة — دليل القهوة المختصة</div></div>
          <div className="ed-spot-text"><span className="ed-tag">03 — الفكرة وراء الوصفة</span><h2 id="ed-spot-title">مو مجرد أرقام.<br /><i>هذه حكاية كل كوب.</i></h2><p>الطحن، الماء، ووقت الاستخلاص عناصر مترابطة. بدل ما تحفظ خطوات فقط، افهم كيف تغيّرها لتوصل للنكهة اللي تفضلها.</p>
            <div className="ed-insights"><div><Coffee size={21}/><span>الطحن</span><small>يؤثر على سرعة مرور الماء</small></div><div><Droplets size={21}/><span>النسبة</span><small>تضبط قوة الكوب وتركيزه</small></div><div><Waves size={21}/><span>الصب</span><small>يحدد نمط الاستخلاص</small></div></div>
            <Link href="/academy" className="ed-text-cta">تعمّق في الأكاديمية <ArrowUpLeft size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="ed-lab" aria-labelledby="ed-lab-title"><div className="ed-shell ed-lab-grid">
        <div className="ed-lab-copy"><span className="ed-tag ed-tag-light">04 — مختبر التقطير</span><h2 id="ed-lab-title">جرّب النسبة.<br /><em>وشاهد الفرق.</em></h2><p>مثال تفاعلي لحساب الماء مقابل كمية البن. القيم التعليمية هنا ليست بديلًا عن مقادير الوصفة الفعلية.</p><Link href="/store" className="ed-button ed-button-outline">اختر وصفة للتحضير <ArrowUpLeft size={17}/></Link></div>
        <div className="ed-lab-panel"><div className="ed-lab-bar"><span>حاسبة سريعة</span><FlaskConical size={23}/></div>
          <div className="ed-lab-top"><label htmlFor="ed-grind">كمية البن</label><strong>{grams} <small>جم</small></strong></div>
          <input id="ed-grind" type="range" min="10" max="40" step="1" value={grams} onChange={(e)=>setGrams(Number(e.target.value))} aria-label="كمية البن بالجرام"/>
          <div className="ed-lab-ratio"><label htmlFor="ed-ratio">نسبة الماء إلى البن</label><select id="ed-ratio" value={ratio} onChange={e=>setRatio(Number(e.target.value))}><option value={14}>1:14</option><option value={15}>1:15</option><option value={16}>1:16</option><option value={17}>1:17</option><option value={18}>1:18</option></select></div>
          <div className="ed-lab-result"><div><small>الماء المطلوب</small><strong>{water}</strong><span>مل</span></div><div className="ed-lab-drops" aria-hidden="true"><Droplets size={42} strokeWidth={1.25}/></div></div>
          <p className="ed-lab-caveat">الوقت والطحن يتغيران حسب الأداة والبن، ولا يُحسبان خطيًا.</p>
        </div>
      </div></section>

      <section className="ed-end" aria-labelledby="ed-end-title"><div className="ed-shell ed-end-inner"><div><span className="ed-tag">من المعرفة إلى الممارسة</span><h2 id="ed-end-title">ابدأ بكوب، وتعلّم مع كل صبّة.</h2><p>استكشف الوصفات أو جرّب دليل xBloom، وخلّ التجربة أبسط.</p></div><div className="ed-end-links"><Link className="ed-button ed-button-dark" href="/store">الوصفات <ArrowUpLeft size={18}/></Link><Link className="ed-button ed-button-light" href="/academy">الأكاديمية <BookOpen size={18}/></Link></div></div></section>
    </div>
  );
}
