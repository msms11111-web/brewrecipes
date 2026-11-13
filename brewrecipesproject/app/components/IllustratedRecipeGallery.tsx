import Link from 'next/link';
import { ArrowUpLeft, BookImage, Coffee } from 'lucide-react';
import { illustratedRecipes } from '@/lib/illustrated-recipes';

/** Preserves the original complete infographic images, without cropping brewing instructions. */
export default function IllustratedRecipeGallery({ compact = false }: { compact?: boolean }) {
  return (
    <section className={'archive-recipes-section ' + (compact ? 'archive-recipes-compact' : '')} aria-labelledby="archive-recipes-title">
      <div className="q-wrap">
        <div className="archive-recipes-head">
          <div className="archive-recipes-heading">
            <span className="archive-eyebrow"><BookImage size={16} strokeWidth={1.7} /> وصفات قَطرة المصوّرة</span>
            <h2 id="archive-recipes-title">اكتشف تفاصيل كل محصول.</h2>
            <p>صور كاملة لكل وصفة، من الإيحاءات والمقادير إلى خطوات التقطير. اختر البطاقة لقراءة تفاصيلها بوضوح.</p>
          </div>
          <Link href="/illustrated-recipes" className="archive-browse-link">استكشف جميع البطاقات <ArrowUpLeft size={17} /></Link>
        </div>
        <div className="archive-recipes-grid">
          {illustratedRecipes.map((recipe, index) => (
            <Link className="archive-recipe-card" href={'/illustrated-recipes/' + recipe.slug} key={recipe.slug} aria-label={'عرض البطاقة المصوّرة: ' + recipe.title}>
              <div className="archive-recipe-picture">
                <img src={recipe.image} alt={'بطاقة ' + recipe.title + ' المصوّرة، تحوي الإيحاءات والمقادير وطريقة التحضير'} loading="lazy" decoding="async" />
              </div>
              <div className="archive-recipe-caption">
                <div className="archive-recipe-copy">
                  <span className="archive-card-count"><Coffee size={13} /> {recipe.roastery} <span aria-hidden="true">•</span> {recipe.brewMethod} <span aria-hidden="true">•</span> {String(index + 1).padStart(2, '0')}</span>
                  <strong>{recipe.title}</strong>
                  <span className="archive-card-notes">{recipe.tasting}</span>
                </div>
                <span className="archive-card-action" aria-hidden="true"><ArrowUpLeft size={19} /></span>
              </div>
            </Link>
          ))}
        </div>
        <p className="archive-visual-disclaimer">الصور تصاميم توضيحية من أرشيف قَطرة، وقد تحتوي على تفاصيل تحتاج مراجعة مع بيانات المحمصة قبل التحضير.</p>
      </div>
    </section>
  );
}
