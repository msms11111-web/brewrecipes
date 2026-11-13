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
  return <>
    <section className="q-academy-hero"><div className="q-wrap"><span className="q-overline q-overline-light">أكاديمية قَطرة</span><h1>افهم التفاصيل.<br/>واصنع قهوتك بثقة.</h1><p>محتوى عملي ومختصر يفسّر ما يحدث أثناء التحضير، من الطحن وحتى التذوق. ابدأ بالمفاهيم الأساسية، ثم جرّبها بنفسك.</p></div></section>
    <section className="q-section"><div className="q-wrap"><div className="q-section-heading"><div><span className="q-overline">دروس مبسّطة</span><h2>مكتبة المعرفة</h2><p>دليل تعليمي عام، ولا يغني عن الالتزام بتعليمات كل وصفة.</p></div></div><div className="q-academy-grid">{topics.map((item) => { const Icon=item.icon; return <article key={item.n} className="q-academy-card"><Icon size={29} strokeWidth={1.35} className="text-[var(--accent)] mb-3"/><span className="q-badge">الدرس {item.n}</span><h2>{item.title}</h2><p>{item.summary}</p><ol className="q-academy-list">{item.points.map((p)=><li key={p}>{p}</li>)}</ol></article>})}</div><div className="text-center mt-12"><Link href="/store" className="q-btn q-btn-dark">طبّق على وصفة <ArrowUpLeft size={17}/></Link></div></div></section>
  </>;
}
