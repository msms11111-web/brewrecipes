"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { Coffee, Lock, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        toast.success('مرحباً بك في لوحة التحكم');
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || 'كلمة المرور غير صحيحة');
      }
    } catch {
      toast.error('تعذّر الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#2A1E15]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A46E] to-[#8a6d3b] flex items-center justify-center mb-5">
            <Coffee className="w-8 h-8 text-[#1C1C1C]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">لوحة تحكم المدير</h1>
          <p className="text-[#E9D8C3]/60 mt-2 text-sm">هذه المنطقة مخصّصة لمالك الموقع فقط</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#33251a] border border-white/10 rounded-3xl p-7 space-y-5">
          <div>
            <label className="block text-sm mb-2 text-[#E9D8C3]">كلمة مرور المدير</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E9D8C3]/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                required
                dir="ltr"
                className="w-full pr-11 pl-4 py-3 rounded-xl bg-[#1C1509] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#C5A46E] transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#C5A46E] to-[#a3824f] text-[#1C1C1C] font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'دخول لوحة التحكم'}
          </button>

          <Link href="/" className="block text-center text-sm text-[#E9D8C3]/50 hover:text-[#C5A46E] transition-colors">
            ← العودة إلى الموقع
          </Link>
        </form>
      </div>
    </div>
  );
}
