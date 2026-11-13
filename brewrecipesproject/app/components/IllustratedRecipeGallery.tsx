import Link from 'next/link';
import { ArrowUpLeft, Images } from 'lucide-react';
import { illustratedRecipes } from '@/lib/illustrated-recipes';

export default function IllustratedRecipeGallery({ compact = false }: { compact?: boolean }) {
  return (
    <section className={'archive-recipes-section ' + (compact ? 'archive-recipes-compact' : '')} aria-labelledby="archive-recipes-title">
      <div className="q-wrap">
        <div className="archive-recipes-head">
          <div>
            <span className="q-overline"><Images size={16} /> من أرشيف قَطرة المصوّر</span>
            <h2 id="archive-recipes-title">وصفات بصورها الأصلية.</h2>
            <p>ثلاث بطاقات وصفات CROPS المصممة سابقًا في ChatGPT، مفصولة ومحفوظة بأسمائها.</p>
          </div>
          <Link href="/illustrated-recipes" className="q-inline-link">عرض الصور كاملة <ArrowUpLeft size={17}/></Link>
        </div>
        <div className="archive-recipes-grid">
          {illustratedRecipes.map((recipe) => (
            <Link className="archive-recipe-card" href={'/illustrated-recipes/' + recipe.slug} key={recipe.slug}>
              <div className="archive-recipe-picture"><img src={recipe.image} alt={'صورة وصفة ' + recipe.title + ' المصممة سابقًا في ChatGPT'} loading="lazy" width="1024" height="520" /></div>
              <div className="archive-recipe-caption"><span><small>{recipe.roastery} · {recipe.brewMethod}</small><strong>{recipe.title}</strong></span><ArrowUpLeft size={21}/></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
