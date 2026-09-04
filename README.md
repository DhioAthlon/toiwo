# Toiwo Studio

Website studio foto & videografi, dibangun dengan Next.js (App Router) + TypeScript + Tailwind CSS v4. Strukturnya terinspirasi dari layout [moire-photo.com](https://www.moire-photo.com/): nav Projects / Videography / Photographer, hero slider, galeri karya, dan tombol WhatsApp mengambang.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Struktur halaman

- `/` — Home: hero slider, intro studio, karya pilihan, teaser videography & tim, CTA.
- `/projects` — Galeri project foto dengan filter kategori (Wedding, Prewedding, Engagement, Family).
- `/projects/[slug]` — Detail satu project + galeri slider + navigasi project sebelum/berikutnya.
- `/videography` — Galeri film/video.
- `/videography/[slug]` — Detail satu film (placeholder player) + galeri behind-the-scenes.
- `/photographer` — Cerita studio, statistik, dan profil tim.

## Yang perlu diganti sebelum go-live

Semua foto saat ini adalah **placeholder** (blok gradien) — belum ada aset asli. Yang perlu diisi:

1. **Konten & data**: edit `src/lib/site-config.ts` (nomor WhatsApp, email, link sosial media) dan `src/lib/data.ts` (daftar project, film, tim, statistik).
2. **Foto & video asli**: taruh file di `public/images/` lalu ganti komponen `<PlaceholderImage />` di `src/components/PlaceholderImage.tsx` / tempat pemakaiannya dengan `next/image` yang menunjuk ke file asli. `src/components/Slider.tsx` juga perlu menerima array URL gambar, bukan hanya jumlah slide.
3. **Nomor WhatsApp**: ganti `whatsappNumber` di `site-config.ts` dengan nomor asli (format internasional tanpa "+" atau angka 0 di depan, contoh: `6281234567890`).
4. **Video player**: halaman `/videography/[slug]` masih pakai placeholder tombol play — sambungkan ke player asli (mis. embed YouTube/Vimeo atau `<video>` tag) setelah file video tersedia.

## Deploy

Project ini siap di-deploy ke platform apa pun yang mendukung Next.js (Vercel, Netlify, atau self-hosted dengan `npm run build && npm run start`).
