import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpLeft, Droplets, Flame, SlidersHorizontal, Timer, BookOpen, Coffee } from 'lucide-react';

export const metadata: Metadata = {
  title: 'أكاديمية التحضير | قَطرة',
  description: 'دروس عملية عن الطحن ونسبة الماء والبن والحرارة وخطوات التقطير.',
};
const topics = [
  {n:'01', title:'كيف تختار درجة الطحن؟', icon: SlidersHorizontal, summary:'الطحن الناعم يبطئ تدفق الماء عادةً، والخشن يسرّعه؛ لكن شكل الأداة وطريقة الصب مهمان أيضًا.', points:['ابدأ بدرجة الطحن المذكورة في الوصفة.','إذا كان التصريف بطيئًا جدًا جرّب درجة أخشن قليلًا.','غيّر متغيرًا واحدًا كل مرة حتى تعرف سبب الاختلاف.']},
  {n:'02', title:'ما معنى نسبة 1:16؟', icon: Droplets, summary:'هي 16 جرام ماء لكل جرام بن؛ مثال: 15 جرام بن و240 جرام ماء. ليست نسبة مناسبة لكل طريقة.', points:['حدد أداة التحضير والبن أولًا.','قارن النسبة الأصلية في كل وصفة.','استخدم الحاسبة لتغيير الكمية مع الحفاظ على النسبة.']},
  {n:'03', title:'هل الحرارة ثابتة لكل بن؟', icon: Flame, summary:'الحرارة عامل من عدة عوامل. تختلف باختلاف التحميص، البن، الأداة، والنكهة المطلوبة.', points:['اتبع درجة الحرارة الأساسية للوصفة.','استعمل ماءً مناسبًا وميزانًا واضحًا.','غيّر الحرارة تدريجيًا عند الحاجة.']},
  {n:'04', title:'كيف تضبط وقت التقطير؟', icon: Timer, summary:'الوقت نتيجة تفاعل الطحن والجرعة والفلتر والصب. ليس رقمًا يُضرب آليًا عند زيادة الكمية.', points:['سجّل زمن التقطير الفعلي.','راقب سرعة التدفق والطعم النهائي.','عدّل الطحن أو أسلوب الصب عند الحاجة.']},
  {n:'05', title:'لماذا مرحلة التفتح؟', icon: Coffee, summary:'يساعد الترطيب الأولي على خروج جزء من الغاز المحتبس في البن المحمص، ثم تبدأ بقية الصبات.', points:['ضع كمية ماء أولية كما في الوصفة.','انتظر المدة المحددة قبل استكمال الصب.','لا تفترض أن كل وصفات القهوة تحتاج نفس المدة.']},
  {n:'06', title:'كيف تقرأ وصفة التحضير؟', icon: BookOpen, summary:'ابحث عن الجرعة، كمية الماء، الحرارة، الطحن، خطوات الصب، والمدة المتوقعة.', points:['جهز الأدوات قبل بدء التوقيت.','استخدم ميزانًا ومؤقتًا إن أمكن.','دوّن النتيجة حتى تصنع وصفة تناسب ذوقك.']},
];
export default function AcademyPage() {
  return (
    <main className="sg-academy">
      <header className="sg-academy-hero">
        <div className="sg-academy-hero-photo" aria-hidden="true" />
        <div className="sg-academy-hero-overlay" aria-hidden="true" />
        <div className="sg-container sg-academy-hero-inner">
          <span className="sg-eyebrow">QATRA / VISUAL ACADEMY</span>
          <h1>وراء كل صبّة،<br/><em>علم يستحق المعرفة.</em></h1>
          <p>ما يكفي تحفظ وصفة. افهم كيف يتأثر مذاق القهوة بالطحن والماء والوقت، وخذ المعرفة من الصفحة إلى فنجانك.</p>
          <a className="sg-button sg-button-gold" href="#sg-lessons">ابدأ رحلتك التعليمية <ArrowUpLeft size={17}/></a>
        </div>
        <div className="sg-academy-seal" aria-hidden="true"><span>LEARN</span><Coffee size={42} strokeWidth={1}/><span>REFINE</span></div>
      </header>

      <section className="sg-academy-intro">
        <div className="sg-container sg-academy-intro-grid">
          <div className="sg-academy-intro-copy"><span className="sg-eyebrow">THE SCIENCE BEHIND THE CUP</span><h2>تذوق أعمق.<br/><em>بقرارات أدق.</em></h2><p>خلك مع متغير واحد في كل تجربة. كذا تفهم سبب الاختلاف وتقدر تكرر النتيجة بدل الاعتماد على التخمين.</p></div>
          <div className="sg-academy-pillars">
            {[{no:'01',name:'الطحن',note:'يتحكم جزئيًا بسرعة التدفق',icon:SlidersHorizontal},{no:'02',name:'الماء',note:'كمية وحرارة ونسبة',icon:Droplets},{no:'03',name:'الصب',note:'طريقة توزيع الماء على البن',icon:Coffee}].map(item=>{
              const Icon = item.icon;
              return <div className="sg-academy-pillar" key={item.no}><span>{item.no}</span><Icon size={26} strokeWidth={1.4}/><strong>{item.name}</strong><small>{item.note}</small></div>;
            })}
          </div>
        </div>
      </section>

      <section className="sg-academy-lessons" id="sg-lessons">
        <div className="sg-container">
          <div className="sg-section-head"><div><span className="sg-eyebrow">THE BREWING KNOWLEDGE</span><h2>ستة دروس،<br/>لفهم القهوة أكثر.</h2></div><Link href="/store" className="sg-underlink">طبّق المعرفة على وصفة <ArrowUpLeft size={16}/></Link></div>
          <div className="sg-academy-lesson-grid">
            {topics.map(item=>{
              const Icon = item.icon;
              return <details key={item.n} className="sg-academy-lesson">
                <summary>
                  <span className="sg-academy-lesson-number">{item.n}</span>
                  <div className="sg-academy-lesson-icon"><Icon size={29} strokeWidth={1.35}/></div>
                  <div className="sg-academy-lesson-summary"><h3>{item.title}</h3><p>{item.summary}</p></div>
                  <span className="sg-academy-lesson-expand" aria-hidden="true">+</span>
                </summary>
                <div className="sg-academy-lesson-content"><div className="sg-academy-lesson-rule" /><ol>{item.points.map(point=><li key={point}>{point}</li>)}</ol></div>
              </details>;
            })}
          </div>
          <p className="sg-academy-disclaimer">المعلومات تعليمية عامة. استخدم تعليمات المحمصة والوصفة المناسبة لبنك وأداتك عند التحضير الفعلي.</p>
        </div>
      </section>
      <section className="sg-academy-cta"><div className="sg-container sg-academy-cta-inner"><div><span className="sg-eyebrow">FROM KNOWLEDGE TO THE CUP</span><h2>جاهز تبدأ؟</h2><p>جرّب وصفة حقيقية، واستخدم الحاسبة لتعديل الماء حسب كمية البن.</p></div><div><Link href="/store" className="sg-button sg-button-gold">افتح مكتبة الوصفات <ArrowUpLeft size={18}/></Link><Link href="/signature#sg-experience" className="sg-button sg-button-outline">جرّب مختبر التحضير <Droplets size={17}/></Link></div></div></section>
    </main>
  );
}
