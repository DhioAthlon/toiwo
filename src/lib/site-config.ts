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
  mapsLink: string | null;
  mapsEmbedUrl: string | null;
};

// Used when Supabase isn't configured yet, and as a safety net for any field
// left blank in the site_settings row.
export const defaultSiteSettings: SiteSettings = {
  studioName: "Toiwo Studio",
  shortName: "TOIWO",
  tagline: "Merekam emosi, menjadi karya abadi.",
  description:
    "Toiwo Studio adalah studio foto & videografi yang mengabadikan momen pernikahan, prewedding, dan perjalanan cinta menjadi karya visual yang jujur dan personal.",
  whatsappNumber: "6289501655435",
  whatsappMessage: "Halo Toiwo Studio, saya ingin bertanya tentang paket foto & video.",
  email: "toiwostudio@gmail.com",
  location: "Malang, Indonesia",
  instagramUrl: "https://instagram.com/toiwostudio",
  youtubeUrl: "https://youtube.com/@toiwostudio",
  facebookUrl: "https://www.facebook.com/profile.php?id=61568850235362",
  mapsLink: "https://maps.app.goo.gl/gvTnU5d37W3KqFej8",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.514578820023!2d112.6360163!3d-7.9456555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629628a3819d7%3A0x48401ca1f18f19c0!2sToiwo%20House%2C%20Coffee%20%26%20Asian%20Eatery!5e0!3m2!1sen!2sid!4v1788507321702!5m2!1sen!2sid",
};

export function whatsappHref(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
