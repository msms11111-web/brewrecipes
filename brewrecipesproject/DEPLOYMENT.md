# دليل نشر Brew Recipes

مشروع Next.js 16 يعتمد على قاعدة بيانات PostgreSQL عبر Prisma، ومصادقة عبر Supabase.
هذا الدليل ينشر الموقع على **Vercel** مع قاعدة بيانات **Supabase** (أو Neon).

---

## المتطلبات

- حساب [GitHub](https://github.com) (المستودع `msms11111-web/brewrecipes` موجود بالفعل).
- حساب [Vercel](https://vercel.com) — يمكن الدخول عبر GitHub.
- حساب [Supabase](https://supabase.com) (مجاني) لقاعدة البيانات والمصادقة.

---

## 1) إنشاء قاعدة البيانات على Supabase

1. أنشئ مشروعًا جديدًا في Supabase.
2. من **Project Settings → Database** انسخ رابطي الاتصال:
   - **Connection pooling** (المنفذ `6543`) → سيصبح `DATABASE_URL`.
   - **Direct connection** (المنفذ `5432`) → سيصبح `DIRECT_URL`.
3. من **Project Settings → API** انسخ:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`.
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

> بديل: تقدر تستخدم [Neon](https://neon.tech). في هذه الحالة اجعل `DATABASE_URL` و `DIRECT_URL` نفس الرابط.

---

## 2) تجهيز مخطط قاعدة البيانات وبذر البيانات

من جهازك محليًا (مرة واحدة قبل أول نشر):

```bash
cd brewrecipesproject
cp .env.example .env          # ثم عبّئ القيم الحقيقية
npm install
npx prisma db push            # ينشئ الجداول في قاعدة Supabase
npm run db:seed               # (اختياري) يزرع 6 وصفات تجريبية
```

---

## 3) النشر على Vercel

1. من لوحة Vercel اضغط **Add New → Project** واختر المستودع `msms11111-web/brewrecipes`.
2. في **Root Directory** اختر المجلد `brewrecipesproject` (المشروع ليس في جذر المستودع).
3. Vercel يكتشف Next.js تلقائيًا. اترك إعدادات البناء الافتراضية:
   - Build Command: `npm run build` (ينفّذ `prisma generate && next build`).
   - Install Command: `npm install` (ينفّذ `prisma generate` عبر `postinstall`).
4. أضف **Environment Variables** (نفس مفاتيح `.env.example`):

   | المتغيّر | القيمة |
   |----------|--------|
   | `DATABASE_URL` | رابط Supabase المجمّع (منفذ 6543) |
   | `DIRECT_URL` | رابط Supabase المباشر (منفذ 5432) |
   | `NEXT_PUBLIC_SUPABASE_URL` | Project URL من Supabase |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
   | `NEXT_PUBLIC_SITE_URL` | نطاق موقعك بعد النشر (مثل `https://brewrecipes.vercel.app`) |
   | `ADMIN_PASSWORD` | كلمة مرور لوحة التحكم (تُستخدم في `/admin/login`) — **إلزامية في الإنتاج** |
   | `ADMIN_SESSION_SECRET` | نص عشوائي طويل لتوقيع جلسة المدير |

5. اضغط **Deploy**. بعد اكتمال البناء ستحصل على رابط عام تفتحه من أي جهاز.

---

## 4) النشر التلقائي

بعد الربط، كل دفع (push) إلى فرع `main` يُطلق نشرًا تلقائيًا جديدًا على Vercel.
لا حاجة لأي خطوة يدوية بعد الإعداد الأول.

---

## لوحة تحكم المدير ومكتبة الصور

- الدخول عبر `/admin/login` بكلمة مرور `ADMIN_PASSWORD` (أنت المسؤول الوحيد).
- **الصور تُخزَّن داخل قاعدة البيانات** (جدول `Media`) وتُقدَّم عبر `/api/media/[id]` —
  لا حاجة لأي تخزين خارجي، ويعمل محليًا وعلى Vercel مباشرة.
- من لوحة التحكم يمكنك: رفع صور القهوة من جهازك، حذفها، تعديلها/استبدالها،
  إضافة/تعديل/حذف الوصفات، وكتابة اسم المحصول والمحمصة وطريقة التحضير والسعر والوصف.
- **لا تُوضع أي صور افتراضية في الكود** — كل صورة يرفعها المالك، والوصفة بلا صورة
  تعرض شكلًا بديلًا أنيقًا بشعار الموقع.

## ملاحظات

- **Prisma على Vercel:** مخطط `schema.prisma` يتضمّن `binaryTargets = ["native", "rhel-openssl-3.0.x"]`
  لتفادي خطأ محرّك Prisma على بيئة Vercel الخادمة.
- **الصور:** الوصفات تستخدم روابط صور خارجية عبر وسم `<img>` عادي، فلا حاجة لضبط نطاقات `next/image`.
- **الأمان:** لا ترفع ملف `.env` أبدًا — هو مُتجاهَل في `.gitignore`. المفاتيح العامة (`NEXT_PUBLIC_*`)
  آمنة للكشف في المتصفح، لكن رابط قاعدة البيانات وكلمة المرور يجب أن يبقيا في متغيّرات البيئة فقط.
