-- Toiwo Studio — Supabase schema
-- Run this once in your Supabase project's SQL Editor (Dashboard → SQL Editor → New query).
-- It creates the tables that back the website's content, turns on Row Level
-- Security so only *published* rows are readable by the public website, and
-- seeds each table with the same content currently shown on the live site.

-- === site_settings ===========================================================
-- A single row holding studio-wide info (WhatsApp number, social links, etc).
create table if not exists site_settings (
  id int primary key default 1,
  studio_name text not null default 'Toiwo Studio',
  short_name text not null default 'TOIWO',
  tagline text not null default 'Merekam emosi, menjadi karya abadi.',
  description text,
  whatsapp_number text not null default '6281234567890',
  whatsapp_message text default 'Halo Toiwo Studio, saya ingin bertanya tentang paket foto & video.',
  email text,
  location text,
  instagram_url text,
  youtube_url text,
  facebook_url text,
  maps_link text,        -- shareable Google Maps link (maps.app.goo.gl/... or full URL)
  maps_embed_url text,   -- the "src" URL from Google Maps' Share → Embed a map iframe
  constraint site_settings_single_row check (id = 1)
);

-- === projects (photo galleries) =============================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Wedding', 'Prewedding', 'Engagement', 'Family')),
  location text,
  year text,
  excerpt text,
  story text,
  cover_image_id text,        -- Cloudinary public ID, e.g. "toiwo/senja-uluwatu/cover"
  gallery_image_ids text[] default '{}', -- ordered list of Cloudinary public IDs
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- === films (videography) ====================================================
create table if not exists films (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null check (type in ('Wedding Film', 'Highlight Reel', 'Cinematic Teaser')),
  location text,
  year text,
  youtube_id text not null,   -- just the 11-char video ID from the YouTube URL
  excerpt text,
  gallery_image_ids text[] default '{}', -- behind-the-scenes stills (Cloudinary IDs)
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- === team_members (photographer page) =======================================
create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  role text not null,
  bio text,
  photo_id text,               -- Cloudinary public ID
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

-- === stats (photographer page counters) =====================================
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  sort_order int not null default 0
);

-- === Row Level Security =======================================================
-- The website connects with the public "anon" key, which can ONLY read rows
-- marked published = true. Editing always happens from the Supabase Studio
-- Table Editor (or SQL Editor) while logged in as a project member — that
-- access bypasses RLS entirely, so no separate "write" policy is needed.

alter table site_settings enable row level security;
drop policy if exists "Public can read site settings" on site_settings;
create policy "Public can read site settings" on site_settings for select using (true);

alter table projects enable row level security;
drop policy if exists "Public can read published projects" on projects;
create policy "Public can read published projects" on projects for select using (published = true);

alter table films enable row level security;
drop policy if exists "Public can read published films" on films;
create policy "Public can read published films" on films for select using (published = true);

alter table team_members enable row level security;
drop policy if exists "Public can read published team members" on team_members;
create policy "Public can read published team members" on team_members for select using (published = true);

alter table stats enable row level security;
drop policy if exists "Public can read stats" on stats;
create policy "Public can read stats" on stats for select using (true);

-- === Seed data ================================================================
-- Same placeholder content the site launched with, so the tables aren't empty.
-- cover_image_id / photo_id / gallery_image_ids are left blank — the site
-- falls back to a neutral placeholder block until you upload real photos to
-- Cloudinary and paste their public IDs in here.

insert into site_settings (id, studio_name, short_name, tagline, description, whatsapp_number, whatsapp_message, email, location, instagram_url, youtube_url, facebook_url, maps_link, maps_embed_url)
values (
  1,
  'Toiwo Studio',
  'TOIWO',
  'Merekam emosi, menjadi karya abadi.',
  'Toiwo Studio adalah studio foto & videografi yang mengabadikan momen pernikahan, prewedding, dan perjalanan cinta menjadi karya visual yang jujur dan personal.',
  '6289501655435',
  'Halo Toiwo Studio, saya ingin bertanya tentang paket foto & video.',
  'toiwostudio@gmail.com',
  'Malang, Indonesia',
  'https://instagram.com/toiwostudio',
  'https://youtube.com/@toiwostudio',
  'https://www.facebook.com/profile.php?id=61568850235362',
  'https://maps.app.goo.gl/gvTnU5d37W3KqFej8',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.514578820023!2d112.6360163!3d-7.9456555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd629628a3819d7%3A0x48401ca1f18f19c0!2sToiwo%20House%2C%20Coffee%20%26%20Asian%20Eatery!5e0!3m2!1sen!2sid!4v1788507321702!5m2!1sen!2sid'
)
on conflict (id) do nothing;

insert into projects (slug, title, category, location, year, excerpt, story, sort_order) values
  ('senja-di-uluwatu', 'Senja di Uluwatu', 'Prewedding', 'Uluwatu, Bali', '2025', 'Dua jiwa, satu janji, di antara tebing dan ombak senja.', 'Sesi prewedding ini digarap saat golden hour di tebing Uluwatu, memanfaatkan cahaya alami dan angin laut untuk menghadirkan gerakan yang jujur dan tidak dibuat-buat.', 0),
  ('pernikahan-adat-jawa', 'Pernikahan Adat Jawa', 'Wedding', 'Yogyakarta', '2025', 'Prosesi sakral yang dirangkai menjadi narasi visual yang hangat.', 'Dari prosesi siraman hingga panggih, kami mengikuti setiap detail adat tanpa mengganggu jalannya acara, menghasilkan dokumentasi yang mengalir seperti cerita.', 1),
  ('lamaran-di-kebun-teh', 'Lamaran di Kebun Teh', 'Engagement', 'Puncak, Bogor', '2024', 'Kejutan lamaran di tengah kabut pagi kebun teh.', 'Kami berkoordinasi diam-diam dengan calon mempelai pria untuk mengabadikan momen kejutan lamaran tanpa terdeteksi, menjaga keaslian reaksi yang terekam.', 2),
  ('reuni-keluarga-besar', 'Reuni Keluarga Besar', 'Family', 'Bandung', '2024', 'Tiga generasi berkumpul dalam satu bingkai cerita.', 'Sesi foto keluarga besar ini dirancang santai dan tidak kaku, membiarkan interaksi natural antar generasi menjadi fokus utama setiap frame.', 3),
  ('janji-di-atas-awan', 'Janji di Atas Awan', 'Prewedding', 'Bromo, Jawa Timur', '2024', 'Sunrise session di lautan pasir dengan latar Gunung Bromo.', 'Berangkat sebelum subuh, tim mengejar cahaya pertama matahari terbit untuk menghasilkan siluet dan warna langit yang dramatis namun tetap hangat.', 4),
  ('resepsi-tepi-pantai', 'Resepsi Tepi Pantai', 'Wedding', 'Gili Trawangan', '2023', 'Resepsi intim beralaskan pasir putih dan suara ombak.', 'Dengan tamu terbatas dan suasana intim, kami fokus pada momen-momen kecil: genggaman tangan, tawa lepas, dan air mata haru orang tua.', 5)
on conflict (slug) do nothing;

-- youtube_id below is a placeholder ("dQw4w9WgXcQ") — replace with your real
-- YouTube video IDs (the part after "v=" in a YouTube URL).
insert into films (slug, title, type, location, year, youtube_id, excerpt, sort_order) values
  ('andra-dan-nadia', 'Andra & Nadia', 'Wedding Film', 'Jakarta', '2025', 'dQw4w9WgXcQ', 'Kisah cinta lima tahun yang berujung pada janji seumur hidup.', 0),
  ('highlight-uluwatu', 'Highlight Uluwatu', 'Highlight Reel', 'Bali', '2025', 'dQw4w9WgXcQ', 'Ringkasan sinematik dari sesi prewedding di tebing Uluwatu.', 1),
  ('rangga-dan-sari', 'Rangga & Sari', 'Wedding Film', 'Yogyakarta', '2024', 'dQw4w9WgXcQ', 'Dokumentasi penuh prosesi adat Jawa dari pagi hingga malam.', 2),
  ('teaser-kebun-teh', 'Teaser Kebun Teh', 'Cinematic Teaser', 'Puncak, Bogor', '2024', 'dQw4w9WgXcQ', 'Cuplikan singkat momen lamaran di tengah kabut pagi.', 3)
on conflict (slug) do nothing;

insert into team_members (slug, name, role, bio, sort_order) values
  ('raka-pratama', 'Raka Pratama', 'Lead Photographer & Founder', 'Memulai Toiwo Studio pada 2014 dengan satu kamera dan keyakinan bahwa setiap pasangan punya cerita yang layak diabadikan dengan jujur.', 0),
  ('dian-anjani', 'Dian Anjani', 'Lead Videographer', 'Menggabungkan latar belakang sinematografi dengan kepekaan human interest untuk menghasilkan film pernikahan yang terasa hidup.', 1),
  ('bimo-satrio', 'Bimo Satrio', 'Photographer', 'Spesialis candid moment, selalu berada di tempat yang tepat untuk menangkap ekspresi yang tak terulang.', 2),
  ('kirana-putri', 'Kirana Putri', 'Client Experience Lead', 'Memastikan setiap klien merasa nyaman dari konsultasi pertama hingga album foto sampai di tangan.', 3)
on conflict (slug) do nothing;

insert into stats (label, value, sort_order) values
  ('Tahun Pengalaman', '10+', 0),
  ('Pasangan Terdokumentasi', '480+', 1),
  ('Kota & Destinasi', '35+', 2),
  ('Penghargaan Industri', '6', 3)
on conflict do nothing;
