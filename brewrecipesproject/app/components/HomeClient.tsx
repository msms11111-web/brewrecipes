"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowUpLeft, Coffee, Droplets, Thermometer, Clock3, FlaskConical, Sparkles, BookOpen, CirclePlay, Check, SlidersHorizontal } from 'lucide-react';
import type { Recipe } from '@/app/types';
import BrewIllustration from './BrewIllustration';
import RecipeCard from './RecipeCard';
import MethodIllustration from './MethodIllustration';

const tools = [
  { label: 'V60', subtitle: 'استخلاص نظيف ومتوازن', icon: '01' },
  { label: 'Espresso', subtitle: 'كثافة ونكهة مركزة', icon: '02' },
  { label: 'Chemex', subtitle: 'صفاء وأناقة في الكوب', icon: '03' },
  { label: 'Kalita Wave', subtitle: 'ثبات أعلى في التقطير', icon: '04' },
  { label: 'Origami', subtitle: 'مرونة وتجارب مختلفة', icon: '05' },
  { label: 'Cold Brew', subtitle: 'تحضير بارد وناعم', icon: '06' },
];

const lessons = [
  { n: '01', label: 'الطحن', detail: 'درجة الطحن تؤثر على سرعة مرور الماء؛ ابدأ بوصفة واضحة ثم عدّل حسب التذوق.', icon: SlidersHorizontal },
  { n: '02', label: 'حرارة الماء', detail: 'تتغير الحرارة المناسبة حسب البن والتحميص وطريقة التحضير؛ لا توجد درجة واحدة تناسب الجميع.', icon: Thermometer },
  { n: '03', label: 'الوقت والصب', detail: 'التوقيت وتوزيع الصب يؤثران على الاستخلاص. اتبع الخطوات ثم سجّل النتيجة.', icon: Clock3 },
];

export default function HomeClient({ featuredRecipes, allRecipes }: { featuredRecipes: Recipe[]; allRecipes: Recipe[] }) {
  const [grams, setGrams] = useState(18);
  const totalMethods = new Set(allRecipes.map((r) => r.coffee_type)).size;

  return (
    <div className="q-home">
      <section className="q-hero" aria-labelledby="q-hero-title">
        <div className="q-hero-grain" aria-hidden="true" />
        <div className="q-wrap q-hero-grid">
          <div className="q-hero-copy">
            <span className="q-overline q-overline-light"><span className="q-dot" /> دليل القهوة المختصة · قَطرة</span>
            <h1 id="q-hero-title">القهوة فنّ.<br /><span>والتفاصيل تصنع الفرق.</span></h1>
            <p>من أول حبة إلى آخر قطرة، اكتشف وصفات مدروسة وتجارب تحضير مصوّرة تساعدك تصنع كوبك بالطريقة التي تحبها.</p>
            <div className="q-hero-actions">
              <Link className="q-btn q-btn-cream" href="/store">استكشف الوصفات <ArrowUpLeft size={18} aria-hidden="true" /></Link>
              <a className="q-text-link" href="#learn">تعلّم أساسيات التحضير <ArrowLeft size={17} aria-hidden="true" /></a>
            </div>
            <div className="q-hero-metrics" aria-label="محتوى مكتبة قَطرة">
              <div><strong>{allRecipes.length}</strong><span>وصفات متاحة</span></div>
              <div><strong>{totalMethods}</strong><span>طرق تحضير</span></div>
              <div><strong>خطوة بخطوة</strong><span>شرح لكل وصفة</span></div>
            </div>
          </div>
          <BrewIllustration />
        </div>
        <div className="q-hero-foot"><div className="q-wrap"><span>BREW WITH INTENTION</span><span>01 — 04</span><span>اكتشف، حضّر، وتذوّق</span></div></div>
      </section>

      <section className="q-section q-tools" id="methods">
        <div className="q-wrap">
          <div className="q-section-heading"><div><span className="q-overline">01 / اكتشف طريقتك</span><h2>لكل أداة، حكاية مختلفة.</h2><p>اختر طريقة التحضير، وشاهد الوصفات المناسبة لها.</p></div><Link href="/store" className="q-inline-link">كل الوصفات <ArrowUpLeft size={17}/></Link></div>
          <div className="q-tools-grid">
            {tools.map((method) => (
              <Link key={method.label} href={'/store?type=' + encodeURIComponent(method.label)} className="q-tool-card">
                <div className="q-tool-number">{method.icon}</div>
                <div className="q-tool-graphic"><MethodIllustration method={method.label}/></div>
                <div className="q-tool-bottom"><div><h3>{method.label}</h3><p>{method.subtitle}</p></div><ArrowUpLeft size={18}/></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="q-section q-featured" id="recipes">
        <div className="q-wrap">
          <div className="q-section-heading"><div><span className="q-overline">02 / مختارات قَطرة</span><h2>وصفات تستحق التجربة.</h2><p>تفاصيل واضحة، كميات دقيقة، وتجربة تحضير مريحة.</p></div><Link href="/store" className="q-inline-link">تصفح المكتبة <ArrowUpLeft size={17}/></Link></div>
          {featuredRecipes.length > 0 ? (
            <div className="q-featured-grid">{featuredRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe}/>)}</div>
          ) : <div className="q-empty">لا توجد وصفات منشورة حاليًا.</div>}
        </div>
      </section>

      <section className="q-section q-photo-story"><div className="q-wrap"><div className="q-photo-quote"><div className="q-photo-copy"><span className="q-overline q-overline-light">القهوة كرحلة</span><h2>وراء كل فنجان، تفاصيل تستحق أن تُروى.</h2><p>من اختيار البن إلى دقة الصب، تكتمل التجربة عندما يجتمع العلم مع الذوق.</p><a href="https://unsplash.com/photos/6VhPY27jdps" target="_blank" rel="noopener noreferrer">مصدر الصورة · Unsplash</a></div><img loading="lazy" alt="أشخاص يتشاركون أكواب القهوة" src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=84"/></div></div></section>

      <section className="q-section q-learn" id="learn">
        <div className="q-wrap q-learn-grid">
          <div className="q-learn-intro"><span className="q-overline">03 / تعلّم وأتقن</span><h2>افهم القهوة،<br/>مو بس اتبع الوصفة.</h2><p>بعض التفاصيل الصغيرة تغيّر النتيجة. تعلّم الأساسيات بطريقة واضحة، بعيدًا عن التعقيد.</p><Link href="/academy" className="q-btn q-btn-dark">افتح الأكاديمية <BookOpen size={17}/></Link></div>
          <div className="q-lesson-list">{lessons.map((item) => { const Icon = item.icon; return <div className="q-lesson" key={item.n}><span>{item.n}</span><div className="q-lesson-icon"><Icon size={24} strokeWidth={1.5}/></div><div><h3>{item.label}</h3><p>{item.detail}</p></div></div>; })}</div>
        </div>
      </section>

      <section className="q-section q-simulator">
        <div className="q-wrap q-sim-grid">
          <div><span className="q-overline q-overline-light">04 / تجربة تفاعلية</span><h2>الموازين تتغيّر.<br/>النسبة تبقى واضحة.</h2><p>جرّب مثالًا تعليميًا على نسبة 1:16، ثم استخدم حاسبة كل وصفة لمقاديرها الفعلية.</p><Link href="/store" className="q-text-link">اختر وصفة وابدأ <ArrowUpLeft size={17}/></Link></div>
          <div className="q-sim-panel"><div className="q-sim-top"><div><Coffee size={18}/><span>كمية البن</span></div><strong>{grams} <small>جرام</small></strong></div><input aria-label="كمية البن بالجرام" type="range" min="10" max="35" step="1" value={grams} onChange={(e) => setGrams(Number(e.target.value))}/><div className="q-sim-results"><div><Droplets size={21}/><span>كمية الماء</span><strong>{grams * 16} <small>مل</small></strong></div><div><FlaskConical size={21}/><span>نسبة التحضير</span><strong>1:16</strong></div></div><p className="q-sim-note">نموذج توضيحي؛ النسبة والوقت الفعليان يختلفان بحسب نوع الوصفة.</p></div>
        </div>
      </section>

      <section className="q-section q-journey"><div className="q-wrap"><div className="q-section-heading"><div><span className="q-overline">من البداية للنهاية</span><h2>ثلاث خطوات لكوب أفضل.</h2></div></div><div className="q-journey-grid">{[{n:'01',title:'اختر',description:'ابحث عن الطريقة والبن المناسبين لك.',icon:Coffee},{n:'02',title:'حضّر',description:'تابع الكميات والخطوات والملاحظات.',icon:CirclePlay},{n:'03',title:'اضبط',description:'عدّل الكمية وسجّل ملاحظاتك لتحسين النتيجة.',icon:Check}].map(x => {const Icon=x.icon;return <div className="q-journey-step" key={x.n}><div className="q-journey-top"><span>{x.n}</span><Icon size={28} strokeWidth={1.3}/></div><h3>{x.title}</h3><p>{x.description}</p></div>})}</div></div></section>

      <section className="q-section q-final-cta"><div className="q-wrap"><div className="q-final-box"><div className="q-final-glow" aria-hidden="true"/><span className="q-overline q-overline-light"><Sparkles size={15}/> خطوتك الأولى</span><h2>ابدأ من هنا.<br/>ودع كوبك يتحدث.</h2><p>وصفات متعددة وشرح عملي يرافقك في كل صبة.</p><Link className="q-btn q-btn-cream" href="/store">اذهب للوصفات <ArrowUpLeft size={18}/></Link></div></div></section>
    </div>
  );
}
