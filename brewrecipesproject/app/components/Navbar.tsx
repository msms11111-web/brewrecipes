"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from './LanguageProvider';
import { useTheme } from 'next-themes';
import { useAppStore, useHydrated } from '@/lib/app-store';
import { toast } from 'sonner';
import {
  Menu, X, User, Heart,
  Moon, Sun, Globe, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();
  const hydrated = useHydrated();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const currentUser = hydrated ? user : null;

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/store', label: t('store') },
    { href: '/subscriptions', label: t('subscriptions') },
    { href: '/favorites', label: t('favorites') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    toast.success('تم تسجيل الخروج');
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur-lg border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-2.5 group">
            <span className="font-heading font-black text-[26px] text-[var(--foreground)]">قَطرَة</span>
            <span className="hidden sm:inline text-[13px] text-[var(--muted-foreground)] font-medium">دليل التقطير اليدوي</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 text-[15px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-[var(--foreground)] hover:text-[var(--accent)]"
              >
                {link.label}
              </Link>
            ))}
            {currentUser?.role === 'admin' && (
              <Link href="/admin" className="nav-link text-[var(--accent)] font-semibold">
                {t('admin')}
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-[var(--secondary)] transition-colors text-sm"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">{language.toUpperCase()}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-[var(--secondary)] transition-colors"
              aria-label="Toggle theme"
            >
              {hydrated && resolvedTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-[var(--accent)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--foreground)]" />
              )}
            </button>

            {/* User Menu / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[var(--secondary)] transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center">
                    <User className="w-4 h-4 text-[oklch(99%_0.005_70)]" />
                  </div>
                  <span className="text-sm font-medium hidden md:block">{currentUser.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-56 bg-[var(--card)] rounded-2xl shadow-xl border border-[var(--border)] py-2 z-50"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--secondary)] text-sm"
                      >
                        <User className="w-4 h-4" /> {t('profile')}
                      </Link>
                      <Link
                        href="/favorites"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--secondary)] text-sm"
                      >
                        <Heart className="w-4 h-4" /> {t('favorites')}
                      </Link>
                      <div className="h-px bg-[var(--border)] my-1 mx-2" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-start flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 text-sm text-red-600"
                      >
                        <LogOut className="w-4 h-4" /> {t('logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="btn btn-secondary text-sm px-5 py-2 hidden sm:block"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary text-sm px-5 py-2 hidden sm:block"
                >
                  {t('register')}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full hover:bg-[var(--secondary)]"
              aria-label="القائمة"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--border)] bg-[var(--background)] overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-[var(--foreground)] "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {currentUser?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="py-2 text-[var(--accent)] font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('admin')}
                </Link>
              )}
              {!currentUser && (
                <>
                  <Link href="/login" className="py-2 text-[var(--foreground)] " onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                  <Link href="/register" className="btn btn-primary w-full justify-center mt-2" onClick={() => setIsMenuOpen(false)}>{t('register')}</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
