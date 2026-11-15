"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="q-footer">
      <div className="q-wrap">
        <div className="q-footer-grid">
          <div className="q-footer-brand"><div className="q-footer-crest"><span>قَطرة</span><small>QATRA / SIGNATURE</small></div><p>كل قطرة تحكي طقسًا. وصفات وطقوس تحضير تتقاطع فيها الحِرفية مع المعرفة.</p><Link href="/signature" className="q-footer-journey">استكشف عالم قَطرة ←</Link></div>
          <nav aria-label="روابط التذييل" className="q-footer-nav"><Link href="/store">{t('store')}</Link><Link href="/illustrated-recipes">الوصفات المصوّرة</Link><Link href="/signature">عالم قَطرة Signature</Link><Link href="/academy">أكاديمية التحضير</Link><Link href="/xbloom">{t('xbloom')}</Link><Link href="/subscriptions">{t('subscriptions')}</Link><Link href="/favorites">{t('favorites')}</Link></nav>
        </div>
        <div className="q-footer-bottom">© {new Date().getFullYear()} قَطرة. جميع الحقوق محفوظة.</div>
      </div>
    </footer>
  );
}
