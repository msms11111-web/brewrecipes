import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpLeft, ArrowLeft, Coffee, Droplets, Flame, Leaf,
  BookOpen, Orbit, MoveUpRight, Layers3, MousePointer2,
  Sparkles, CircleDot, Thermometer, Clock3, CheckCircle2,
} from 'lucide-react';
import SignatureExperience from '../components/SignatureExperience';

export const metadata: Metadata = {
  title: 'QATRA Signature | قَطرة — هوية وتجربة القهوة',
  description: 'تجربة قَطرة الجديدة: هوية بصرية عربية، أرشيف وصفات مصوّرة، ومختبر تحضير تفاعلي.',
};

const palette = [
  { name: 'الغابة العميقة', en: 'FOREST', hex: '#071D16', light: false },
  { name: 'الذهب المعتّق', en: 'AGED GOLD', hex: '#CCA371', light: true },
  { name: 'العاج الدافئ', en: 'WARM IVORY', hex: '#F4EBDB', light: true },
  { name: 'قشرة الإسبرسو', en: 'ESPRESSO', hex: '#60412F', light: false },
  { name: 'ورق الزيتون', en: 'SAGE', hex: '#A3B49E', light: true },
];

const illustrated = [
  { slug: 'costa-rica-fatima', country: '01 / COSTA RICA', title: 'كوستاريكا فاطمة', note: 'كرز · رمان · برتقال', image: '/images/recipe-archive/crops-costa-rica-fatima.webp' },
  { slug: 'peru-lonya-grande', country: '02 / PERU', title: 'البيرو لونيا غراندي', note: 'موز · توت ذهبي · جوز الهند', image: '/images/recipe-archive/crops-peru-lonya-grande.webp' },
  { slug: 'colombia-payanes', country: '03 / COLOMBIA', title: 'كولومبيا بيانيس', note: 'توت أحمر · تفاح · زهور', image: '/images/recipe-archive/crops-colombia-payanes.webp' },
];

function QatraMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 76 88" fill="none" aria-hidden="true">
      <path d="M39 4C33 19 12 38 12 54C12 72 24 83 39 83C56 83 67 72 67 55C67 38 46 17 39 4Z" stroke="currentColor" strokeWidth="3"/>
      <path d="M38 20C34 32 22 44 22 55C22 68 30 73 38 73C46 73 52 69 53 59" stroke="currentColor" strokeWidth="2" opacity=".65"/>
      <circle cx="47" cy="49" r="11" fill="currentColor" opacity=".92"/>
    </svg>
  );
}

export default function SignaturePage() {
  return (
    <main className="sg" dir="rtl">
      <div className="sg-announcement"><span className="sg-announcement-dot" /> A NEW RITUAL FOR SPECIALTY COFFEE <span className="sg-announcement-dot" /></div>
      <section className="sg-hero" aria-labelledby="sg-hero-heading">
        <div className="sg-hero-photo" role="img" aria-label="مشهد احترافي لتقطير القهوة بأداة زجاجية" />
        <div className="sg-hero-shade" />
        <div className="sg-orbit sg-orbit-a" aria-hidden="true" />
        <div className="sg-orbit sg-orbit-b" aria-hidden="true" />
        <div className="sg-container sg-hero-grid">
          <div className="sg-hero-copy">
            <div className="sg-kicker"><span className="sg-kicker-rule" /> QATRA / SIGNATURE EXPERIENCE</div>
            <div className="sg-wordmark">
              <QatraMark className="sg-mark" />
              <span>قَـطْـرَة<small>Q A T R A — S I G N A T U R E</small></span>
            </div>
            <h1 id="sg-hero-heading">كل قطرةٍ<br/><em>تحكي طقسًا.</em></h1>
            <p>من أول لمسة للبن إلى آخر صبّة. تجربة رقمية للقهوة المختصة تجمع بين جمال التفاصيل ودقة التحضير.</p>
            <div className="sg-hero-buttons">
              <Link href="/store" className="sg-button sg-button-gold">اكتشف الوصفات <ArrowUpLeft size={18}/></Link>
              <a href="#sg-experience" className="sg-button sg-button-outline">عِش التجربة <MoveUpRight size={17}/></a>
            </div>
            <span className="sg-edition">© 2026 · THE ART OF EVERY DROP</span>
          </div>
          <div className="sg-hero-counter" aria-hidden="true"><span>01</span><i /><span>04</span></div>
        </div>
        <div className="sg-hero-lower"><span>SCROLL TO EXPLORE</span><span>CRAFTED FOR THE CURIOUS</span></div>
      </section>

      <section className="sg-manifesto" id="sg-identity" aria-labelledby="sg-manifesto-title">
        <div className="sg-container sg-manifesto-grid">
          <div className="sg-chapter"><span>01 /</span> جوهر قَطرة</div>
          <div className="sg-manifesto-body">
            <span className="sg-eyebrow">THE ART OF ATTENTION</span>
            <h2 id="sg-manifesto-title">القهوة ليست مشروبًا فقط.<br/><em>إنها تفاصيل تستحق أن تُعاش.</em></h2>
            <p>نقدّم الوصفات كقصص محسوسة: نرى المحصول، نفهم أدواته، ونضبط التحضير بالأرقام لا بالتخمين. هذه هوية صُممت لتُشعر الزائر أنه في عالم قَطرة، لا في متجر اعتيادي.</p>
            <div className="sg-manifesto-tags"><span><CircleDot size={15}/> هدوء بصري</span><span><Sparkles size={15}/> حرفية</span><span><Layers3 size={15}/> عمق</span><span><MousePointer2 size={15}/> تفاعل مفيد</span></div>
          </div>
        </div>
      </section>

      <section className="sg-methods" aria-labelledby="sg-method-title">
        <div className="sg-container">
          <div className="sg-section-head"><div><span className="sg-eyebrow">THE BREWING RITUAL</span><h2 id="sg-method-title">الأداة بداية الحكاية.</h2></div><Link href="/store" className="sg-underlink">كل طرق التحضير <ArrowUpLeft size={17}/></Link></div>
          <div className="sg-method-grid">
            <Link href="/store?type=V60" className="sg-method sg-method-one"><span>01 — FILTER</span><div className="sg-method-emblem"><Droplets size={64} strokeWidth={.9}/></div><strong>V60</strong><p>صبة تُظهر التفاصيل.</p><ArrowUpLeft size={18}/></Link>
            <Link href="/store?type=Chemex" className="sg-method sg-method-two"><span>02 — CLARITY</span><div className="sg-method-emblem"><Coffee size={64} strokeWidth={.9}/></div><strong>Chemex</strong><p>صفاء في كل طبقة.</p><ArrowUpLeft size={18}/></Link>
            <Link href="/xbloom" className="sg-method sg-method-three"><span>03 — PRECISION</span><div className="sg-method-emblem"><Orbit size={64} strokeWidth={.9}/></div><strong>xBloom</strong><p>الدقة تلتقي بالابتكار.</p><ArrowUpLeft size={18}/></Link>
          </div>
        </div>
      </section>

      <section className="sg-collection" id="sg-archive" aria-labelledby="sg-archive-title">
        <div className="sg-container">
          <div className="sg-section-head sg-section-head-dark"><div><span className="sg-eyebrow">THE CURATED COLLECTION</span><h2 id="sg-archive-title">ثلاثة محاصيل.<br/><em>عوالم من النكهات.</em></h2></div><Link href="/illustrated-recipes" className="sg-underlink">المكتبة المصوّرة <ArrowUpLeft size={17}/></Link></div>
          <div className="sg-origin-grid">
            {illustrated.map((entry) => (
              <Link href={'/illustrated-recipes/' + entry.slug} className="sg-origin-card" key={entry.slug}>
                <div className="sg-origin-art"><img src={entry.image} alt={'بطاقة وصفة ' + entry.title} loading="lazy" decoding="async" /></div>
                <div className="sg-origin-content"><span>{entry.country}</span><h3>{entry.title}</h3><p>{entry.note}</p><div className="sg-origin-action">اكتشف الوصفة <ArrowUpLeft size={17}/></div></div>
              </Link>
            ))}
          </div>
          <p className="sg-archive-note">لوحات مصوّرة أُنشئت سابقًا؛ يجب مراجعة تفاصيل المحاصيل والمقادير مع بيانات المحمصة قبل الاعتماد عليها.</p>
        </div>
      </section>

      <section className="sg-lab-section" id="sg-experience" aria-labelledby="sg-experience-title">
        <div className="sg-container sg-lab-layout">
          <div className="sg-lab-intro">
            <span className="sg-eyebrow">BEYOND THE RECIPE</span>
            <h2 id="sg-experience-title">اضبط النسبة.<br/><em>واصنع طريقتك.</em></h2>
            <p>مختبر تفاعلي يحوّل الأرقام إلى تجربة واضحة. غيّر كمية البن ونسبة الماء وتابع خطوات التحضير بلمسة واحدة.</p>
            <div className="sg-lab-features"><span><Thermometer size={17}/> حرارة مدروسة</span><span><Clock3 size={17}/> توقيت لكل مرحلة</span><span><CheckCircle2 size={17}/> خطوات قابلة للتأشير</span></div>
            <Link href="/academy" className="sg-underlink">تعلّم أساسيات الاستخلاص <ArrowUpLeft size={17}/></Link>
          </div>
          <SignatureExperience />
        </div>
      </section>

      <section className="sg-foundations" aria-labelledby="sg-foundations-title">
        <div className="sg-container">
          <div className="sg-section-head"><div><span className="sg-eyebrow">VISUAL IDENTITY / DESIGN TOKENS</span><h2 id="sg-foundations-title">هوية لها بصمتها.</h2></div><div className="sg-type-stamp">QATRA<br/>SIGNATURE</div></div>
          <div className="sg-palette">
            {palette.map(swatch => <div className="sg-swatch" key={swatch.hex}><div className="sg-color" style={{backgroundColor:swatch.hex,color:swatch.light?'#24362b':'#f3e7d3'}}><span>{swatch.en}</span></div><div className="sg-color-desc"><strong>{swatch.name}</strong><code>{swatch.hex}</code></div></div>)}
          </div>
          <div className="sg-type-grid">
            <div><span className="sg-eyebrow">ARABIC HEADLINE</span><strong>قَطرة، حين تصبح<br/>التفاصيل فنًا.</strong><p>عناوين عربية واضحة بشخصية مميزة ومساحات واسعة.</p></div>
            <div><span className="sg-eyebrow">MICRO TYPOGRAPHY</span><strong className="sg-latin-sample">QATRA<br/>SIGNATURE.</strong><p>حروف إنجليزية مقتصدة للترميز البصري والتنقل.</p></div>
          </div>
        </div>
      </section>

      <section className="sg-outro"><div className="sg-container sg-outro-inner"><div className="sg-outro-mark"><QatraMark/></div><span className="sg-eyebrow">WELCOME TO THE WORLD OF QATRA</span><h2>ليس مجرد موقع وصفات.<br/><em>بل عالم يستحق الاكتشاف.</em></h2><div className="sg-outro-actions"><Link className="sg-button sg-button-gold" href="/store">ابدأ الرحلة <ArrowUpLeft size={18}/></Link><Link href="/" className="sg-underlink">العودة للرئيسية <ArrowLeft size={17}/></Link></div></div></section>
    </main>
  );
}
