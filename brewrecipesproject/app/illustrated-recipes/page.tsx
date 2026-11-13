import type { Metadata } from 'next';
import Link from 'next/link';
import IllustratedRecipeGallery from '@/app/components/IllustratedRecipeGallery';

export const metadata: Metadata = {
  title: 'وصفات القهوة المصوّرة | قَطرة',
  description: 'صور الوصفات الأصلية من أرشيف قَطرة التي سبق تصميمها في ChatGPT.',
};
export default function IllustratedRecipesPage() {
  return <main className="archive-recipes-page">
    <header className="archive-page-hero"><div className="q-wrap"><span className="q-overline q-overline-light">قَطرة / أرشيف الصور</span><h1>وصفات القهوة المصوّرة</h1><p>صور التصميم الأصلية: كوستاريكا فاطمة، البيرو لونيا غراندي، وكولومبيا بيانيس.</p><Link href="/store" className="archive-hero-back">العودة لجميع الوصفات</Link></div></header>
    <IllustratedRecipeGallery compact />
    <div className="q-wrap archive-source-note">تنبيه: هذه بطاقات مصوّرة أُنشئت سابقًا باستخدام الذكاء الاصطناعي، وليست صورًا موثّقة للمنتج أو اعتمادًا رسميًا لمقادير التحضير. راجع معلومات البن ووصفة المحمصة قبل الاستخدام.</div>
  </main>;
}
