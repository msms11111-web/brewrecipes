"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppStore, ADMIN_EMAIL } from '@/lib/app-store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const login = useAppStore((s) => s.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('الرجاء إدخال بريد إلكتروني صحيح');
      return;
    }
    if (password.length < 6) {
      toast.error('كلمة المرور يجب أن تكون ٦ أحرف على الأقل');
      return;
    }

    login('', email);
    toast.success('تم تسجيل الدخول بنجاح');
    router.push(email.trim().toLowerCase() === ADMIN_EMAIL ? '/admin' : '/profile');
  };

  return (
    <div className="min-h-[80dvh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center mb-6">
            <span className="text-[oklch(99%_0.005_70)] text-3xl">☕</span>
          </div>
          <h1 className="text-4xl tracking-tighter font-bold">مرحباً بعودتك</h1>
          <p className="text-[var(--muted-foreground)] mt-2">سجل الدخول للوصول إلى وصفاتك</p>
        </div>

        <form onSubmit={handleLogin} className="card p-8 rounded-3xl space-y-6">
          <div>
            <label className="block text-sm mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-gold w-full py-4 text-lg">
            تسجيل الدخول
          </button>

          <p className="text-center text-sm text-[var(--foreground)]/70">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-[var(--accent)] hover:underline">أنشئ حساباً جديداً</Link>
          </p>

          <p className="text-center text-xs text-[var(--muted-foreground)] pt-2 border-t border-[var(--border)]">
            وضع تجريبي: أي بريد وكلمة مرور تعمل. للدخول كمدير استخدم {ADMIN_EMAIL}
          </p>
        </form>
      </div>
    </div>
  );
}
