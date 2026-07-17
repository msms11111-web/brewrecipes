"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  Upload, Trash2, Loader2, Replace, Pencil, Copy, Check, ImageIcon,
} from 'lucide-react';
import { uploadMedia, deleteMedia, replaceMedia, updateMediaAlt } from '@/lib/media-actions';
import type { MediaAsset } from '@/app/types';

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaLibraryClient() {
  const [items, setItems] = useState<MediaAsset[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const replaceTargetId = useRef<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      const data = await res.json();
      setItems(data.items ?? []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) return;
    setUploading(true);
    let ok = 0;
    for (const file of list) {
      const fd = new FormData();
      fd.append('file', file);
      const res = await uploadMedia(fd);
      if (res.ok) ok++;
      else toast.error(`${file.name}: ${res.error}`);
    }
    setUploading(false);
    if (ok > 0) toast.success(`تم رفع ${ok} صورة`);
    load();
  };

  const handleDelete = async (m: MediaAsset) => {
    if (!confirm('حذف هذه الصورة؟ ستُزال من أي وصفة مرتبطة بها.')) return;
    const res = await deleteMedia(m.id);
    if (res.ok) { toast.success('تم حذف الصورة'); load(); }
    else toast.error(res.error);
  };

  const handleReplace = async (file: File) => {
    const id = replaceTargetId.current;
    if (!id) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await replaceMedia(id, fd);
    if (res.ok) { toast.success('تم استبدال الصورة'); load(); }
    else toast.error(res.error);
    replaceTargetId.current = null;
  };

  return (
    <div>
      {/* Upload dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
        }}
        className={`rounded-3xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)]'
        }`}
      >
        <div className="mx-auto w-14 h-14 rounded-2xl bg-[var(--muted)] flex items-center justify-center mb-4">
          {uploading ? <Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /> : <Upload className="w-6 h-6 text-[var(--accent)]" />}
        </div>
        <p className="font-medium mb-1">اسحب صور القهوة هنا أو</p>
        <button onClick={() => fileRef.current?.click()} className="btn btn-gold px-6 py-2.5 mt-2" disabled={uploading}>
          اختر من جهازك
        </button>
        <p className="text-xs opacity-50 mt-3">JPG, PNG, WEBP, GIF, AVIF — حتى 8 ميجابايت للصورة</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files) uploadFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      <input
        ref={replaceRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleReplace(f); e.target.value = ''; }}
      />

      {/* Grid */}
      <div className="mt-8">
        {items === null ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 opacity-60">
            <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>لا توجد صور في المكتبة بعد. ارفع أول صورة من الأعلى.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">الصور ({items.length})</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((m) => (
                <MediaCard
                  key={m.id}
                  media={m}
                  onDelete={() => handleDelete(m)}
                  onReplace={() => { replaceTargetId.current = m.id; replaceRef.current?.click(); }}
                  onSavedAlt={load}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MediaCard({
  media,
  onDelete,
  onReplace,
  onSavedAlt,
}: {
  media: MediaAsset;
  onDelete: () => void;
  onReplace: () => void;
  onSavedAlt: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [alt, setAlt] = useState(media.alt ?? '');
  const [copied, setCopied] = useState(false);

  const copyUrl = async () => {
    await navigator.clipboard.writeText(media.url);
    setCopied(true);
    toast.success('تم نسخ رابط الصورة');
    setTimeout(() => setCopied(false), 1500);
  };

  const saveAlt = async () => {
    const res = await updateMediaAlt(media.id, alt);
    if (res.ok) { toast.success('تم حفظ الوصف'); setEditing(false); onSavedAlt(); }
    else toast.error(res.error);
  };

  return (
    <div className="card rounded-2xl overflow-hidden group">
      <div className="relative aspect-square bg-[var(--muted)]">
        <img src={media.url} alt={media.alt ?? media.filename} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button onClick={onReplace} title="تعديل / استبدال" className="p-2.5 rounded-xl bg-white/90 text-[#1C1C1C] hover:bg-white">
            <Replace className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing((v) => !v)} title="تعديل الوصف" className="p-2.5 rounded-xl bg-white/90 text-[#1C1C1C] hover:bg-white">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={copyUrl} title="نسخ الرابط" className="p-2.5 rounded-xl bg-white/90 text-[#1C1C1C] hover:bg-white">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button onClick={onDelete} title="حذف" className="p-2.5 rounded-xl bg-red-500/90 text-white hover:bg-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-3">
        {editing ? (
          <div className="space-y-2">
            <input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="وصف الصورة"
              className="input py-2 text-sm"
            />
            <div className="flex gap-2">
              <button onClick={saveAlt} className="btn btn-primary text-xs px-3 py-1.5 flex-1">حفظ</button>
              <button onClick={() => { setEditing(false); setAlt(media.alt ?? ''); }} className="btn btn-secondary text-xs px-3 py-1.5">إلغاء</button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-xs font-medium truncate" title={media.filename}>{media.alt || media.filename}</div>
            <div className="text-[11px] opacity-50 mt-0.5">{formatBytes(media.size)}</div>
          </>
        )}
      </div>
    </div>
  );
}
