"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Heart, Menu, X, Moon, Sun, UserRound, LogOut, ArrowUpLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from './LanguageProvider';
import { useAppStore, useHydrated } from '@/lib/app-store';

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const hydrated = useHydrated();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const user = useAppStore(s => s.user);
  const logout = useAppStore(s => s.logout);
  const currentUser = hydrated ? user : null;
  const links = [
    { href: '/', label: t('home') },
    { href: '/store', label: language === 'ar' ? 'الوصفات' : 'Recipes' },
    { href: '/illustrated-recipes', label: language === 'ar' ? 'وصفات مصوّرة' : 'Illustrated' },
    { href: '/signature', label: language === 'ar' ? 'عالم قَطرة' : 'Signature' },
    { href: '/xbloom', label: t('xbloom') },
    { href: '/academy', label: language === 'ar' ? 'تعلّم' : 'Learn' },
    { href: '/subscriptions', label: t('subscriptions') },
  ];
  const doLogout = () => { logout(); setProfileOpen(false); toast.success('تم تسجيل الخروج'); router.push('/'); };
  const linkClass = (href:string) => 'q-nav-link' + (pathname === href ? ' q-nav-active' : '');
  return <header className="q-site-header">
    <div className="q-wrap q-nav-row">
      <Link href="/" aria-label="قَطرة - الرئيسية" className="q-logo q-signature-logo"><svg className="q-signature-mark" viewBox="0 0 76 88" fill="none" aria-hidden="true"><path d="M39 4C33 19 12 38 12 54C12 72 24 83 39 83C56 83 67 72 67 55C67 38 46 17 39 4Z" stroke="currentColor" strokeWidth="3"/><path d="M38 20C34 32 22 44 22 55C22 68 30 73 38 73C46 73 52 69 53 59" stroke="currentColor" strokeWidth="2" opacity=".65"/><circle cx="47" cy="49" r="11" fill="currentColor"/></svg><span>قَطرة<small>QATRA SIGNATURE</small></span></Link>
      <nav className="q-desktop-nav" aria-label="التصفح الرئيسي">{links.map(link=><Link key={link.href} className={linkClass(link.href)} href={link.href}>{link.label}</Link>)}{currentUser?.role==='admin'&&<Link href="/admin" className={linkClass('/admin')}>الإدارة</Link>}</nav>
      <div className="q-nav-actions">
        <button type="button" className="q-icon-btn q-lang-switch" onClick={()=>setLanguage(language==='ar'?'en':'ar')} aria-label="تبديل اللغة">{language.toUpperCase()}</button>
        <Link href="/favorites" className="q-icon-btn" aria-label={t('favorites')} title={t('favorites')}><Heart size={19}/></Link>
        <button className="q-icon-btn" type="button" onClick={()=>setTheme(resolvedTheme==='dark'?'light':'dark')} aria-label="تبديل المظهر">{hydrated&&resolvedTheme==='dark'?<Sun size={19}/>:<Moon size={19}/>}</button>
        {currentUser ? <div className="relative"><button className="q-nav-user" onClick={()=>setProfileOpen(!profileOpen)} type="button" aria-expanded={profileOpen}><UserRound size={17}/><span className="q-desktop-only">{currentUser.name}</span></button>{profileOpen&&<div className="q-profile-menu"><Link onClick={()=>setProfileOpen(false)} href="/profile">حسابي</Link><Link onClick={()=>setProfileOpen(false)} href="/favorites">المفضلة</Link><button type="button" onClick={doLogout}><LogOut size={15}/> خروج</button></div>}</div>:<Link href="/login" className="q-login">{t('login')} <ArrowUpLeft size={15}/></Link>}
        <button type="button" onClick={()=>setMenuOpen(!menuOpen)} className="q-icon-btn q-mobile-menu" aria-label="فتح القائمة" aria-expanded={menuOpen}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
    </div>
    {menuOpen&&<nav className="q-mobile-nav" aria-label="قائمة الجوال"><div className="q-wrap">{links.map(link=><Link key={link.href} href={link.href} onClick={()=>setMenuOpen(false)} className={linkClass(link.href)}>{link.label}</Link>)}{currentUser?.role==='admin'&&<Link href="/admin" onClick={()=>setMenuOpen(false)}>الإدارة</Link>}{!currentUser&&<Link href="/register" onClick={()=>setMenuOpen(false)}>{t('register')}</Link>}</div></nav>}
  </header>;
}
