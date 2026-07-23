import { Coffee } from 'lucide-react';

// Renders an uploaded image, or a branded CSS placeholder when a recipe has
// no image yet. No stock/default photos ever ship in the code — the owner
// uploads every image through the Media Library.
export default function RecipeImage({
  src,
  alt,
  className = '',
  rounded = '',
}: {
  src?: string | null;
  alt: string;
  className?: string;
  rounded?: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[oklch(33%_0.05_88)] via-[oklch(27%_0.05_120)] to-[oklch(21%_0.04_155)] text-[var(--accent)] ${rounded}`}
      role="img"
      aria-label={alt}
    >
      <Coffee className="w-10 h-10 opacity-70" />
      <span className="text-[11px] tracking-[2px] uppercase opacity-50">قَطرَة</span>
    </div>
  );
}
