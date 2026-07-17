"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  LayoutDashboard, Coffee, Images, FileText,
  ExternalLink, LogOut, Menu, X,
} from 'lucide-react';

const nav = [
  { href: '/admin', label: 'لوحة التحكم', Icon: LayoutDashboard, exact: true },
  { href: '/admin/recipes', label: 'الوصفات', Icon: Coffee },
  { href: '/admin/media', label: 'مكتبة الصور', Icon: Images },
  { href: '/admin/content', label: 'إدارة المحتوى', Icon: FileText },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    toast.success('تم تسجيل الخروج من لوحة التحكم');
    router.push('/admin/login');
    router.refresh();
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <Link href="/admin" className="flex items-center gap-3 px-6 py-6 border-b border-[var(--admin-border)]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C5A46E] to-[#8a6d3b] flex items-center justify-center">
          <Coffee className="w-5 h-5 text-[#1C1C1C]" />
        </div>
        <div>
          <div className="font-bold text-lg tracking-tight text-white leading-none">Brew Recipes</div>
          <div className="text-[10px] tracking-[3px] text-[#C5A46E] mt-1">ADMIN PANEL</div>
        </div>
      </Link>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map(({ href, label, Icon, exact }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? 'bg-[#C5A46E] text-[#1C1C1C]'
                : 'text-[#E9D8C3]/80 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="w-[18px] h-[18px]" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-[var(--admin-border)] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#E9D8C3]/80 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ExternalLink className="w-[18px] h-[18px]" /> عرض الموقع
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-[18px] h-[18px]" /> تسجيل الخروج
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4EEE4] dark:bg-[#161310]" style={{ ['--admin-border' as string]: 'rgba(255,255,255,0.08)' }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 right-0 w-64 bg-[#2A1E15] flex-col z-40">
        {SidebarContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 h-16 bg-[#2A1E15] text-white">
        <div className="flex items-center gap-2">
          <Coffee className="w-6 h-6 text-[#C5A46E]" />
          <span className="font-bold">لوحة التحكم</span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="القائمة" className="p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 right-0 w-72 max-w-[85vw] bg-[#2A1E15]">
            <button onClick={() => setOpen(false)} aria-label="إغلاق" className="absolute top-5 left-4 text-white/70 p-1">
              <X className="w-5 h-5" />
            </button>
            {SidebarContent}
          </aside>
        </div>
      )}

      <main className="lg:mr-64 min-h-screen">{children}</main>
    </div>
  );
}
