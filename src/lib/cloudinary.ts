// Builds Cloudinary delivery URLs from a public ID stored in Supabase.
// No SDK needed — Cloudinary serves transformed images straight from a URL.
// f_auto/q_auto let Cloudinary pick the best format (avif/webp) and quality
// per browser automatically.

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const isCloudinaryConfigured = Boolean(cloudName);

export function cloudinaryUrl(
  publicId: string,
  { width = 1200 }: { width?: number } = {}
) {
  if (!cloudName) return null;
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_${width}/${publicId}`;
}
