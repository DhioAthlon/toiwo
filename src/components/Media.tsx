import { cloudinaryUrl } from "@/lib/cloudinary";
import { PlaceholderImage } from "@/components/PlaceholderImage";

/**
 * Renders a real Cloudinary photo when `imageId` (a Cloudinary public ID) is
 * set, otherwise falls back to a neutral placeholder block. This is the
 * building block every gallery/card/hero image in the site goes through, so
 * uploading real photos to Cloudinary and pasting their public ID into the
 * matching Supabase row is enough to replace a placeholder — no code change.
 */
export function Media({
  imageId,
  tone = 0,
  label,
  width = 1200,
  alt = "",
  className = "",
}: {
  imageId?: string | null;
  tone?: number;
  label?: string;
  width?: number;
  alt?: string;
  className?: string;
}) {
  const url = imageId ? cloudinaryUrl(imageId, { width }) : null;

  if (url) {
    // eslint-disable-next-line @next/next/no-img-element -- Cloudinary already
    // serves optimized, responsive-ready images via URL params (f_auto,q_auto).
    return (
      <img
        src={url}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover block ${className}`}
      />
    );
  }

  return <PlaceholderImage tone={tone} label={label} className={className} />;
}
