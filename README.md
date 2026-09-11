# Toiwo Studio

Website studio foto & videografi, dibangun dengan Next.js (App Router) + TypeScript + Tailwind CSS v4. Strukturnya terinspirasi dari layout [moire-photo.com](https://www.moire-photo.com/): nav Projects / Videography / Photographer, hero slider, galeri karya, dan tombol WhatsApp mengambang.

Semua **teks & data** (judul project, deskripsi, nama tim, dll) disimpan di **Supabase** dan diedit lewat dashboard-nya (Table Editor, seperti spreadsheet) — tidak perlu sentuh kode. **Foto** dikelola lewat **Cloudinary**. **Video** cukup tautkan dari **YouTube** (tidak perlu upload file video ke website). Selama kredensial belum diisi, situs tetap jalan normal memakai data contoh bawaan.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Menyambungkan Supabase (teks & data)

1. Buat project baru di [supabase.com](https://supabase.com) (gratis).
2. Buka **SQL Editor** di dashboard Supabase → New query → tempel isi file [`supabase/schema.sql`](supabase/schema.sql) dari repo ini → **Run**. Ini akan membuat semua tabel (`projects`, `films`, `team_members`, `stats`, `site_settings`), mengaktifkan keamanan baca-saja untuk publik, dan mengisi data contoh yang sama seperti yang tampil di situs sekarang.
3. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**.
4. Copy `.env.local.example` menjadi `.env.local`, lalu isi:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
5. Restart `npm run dev`. Situs sekarang membaca dari Supabase.

**Cara edit konten:** buka **Table Editor** di dashboard Supabase, pilih tabel (`projects`, `films`, `team_members`, `stats`, atau `site_settings`), lalu edit baris seperti spreadsheet. Tambah baris baru = tambah project/film/anggota tim baru. Hapus atau uncentang `published` untuk menyembunyikan tanpa menghapus. Perubahan muncul di situs dalam ±60 detik (tanpa perlu deploy ulang).

Kolom penting:
- `projects.cover_image_id` & `gallery_image_ids` — Cloudinary public ID (lihat bagian Cloudinary di bawah).
- `films.youtube_id` — cuma ID video-nya, bagian setelah `v=` di URL YouTube (`https://youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`).
- `team_members.photo_id` — Cloudinary public ID.
- `site_settings.logo_id` — Cloudinary public ID logo horizontal buat navbar (versi gelap/normal, dipakai setelah discroll). Kosongkan (`null`) untuk tampilkan `short_name` sebagai teks; kalau punya project Supabase lama (sebelum kolom ini ada), jalankan ulang `supabase/schema.sql` sekali lagi — sudah aman di-run berkali-kali (`alter table ... add column if not exists`).
- `site_settings.logo_light_id` — Cloudinary public ID logo versi terang/putih, dipakai saat navbar masih transparan di atas foto hero (sebelum discroll). Upload versi putih dari logo kamu ke Cloudinary lalu tempel Public ID-nya di sini. Kosongkan kalau belum punya versi putih — situs otomatis "memutihkan" `logo_id` pakai filter CSS sebagai gantinya.

## Menyambungkan Cloudinary (foto)

1. Buat akun di [cloudinary.com](https://cloudinary.com) (gratis).
2. Di halaman Dashboard, salin **Cloud name**.
3. Tambahkan ke `.env.local`:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   ```
4. Upload foto lewat **Media Library** di dashboard Cloudinary (drag & drop). Setiap file punya **Public ID** (terlihat di panel detail file, atau di URL-nya) — misalnya `toiwo/senja-uluwatu-1`.
5. Tempel Public ID itu ke kolom yang sesuai di Supabase (`cover_image_id`, `gallery_image_ids`, atau `photo_id`). Foto langsung muncul di situs, otomatis dioptimasi (format & ukuran) oleh Cloudinary.

Selama sebuah item belum punya Public ID, situs menampilkan blok warna netral sebagai placeholder — bukan gambar rusak.

## Video dari YouTube

Upload video seperti biasa ke channel YouTube kamu, lalu salin **ID video**-nya (11 karakter setelah `v=` di URL) ke kolom `films.youtube_id` di Supabase. Di situs, video tampil sebagai thumbnail yang baru memuat player asli saat diklik (supaya halaman tetap ringan).

## Struktur halaman

- `/` — Home: hero slider, intro studio, karya pilihan, teaser videography & tim, CTA.
- `/projects` — Galeri project foto dengan filter kategori (Wedding, Prewedding, Engagement, Family).
- `/projects/[slug]` — Detail satu project + galeri slider + navigasi project sebelum/berikutnya.
- `/videography` — Galeri film/video.
- `/videography/[slug]` — Detail satu film (embed YouTube) + galeri behind-the-scenes.
- `/photographer` — Cerita studio, statistik, dan profil tim.

## Arsitektur data

- `src/lib/supabase.ts` — client Supabase (null kalau env var belum diisi).
- `src/lib/cloudinary.ts` — helper bikin URL gambar Cloudinary dari Public ID.
- `src/lib/content.ts` — semua fungsi pengambilan data (`getProjects`, `getFilms`, `getTeam`, dst). Setiap fungsi otomatis fallback ke data contoh kalau Supabase belum tersambung atau query gagal — situs tidak akan pernah crash karena ini.
- `src/components/Media.tsx` — render foto Cloudinary kalau ada Public ID, atau blok placeholder kalau belum.
- `src/components/YouTubeEmbed.tsx` — thumbnail YouTube yang baru load iframe saat diklik.
- `src/app/icon.jpg` & `src/app/apple-icon.jpg` — ikon tab browser / home screen. Ini file statis, di-hardcode di repo (bukan lewat Supabase/Cloudinary) karena jarang berubah dan browser cache-nya agresif — ganti file ini langsung kalau mau ganti logo tab.

## Deploy

Project ini siap di-deploy ke Vercel (atau platform Next.js apa pun). Jangan lupa isi 3 environment variable di atas (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`) di pengaturan project Vercel juga (Settings → Environment Variables), bukan cuma di `.env.local`.
