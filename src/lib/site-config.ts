// Central place to edit studio identity, contact numbers and social links.
// Replace the placeholder values here once real brand assets are ready.

export const siteConfig = {
  name: "Toiwo Studio",
  shortName: "TOIWO",
  tagline: "Merekam emosi, menjadi karya abadi.",
  description:
    "Toiwo Studio adalah studio foto & videografi yang mengabadikan momen pernikahan, prewedding, dan perjalanan cinta menjadi karya visual yang jujur dan personal.",
  // Use international format without "+" or leading zero, e.g. 62812xxxxxxx
  whatsappNumber: "6281234567890",
  whatsappDefaultMessage:
    "Halo Toiwo Studio, saya ingin bertanya tentang paket foto & video.",
  email: "hello@toiwostudio.com",
  location: "Jakarta, Indonesia",
  social: {
    instagram: "https://instagram.com/toiwostudio",
    youtube: "https://youtube.com/@toiwostudio",
    facebook: "https://facebook.com/toiwostudio",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Videography", href: "/videography" },
    { label: "Photographer", href: "/photographer" },
  ],
};

export function whatsappHref(message?: string) {
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}
