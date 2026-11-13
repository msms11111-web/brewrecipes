"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Share2, Heart, Printer, Coffee, Droplets, Thermometer, Clock3, CircleCheck, CirclePlay, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { Recipe } from '@/app/types';
import { useAppStore, useHydrated } from '@/lib/app-store';
import RecipeImage from './RecipeImage';
import RecipeCalculator from './RecipeCalculator';

function duration(seconds: number) {
  if (seconds >= 3600) return (seconds / 3600).toLocaleString('ar-SA', {maximumFractionDigits: 1}) + ' ساعة';
  return Math.round(seconds / 60) + ' دقيقة';
}
export default function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAppStore(s=>s.user);
  const favorites = useAppStore(s=>s.favorites);
  const purchases = useAppStore(s=>s.purchases);
  const subscription = useAppStore(s=>s.subscription);
  const toggleFavorite = useAppStore(s=>s.toggleFavorite);
  const purchase = useAppStore(s=>s.purchase);
  const [checked, setChecked] = useState<number[]>([]);
  const [showVideo, setShowVideo] = useState(false);
  const favorited = hydrated && favorites.includes(recipe.slug);
  const owned = hydrated && (purchases.includes(recipe.slug) || subscription !== 'none');
  const totalSteps = recipe.steps.length;
  const completion = totalSteps ? Math.round(checked.length / totalSteps * 100) : 0;
  const toggleStep = (n:number) => setChecked(previous=>previous.includes(n)?previous.filter(i=>i!==n):[...previous,n]);
  function handleBuy() {
    if (!user) { toast.error('سجّل الدخول أولًا'); router.push('/login'); return; }
    if (owned) { toast.info('هذه الوصفة موجودة في حسابك'); return; }
    purchase(recipe.slug);
    toast.success('تمت إضافة الوصفة لمشترياتك التجريبية، ولم يتم تحصيل أي مبلغ.');
  }
  function handleFavorite() { toggleFavorite(recipe.slug); toast.success(favorited?'أُزيلت من المفضلة':'أُضيفت إلى المفضلة'); }
  async function handleShare() {
    try {
      if (navigator.share) await navigator.share({title:recipe.title,url:window.location.href});
      else {await navigator.clipboard.writeText(window.location.href); toast.success('تم نسخ رابط الوصفة');}
    } catch { /* user dismissed share */ }
  }
  return <div className="q-detail">
    <div className="q-wrap"><Link href="/store" className="q-detail-back"><ArrowRight size={16}/> جميع الوصفات</Link></div>
    <header className="q-wrap q-detail-hero">
      <div className="q-detail-image"><RecipeImage src={recipe.image_url} alt={recipe.title}/></div>
      <div className="q-detail-intro">
        <div className="q-overline">وصفة قهوة مختصة · {recipe.coffee_type}</div>
        <h1>{recipe.title}</h1>
        <p className="q-detail-lead">{recipe.description}</p>
        <div className="q-detail-chips"><span>{recipe.origin_country}</span><span>{recipe.roast_level}</span><span>{recipe.roastery}</span></div>
        <div className="q-detail-actions">
          <button type="button" onClick={handleFavorite} aria-pressed={favorited}><Heart fill={favorited?'#B55C4A':'none'} size={18}/>{favorited?'محفوظة':'حفظ'}</button>
          <button type="button" onClick={handleShare}><Share2 size={18}/> مشاركة</button>
          <button type="button" onClick={()=>window.print()}><Printer size={18}/> طباعة</button>
          {recipe.video_url && <button type="button" onClick={()=>setShowVideo(true)}><CirclePlay size={18}/> الفيديو</button>}
        </div>
      </div>
    </header>
    <div className="q-wrap q-detail-stat-grid" aria-label="مقادير ومعلومات الوصفة">
      <div><Coffee size={20}/><span>البن</span><strong>{recipe.coffee_grams} جرام</strong></div>
      <div><Droplets size={20}/><span>الماء</span><strong>{recipe.water_ml} مل</strong></div>
      <div><Thermometer size={20}/><span>الحرارة</span><strong>{recipe.temperature}°م</strong></div>
      <div><Clock3 size={20}/><span>الوقت المرجعي</span><strong>{duration(recipe.brew_time)}</strong></div>
    </div>
    <section className="q-section"><div className="q-wrap q-detail-content">
      <div>
        <div className="q-detail-section-heading"><span className="q-overline">خطوة بخطوة</span><h2>دليل التحضير</h2><p>اتبع التعليمات حسب الوصفة، وعلّم على كل خطوة أنجزتها. التأشير لهذه الجلسة فقط.</p></div>
        <div className="q-progress-top"><span>{checked.length} من {totalSteps} خطوات</span><strong>{completion}%</strong></div>
        <div className="q-progress"><div style={{width:completion+'%'}}/></div>
        <div className="q-step-list">
          {recipe.steps.map((step,index)=>{
            const done=checked.includes(index);
            return <button key={index} type="button" onClick={()=>toggleStep(index)} className={'q-step-item '+(done?'q-step-done':'')} aria-pressed={done}>
              <span className="q-step-circle">{done?<Check size={18}/>:String(index+1).padStart(2,'0')}</span>
              <span><strong>الخطوة {index+1}</strong><span>{step}</span></span>
              <CircleCheck className="q-step-check" size={22}/>
            </button>;
          })}
        </div>
        {completion===100 && <div className="q-done"><Sparkles size={20}/> اكتملت الخطوات! دوّن ملاحظات التذوق لتطوير كوبك القادم.</div>}
        <div className="q-detail-tasting"><h2>النكهات المتوقعة</h2><p>قد تختلف النكهات حسب البن والطحن والماء.</p><div>{recipe.tasting_notes.map(note=><span key={note}>{note}</span>)}</div></div>
      </div>
      <aside className="q-detail-sidebar">
        <RecipeCalculator initialCoffeeGrams={recipe.coffee_grams} initialWaterMl={recipe.water_ml} initialBrewTime={recipe.brew_time}/>
        <div className="q-detail-purchase"><span className="q-overline q-overline-light">الوصول للوصفة</span><div className="q-detail-price">{recipe.price === 0 ? 'مجاني' : recipe.price + ' ر.س'}</div><p>الدفع والاشتراك ما زالا تجريبيين. أي نقرة شراء هنا لا تحصّل مبلغًا فعليًا.</p>
          {owned ? <div className="q-owned"><CircleCheck size={18}/> موجودة في حسابك</div> : recipe.price > 0 ? <button type="button" className="q-btn q-btn-cream w-full" onClick={handleBuy}>إضافة تجريبية للوصفة</button> : <div className="q-owned">وصفة مجانية</div>}
          <Link href="/subscriptions" className="q-detail-sub">استعرض خطط الاشتراك</Link>
        </div>
        <div className="q-detail-more"><strong>مواصفات إضافية</strong><dl><div><dt>الطحن</dt><dd>{recipe.grind_size}</dd></div><div><dt>التحميص</dt><dd>{recipe.roast_level}</dd></div><div><dt>المحمصة</dt><dd>{recipe.roastery}</dd></div></dl></div>
      </aside>
    </div></section>
    {showVideo && recipe.video_url && <div className="q-video-backdrop" role="presentation" onClick={()=>setShowVideo(false)}><div className="q-video-modal" role="dialog" aria-modal="true" aria-label="فيديو تحضير الوصفة" onClick={e=>e.stopPropagation()}><button type="button" className="q-video-close" onClick={()=>setShowVideo(false)}>إغلاق ✕</button><div className="aspect-video"><iframe title="فيديو تحضير الوصفة" src={recipe.video_url} width="100%" height="100%" allowFullScreen/></div></div></div>}
  </div>;
}
