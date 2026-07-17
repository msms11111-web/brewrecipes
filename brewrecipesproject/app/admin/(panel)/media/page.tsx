import MediaLibraryClient from '@/app/components/admin/MediaLibraryClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'مكتبة الصور | لوحة التحكم',
};

export default function MediaPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10">
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">مكتبة الصور</h1>
        <p className="opacity-60 mt-1">أنت المسؤول الوحيد عن صور القهوة — ارفعها، عدّلها، أو احذفها من هنا.</p>
      </header>

      <MediaLibraryClient />
    </div>
  );
}
