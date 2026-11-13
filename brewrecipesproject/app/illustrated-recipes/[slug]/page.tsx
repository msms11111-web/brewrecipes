import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpLeft, ArrowRight, Coffee } from 'lucide-react';
import { notFound } from 'next/navigation';
import { illustratedRecipes, getIllustratedRecipe } from '@/lib/illustrated-recipes';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return illustratedRecipes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getIllustratedRecipe(slug);
  return { title: recipe ? recipe.title + ' | قَطرة المصوّرة' : 'وصفة غير موجودة | قَطرة' };
}

export default async function IllustratedRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getIllustratedRecipe(slug);
  if (!recipe) notFound();

  return (
    <main className="archive-detail-page">
      <div className="q-wrap archive-detail-container">
        <nav className="archive-breadcrumb" aria-label="مسار التنقل">
          <Link href="/store">الوصفات</Link><span>/</span>
          <Link href="/illustrated-recipes">الوصفات المصوّرة</Link><span>/</span><span>{recipe.title}</span>
        </nav>
        <div className="archive-detail-head">
          <div>
            <span className="archive-eyebrow"><Coffee size={16}/> {recipe.roastery} · {recipe.brewMethod}</span>
            <h1>{recipe.title}</h1>
            <p>الصورة الأصلية كاملة، مع تفاصيل التحضير والإيحاءات المرئية.</p>
          </div>
          <a className="archive-full-image" href={recipe.image} target="_blank" rel="noopener noreferrer">
            فتح الصورة كاملة <ArrowUpLeft size={17}/>
          </a>
        </div>
        <div className="archive-detail-layout">
          <figure className="archive-detail-artwork">
            <img className="archive-detail-image" src={recipe.image} alt={'بطاقة التحضير المصوّرة لمحصول ' + recipe.title} />
          </figure>
          <aside className="archive-recipe-sidepanel" aria-label="ملخص البطاقة">
            <span className="archive-side-eyebrow">بطاقة التقطير المصوّرة</span>
            <h2>{recipe.country} · {recipe.brewMethod}</h2>
            <p>جميع التفاصيل على الصورة الأصلية. هذا ملخص سريع للمقادير المعروضة وليس تأكيدًا لمواصفات المحمصة.</p>
            <div className="archive-details-specs">
              <div>البن <strong>{recipe.coffeeGrams} جم</strong></div>
              <div>الماء <strong>{recipe.waterMl} مل</strong></div>
              <div>الحرارة <strong>{recipe.temperature}°م</strong></div>
              <div>الوقت المرجعي <strong>{recipe.duration}</strong></div>
            </div>
            <span className="archive-card-notes">الإيحاءات: {recipe.tasting}</span>
            <Link className="archive-side-link" href="/illustrated-recipes">
              <ArrowRight size={16}/> بقية البطاقات المصوّرة
            </Link>
          </aside>
        </div>
        <p className="archive-detail-caution">هذه لوحة تصميمية سبق إنشاؤها في ChatGPT، وليست إثباتًا لبيانات المحصول أو وصفة معتمدة من المحمصة. راجع العبوة الأصلية قبل اعتماد المقادير.</p>
      </div>
    </main>
  );
}
