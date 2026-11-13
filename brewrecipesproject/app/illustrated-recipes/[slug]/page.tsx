import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { illustratedRecipes, getIllustratedRecipe } from '@/lib/illustrated-recipes';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return illustratedRecipes.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getIllustratedRecipe(slug);
  return { title: recipe ? recipe.title + ' | صور قَطرة' : 'صورة وصفة غير موجودة | قَطرة' };
}
export default async function IllustratedRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getIllustratedRecipe(slug);
  if (!recipe) notFound();
  return <main className="archive-detail-page">
    <div className="q-wrap archive-detail-container">
      <nav className="archive-breadcrumb"><Link href="/illustrated-recipes">الوصفات المصوّرة</Link><span>/</span><span>{recipe.title}</span></nav>
      <div className="archive-detail-head"><div><span className="q-overline">{recipe.roastery} · {recipe.brewMethod}</span><h1>{recipe.title}</h1><p>{recipe.country} · لوحة الوصفة الأصلية من أرشيف ChatGPT</p></div><a className="archive-full-image" href={recipe.image} target="_blank" rel="noopener noreferrer">فتح الصورة بالحجم الكامل</a></div>
      <img className="archive-detail-image" src={recipe.image} width="1024" height="520" alt={'صورة وصفة ' + recipe.title + ' مع خطوات التحضير والإيحاءات'} />
      <div className="archive-details-specs"><div>البن <strong>{recipe.coffeeGrams} جم</strong></div><div>الماء <strong>{recipe.waterMl} مل</strong></div><div>الحرارة <strong>{recipe.temperature}°م</strong></div><div>الوقت المقترح <strong>{recipe.duration} دقيقة</strong></div></div>
      <p className="archive-source-note">البيانات والصورة من تصميم ChatGPT سابق، ولا تثبت مواصفات المحصول الفعلية. استخدمها كمرجع بصري وراجع بيانات العبوة أو المحمصة قبل الاعتماد.</p>
      <Link className="q-inline-link" href="/illustrated-recipes">العودة لجميع البطاقات المصوّرة</Link>
    </div>
  </main>;
}
