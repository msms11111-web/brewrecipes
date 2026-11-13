"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="q-footer">
      <div className="q-wrap">
        <div className="q-footer-grid">
          <div><h2>قَطرة<span className="text-[var(--accent)]">.</span></h2><p>دليل عصري لتجربة قهوة مختصة أكثر وعيًا. وصفات، أدوات، وشروحات تساعدك تتقن كل صبة.</p></div>
          <nav aria-label="روابط التذييل" className="q-footer-nav"><Link href="/store">{t('store')}</Link><Link href="/illustrated-recipes">الوصفات المصوّرة</Link><Link href="/academy">أكاديمية التحضير</Link><Link href="/xbloom">{t('xbloom')}</Link><Link href="/subscriptions">{t('subscriptions')}</Link><Link href="/favorites">{t('favorites')}</Link></nav>
        </div>
        <div className="q-footer-bottom">© {new Date().getFullYear()} قَطرة. جميع الحقوق محفوظة.</div>
      </div>
    </footer>
  );
}
