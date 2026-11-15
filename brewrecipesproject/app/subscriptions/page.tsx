"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Crown, Sparkles, ArrowUpLeft, ShieldCheck, Coffee, CircleCheck2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAppStore, useHydrated } from '@/lib/app-store';

const features = [
  'الوصول إلى الوصفات المتاحة في المكتبة',
  'حاسبة ماء وبن لكل وصفة',
  'عرض خطوات التحضير والمعلومات',
  'إضافة الوصفات إلى المفضلة',
];

export default function SubscriptionsPage() {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useAppStore(s => s.user);
  const subscription = useAppStore(s => s.subscription);
  const subscriptionEndsAt = useAppStore(s => s.subscriptionEndsAt);
  const subscribe = useAppStore(s => s.subscribe);
  const cancelSubscription = useAppStore(s => s.cancelSubscription);
  const active = hydrated && subscription !== 'none';

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    if (!user) { toast.error('سجّل الدخول أولًا لتجربة الاشتراك'); router.push('/login'); return; }
    subscribe(plan);
    toast.success('فُعّلت خطة تجريبية محليًا — لم يتم سحب أي مبلغ.');
  };
  const handleCancel = () => { cancelSubscription(); toast.info('تم إلغاء الاشتراك التجريبي'); };

  return (
    <main className="sg-membership">
      <header className="sg-membership-hero">
        <div className="sg-container sg-membership-hero-inner">
          <span className="sg-eyebrow">QATRA / MEMBERSHIP EXPERIENCE</span>
          <div className="sg-membership-emblem"><Crown size={37} strokeWidth={1.2}/></div>
          <h1>مساحة أوسع<br/><em>لعالم من التفاصيل.</em></h1>
          <p>جرّب تجربة العضوية، واطّلع على الأسعار النموذجية ومزاياها. الدفع الحقيقي غير متاح حاليًا.</p>
          <span className="sg-membership-demo"><ShieldCheck size={16}/> وضع تجريبي — لا يتم تحصيل مبالغ</span>
        </div>
      </header>

      <section className="sg-membership-content">
        <div className="sg-container">
          {active && <div className="sg-active-plan">
            <span><CircleCheck2 size={20}/> خطتك التجريبية النشطة: <strong>{subscription==='monthly'?'الشهرية':'السنوية'}</strong>{subscriptionEndsAt&&<small> · حتى {new Date(subscriptionEndsAt).toLocaleDateString('ar-SA')}</small>}</span>
            <button type="button" onClick={handleCancel}>إلغاء التجربة</button>
          </div>}
          <div className="sg-plan-head"><span className="sg-eyebrow">CHOOSE YOUR RITUAL</span><h2>اختر المسار المناسب لك.</h2><p>الأسعار المعروضة نموذجية وليست عملية شراء فعلية. كل خطة يمكن تفعيلها تجريبيًا دون خصم.</p></div>
          <div className="sg-plan-grid">
            <article className="sg-plan">
              <span className="sg-plan-label">MONTHLY ACCESS</span>
              <div className="sg-plan-icon"><Coffee size={30} strokeWidth={1.3}/></div>
              <h3>العضوية الشهرية</h3>
              <p>خيار مرن للتجربة والتعلّم.</p>
              <div className="sg-plan-price"><strong>٢٩</strong><span>ر.س / شهريًا</span></div>
              <div className="sg-plan-line"/>
              <ul>{features.map(f=><li key={f}><Check size={16}/>{f}</li>)}</ul>
              <button type="button" className="sg-plan-action" disabled={hydrated&&subscription==='monthly'} onClick={()=>handleSubscribe('monthly')}>{hydrated&&subscription==='monthly'?'الخطة الحالية':'تجربة الاشتراك الشهري'} <ArrowUpLeft size={18}/></button>
            </article>
            <article className="sg-plan sg-plan-premium">
              <div className="sg-plan-flag"><Sparkles size={15}/> الأكثر توفيرًا في النموذج</div>
              <span className="sg-plan-label">YEARLY ACCESS</span>
              <div className="sg-plan-icon"><Crown size={30} strokeWidth={1.3}/></div>
              <h3>العضوية السنوية</h3>
              <p>تجربة ممتدة ضمن نظام قَطرة.</p>
              <div className="sg-plan-price"><strong>٢٧٨</strong><span>ر.س / سنويًا</span></div>
              <div className="sg-plan-line"/>
              <ul>{features.map(f=><li key={f}><Check size={16}/>{f}</li>)}<li><Check size={16}/> أقل بنحو 20% من تكلفة 12 شهرًا</li></ul>
              <button type="button" className="sg-plan-action" disabled={hydrated&&subscription==='yearly'} onClick={()=>handleSubscribe('yearly')}>{hydrated&&subscription==='yearly'?'الخطة الحالية':'تجربة الاشتراك السنوي'} <ArrowUpLeft size={18}/></button>
            </article>
          </div>
          <p className="sg-plan-disclaimer">المصادقة والاشتراكات والدفع في المشروع ما زالت بوضع تجريبي. هذه الواجهة لا تجمع بيانات بطاقات مصرفية ولا تُجري مدفوعات. راجع <Link href="/store">الوصفات المتاحة</Link> مباشرة.</p>
        </div>
      </section>
    </main>
  );
}
