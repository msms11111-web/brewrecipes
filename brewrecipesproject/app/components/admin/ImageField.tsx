"use client";

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Upload, ImagePlus, Trash2, Loader2, Check, X } from 'lucide-react';
import { uploadMedia } from '@/lib/media-actions';
import type { MediaAsset } from '@/app/types';
import RecipeImage from '../RecipeImage';

// Image chooser for the recipe form: pick an existing Media Library image or
// upload a new one from the device. Writes the chosen URL into a hidden input
// so the surrounding server-action <form> submits it.
export default function ImageField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string | null;
}) {
  const [value, setValue] = useState<string | null>(defaultValue ?? null);
  const [browsing, setBrowsing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadMedia(fd);
      if (res.ok) {
        setValue(`/api/media/${res.id}`);
        toast.success('تم رفع الصورة وربطها بالوصفة');
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error('تعذّر رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="hidden" name={name} value={value ?? ''} />

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-40 h-28 rounded-2xl overflow-hidden border border-[var(--border)] shrink-0">
          <RecipeImage src={value} alt="صورة الوصفة" />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="btn btn-primary text-sm px-4 py-2.5"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            رفع من الجهاز
          </button>
          <button
            type="button"
            onClick={() => setBrowsing(true)}
            className="btn btn-secondary text-sm px-4 py-2.5"
          >
            <ImagePlus className="w-4 h-4" /> اختر من المكتبة
          </button>
          {value && (
            <button
              type="button"
              onClick={() => setValue(null)}
              className="btn btn-secondary text-sm px-4 py-2.5 text-red-600"
            >
              <Trash2 className="w-4 h-4" /> إزالة
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleUpload(f);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {browsing && (
        <MediaBrowser
          current={value}
          onClose={() => setBrowsing(false)}
          onSelect={(url) => {
            setValue(url);
            setBrowsing(false);
          }}
        />
      )}
    </div>
  );
}

function MediaBrowser({
  current,
  onSelect,
  onClose,
}: {
  current: string | null;
  onSelect: (url: string) => void;
  onClose: () => void;
}) {
  const [items, setItems] = useState<MediaAsset[] | null>(null);

  useEffect(() => {
    fetch('/api/media')
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
      <div
        className="bg-[var(--card)] rounded-3xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h3 className="font-semibold text-lg">اختر صورة من المكتبة</h3>
          <button onClick={onClose} aria-label="إغلاق" className="p-2 hover:bg-[var(--muted)] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {items === null ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /></div>
          ) : items.length === 0 ? (
            <p className="text-center py-12 text-sm opacity-60">لا توجد صور بعد — ارفع صورة من زر «رفع من الجهاز» أو من مكتبة الصور.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {items.map((m) => {
                const selected = current === m.url;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onSelect(m.url)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selected ? 'border-[var(--accent)]' : 'border-transparent hover:border-[var(--accent)]/50'
                    }`}
                  >
                    <img src={m.url} alt={m.alt ?? m.filename} className="w-full h-full object-cover" />
                    {selected && (
                      <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
