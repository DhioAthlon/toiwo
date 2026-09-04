// Static site structure (not editable via Supabase — this is navigation, not
// content). Studio identity (WhatsApp number, tagline, social links, etc.) now
// lives in the `site_settings` table — see lib/content.ts for the fetcher and
// `defaultSiteSettings` below for the fallback used until Supabase is wired up.

export const nav = [
  { label: "Projects", href: "/projects" },
  { label: "Videography", href: "/videography" },
  { label: "Photographer", href: "/photographer" },
];

export type SiteSettings = {
  studioName: string;
  shortName: string;
  tagline: string;
  description: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  location: string;
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
};

// Used when Supabase isn't configured yet, and as a safety net for any field
// left blank in the site_settings row.
export const defaultSiteSettings: SiteSettings = {
  studioName: "Toiwo Studio",
  shortName: "TOIWO",
  tagline: "Merekam emosi, menjadi karya abadi.",
  description:
    "Toiwo Studio adalah studio foto & videografi yang mengabadikan momen pernikahan, prewedding, dan perjalanan cinta menjadi karya visual yang jujur dan personal.",
  whatsappNumber: "6281234567890",
  whatsappMessage: "Halo Toiwo Studio, saya ingin bertanya tentang paket foto & video.",
  email: "hello@toiwostudio.com",
  location: "Jakarta, Indonesia",
  instagramUrl: "https://instagram.com/toiwostudio",
  youtubeUrl: "https://youtube.com/@toiwostudio",
  facebookUrl: "https://facebook.com/toiwostudio",
};

export function whatsappHref(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
