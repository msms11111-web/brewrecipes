"use client";

import Link from 'next/link';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--border)] px-6 md:px-14 py-16 md:py-[70px]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-center">
        <div>
          <span className="font-heading font-black text-2xl text-[var(--foreground)]">قَطرَة</span>
          <p className="text-[14.5px] leading-[1.8] text-[var(--muted-foreground)] max-w-[420px] mt-3.5 mb-0">
            وصفات أنيقة للقهوة المقطرة لكل الأذواق — تقنيات، أوزان، وتوقيت مضبوط لكوب متوازن.
          </p>
        </div>
        <div className="flex flex-wrap gap-7 md:justify-end text-[14.5px] text-[var(--muted-foreground)]">
          <Link href="/store" className="no-underline hover:text-[var(--accent)] transition-colors">{t('store')}</Link>
          <Link href="/subscriptions" className="no-underline hover:text-[var(--accent)] transition-colors">{t('subscriptions')}</Link>
          <Link href="/favorites" className="no-underline hover:text-[var(--accent)] transition-colors">{t('favorites')}</Link>
          <Link href="/admin" className="no-underline hover:text-[var(--accent)] transition-colors">{t('admin')}</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[var(--border)] text-xs text-[var(--muted-foreground)]">
        © {new Date().getFullYear()} قَطرَة — دليل التقطير اليدوي. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
