// Every piece of editable site content flows through this file. Each getter
// tries Supabase first and falls back to bundled placeholder content when
// Supabase isn't configured yet (or a query fails) — so the site always
// renders, before and after the database is wired up.

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { defaultSiteSettings, type SiteSettings } from "@/lib/site-config";

// A small stable "which gradient tint" hash so DB rows without an uploaded
// photo still get a varied, consistent placeholder instead of always tone 0.
function toneFromString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash % 5;
}

export type Category = "Wedding" | "Prewedding" | "Engagement" | "Family";
export const categories: readonly ("All" | Category)[] = [
  "All",
  "Wedding",
  "Prewedding",
  "Engagement",
  "Family",
];

export type Project = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  year: string;
  excerpt: string;
  story: string;
  coverImageId: string | null;
  galleryImageIds: string[];
  tone: number;
};

export type FilmType = "Wedding Film" | "Highlight Reel" | "Cinematic Teaser";

export type FilmProject = {
  slug: string;
  title: string;
  type: FilmType;
  location: string;
  year: string;
  youtubeId: string;
  excerpt: string;
  galleryImageIds: string[];
  tone: number;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photoId: string | null;
  tone: number;
};

export type Stat = { label: string; value: string };

// ---------------------------------------------------------------------------
// Fallback content — identical to what the site launched with, used whenever
// Supabase isn't reachable yet.

const FALLBACK_PROJECTS: Project[] = [
  { slug: "senja-di-uluwatu", title: "Senja di Uluwatu", category: "Prewedding", location: "Uluwatu, Bali", year: "2025", excerpt: "Dua jiwa, satu janji, di antara tebing dan ombak senja.", story: "Sesi prewedding ini digarap saat golden hour di tebing Uluwatu, memanfaatkan cahaya alami dan angin laut untuk menghadirkan gerakan yang jujur dan tidak dibuat-buat.", coverImageId: null, galleryImageIds: Array(8).fill(""), tone: 0 },
  { slug: "pernikahan-adat-jawa", title: "Pernikahan Adat Jawa", category: "Wedding", location: "Yogyakarta", year: "2025", excerpt: "Prosesi sakral yang dirangkai menjadi narasi visual yang hangat.", story: "Dari prosesi siraman hingga panggih, kami mengikuti setiap detail adat tanpa mengganggu jalannya acara, menghasilkan dokumentasi yang mengalir seperti cerita.", coverImageId: null, galleryImageIds: Array(10).fill(""), tone: 1 },
  { slug: "lamaran-di-kebun-teh", title: "Lamaran di Kebun Teh", category: "Engagement", location: "Puncak, Bogor", year: "2024", excerpt: "Kejutan lamaran di tengah kabut pagi kebun teh.", story: "Kami berkoordinasi diam-diam dengan calon mempelai pria untuk mengabadikan momen kejutan lamaran tanpa terdeteksi, menjaga keaslian reaksi yang terekam.", coverImageId: null, galleryImageIds: Array(6).fill(""), tone: 2 },
  { slug: "reuni-keluarga-besar", title: "Reuni Keluarga Besar", category: "Family", location: "Bandung", year: "2024", excerpt: "Tiga generasi berkumpul dalam satu bingkai cerita.", story: "Sesi foto keluarga besar ini dirancang santai dan tidak kaku, membiarkan interaksi natural antar generasi menjadi fokus utama setiap frame.", coverImageId: null, galleryImageIds: Array(7).fill(""), tone: 3 },
  { slug: "janji-di-atas-awan", title: "Janji di Atas Awan", category: "Prewedding", location: "Bromo, Jawa Timur", year: "2024", excerpt: "Sunrise session di lautan pasir dengan latar Gunung Bromo.", story: "Berangkat sebelum subuh, tim mengejar cahaya pertama matahari terbit untuk menghasilkan siluet dan warna langit yang dramatis namun tetap hangat.", coverImageId: null, galleryImageIds: Array(9).fill(""), tone: 4 },
  { slug: "resepsi-tepi-pantai", title: "Resepsi Tepi Pantai", category: "Wedding", location: "Gili Trawangan", year: "2023", excerpt: "Resepsi intim beralaskan pasir putih dan suara ombak.", story: "Dengan tamu terbatas dan suasana intim, kami fokus pada momen-momen kecil: genggaman tangan, tawa lepas, dan air mata haru orang tua.", coverImageId: null, galleryImageIds: Array(8).fill(""), tone: 0 },
];

const FALLBACK_FILMS: FilmProject[] = [
  { slug: "andra-dan-nadia", title: "Andra & Nadia", type: "Wedding Film", location: "Jakarta", year: "2025", youtubeId: "", excerpt: "Kisah cinta lima tahun yang berujung pada janji seumur hidup.", galleryImageIds: Array(6).fill(""), tone: 1 },
  { slug: "highlight-uluwatu", title: "Highlight Uluwatu", type: "Highlight Reel", location: "Bali", year: "2025", youtubeId: "", excerpt: "Ringkasan sinematik dari sesi prewedding di tebing Uluwatu.", galleryImageIds: Array(5).fill(""), tone: 2 },
  { slug: "rangga-dan-sari", title: "Rangga & Sari", type: "Wedding Film", location: "Yogyakarta", year: "2024", youtubeId: "", excerpt: "Dokumentasi penuh prosesi adat Jawa dari pagi hingga malam.", galleryImageIds: Array(7).fill(""), tone: 3 },
  { slug: "teaser-kebun-teh", title: "Teaser Kebun Teh", type: "Cinematic Teaser", location: "Puncak, Bogor", year: "2024", youtubeId: "", excerpt: "Cuplikan singkat momen lamaran di tengah kabut pagi.", galleryImageIds: Array(4).fill(""), tone: 4 },
];

const FALLBACK_TEAM: TeamMember[] = [
  { slug: "raka-pratama", name: "Raka Pratama", role: "Lead Photographer & Founder", bio: "Memulai Toiwo Studio pada 2014 dengan satu kamera dan keyakinan bahwa setiap pasangan punya cerita yang layak diabadikan dengan jujur.", photoId: null, tone: 0 },
  { slug: "dian-anjani", name: "Dian Anjani", role: "Lead Videographer", bio: "Menggabungkan latar belakang sinematografi dengan kepekaan human interest untuk menghasilkan film pernikahan yang terasa hidup.", photoId: null, tone: 1 },
  { slug: "bimo-satrio", name: "Bimo Satrio", role: "Photographer", bio: "Spesialis candid moment, selalu berada di tempat yang tepat untuk menangkap ekspresi yang tak terulang.", photoId: null, tone: 2 },
  { slug: "kirana-putri", name: "Kirana Putri", role: "Client Experience Lead", bio: "Memastikan setiap klien merasa nyaman dari konsultasi pertama hingga album foto sampai di tangan.", photoId: null, tone: 3 },
];

const FALLBACK_STATS: Stat[] = [
  { label: "Tahun Pengalaman", value: "10+" },
  { label: "Pasangan Terdokumentasi", value: "480+" },
  { label: "Kota & Destinasi", value: "35+" },
  { label: "Penghargaan Industri", value: "6" },
];

// ---------------------------------------------------------------------------
// Row shapes coming back from Supabase (snake_case, as stored).

type ProjectRow = {
  slug: string;
  title: string;
  category: Category;
  location: string | null;
  year: string | null;
  excerpt: string | null;
  story: string | null;
  cover_image_id: string | null;
  gallery_image_ids: string[] | null;
};

type FilmRow = {
  slug: string;
  title: string;
  type: FilmType;
  location: string | null;
  year: string | null;
  youtube_id: string;
  excerpt: string | null;
  gallery_image_ids: string[] | null;
};

type TeamRow = {
  slug: string;
  name: string;
  role: string;
  bio: string | null;
  photo_id: string | null;
};

type StatRow = { label: string; value: string };

type SiteSettingsRow = {
  studio_name: string | null;
  short_name: string | null;
  tagline: string | null;
  description: string | null;
  whatsapp_number: string | null;
  whatsapp_message: string | null;
  email: string | null;
  location: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  facebook_url: string | null;
};

function mapProject(row: ProjectRow): Project {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    location: row.location ?? "",
    year: row.year ?? "",
    excerpt: row.excerpt ?? "",
    story: row.story ?? "",
    coverImageId: row.cover_image_id,
    galleryImageIds: row.gallery_image_ids ?? [],
    tone: toneFromString(row.slug),
  };
}

function mapFilm(row: FilmRow): FilmProject {
  return {
    slug: row.slug,
    title: row.title,
    type: row.type,
    location: row.location ?? "",
    year: row.year ?? "",
    youtubeId: row.youtube_id,
    excerpt: row.excerpt ?? "",
    galleryImageIds: row.gallery_image_ids ?? [],
    tone: toneFromString(row.slug),
  };
}

function mapTeam(row: TeamRow): TeamMember {
  return {
    slug: row.slug,
    name: row.name,
    role: row.role,
    bio: row.bio ?? "",
    photoId: row.photo_id,
    tone: toneFromString(row.slug),
  };
}

function mapSettings(row: SiteSettingsRow | null): SiteSettings {
  if (!row) return defaultSiteSettings;
  return {
    studioName: row.studio_name ?? defaultSiteSettings.studioName,
    shortName: row.short_name ?? defaultSiteSettings.shortName,
    tagline: row.tagline ?? defaultSiteSettings.tagline,
    description: row.description ?? defaultSiteSettings.description,
    whatsappNumber: row.whatsapp_number ?? defaultSiteSettings.whatsappNumber,
    whatsappMessage: row.whatsapp_message ?? defaultSiteSettings.whatsappMessage,
    email: row.email ?? defaultSiteSettings.email,
    location: row.location ?? defaultSiteSettings.location,
    instagramUrl: row.instagram_url ?? defaultSiteSettings.instagramUrl,
    youtubeUrl: row.youtube_url ?? defaultSiteSettings.youtubeUrl,
    facebookUrl: row.facebook_url ?? defaultSiteSettings.facebookUrl,
  };
}

// ---------------------------------------------------------------------------
// Public getters — pages and components call these, never Supabase directly.

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured || !supabase) return defaultSiteSettings;
  const { data, error } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error || !data) return defaultSiteSettings;
  return mapSettings(data as SiteSettingsRow);
}

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_PROJECTS;
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, category, location, year, excerpt, story, cover_image_id, gallery_image_ids")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return FALLBACK_PROJECTS;
  return data.map((row) => mapProject(row as ProjectRow));
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!isSupabaseConfigured || !supabase) {
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, category, location, year, excerpt, story, cover_image_id, gallery_image_ids")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  return mapProject(data as ProjectRow);
}

export async function getFilms(): Promise<FilmProject[]> {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_FILMS;
  const { data, error } = await supabase
    .from("films")
    .select("slug, title, type, location, year, youtube_id, excerpt, gallery_image_ids")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return FALLBACK_FILMS;
  return data.map((row) => mapFilm(row as FilmRow));
}

export async function getFilm(slug: string): Promise<FilmProject | null> {
  if (!isSupabaseConfigured || !supabase) {
    return FALLBACK_FILMS.find((f) => f.slug === slug) ?? null;
  }
  const { data, error } = await supabase
    .from("films")
    .select("slug, title, type, location, year, youtube_id, excerpt, gallery_image_ids")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error || !data) return null;
  return mapFilm(data as FilmRow);
}

export async function getTeam(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_TEAM;
  const { data, error } = await supabase
    .from("team_members")
    .select("slug, name, role, bio, photo_id")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return FALLBACK_TEAM;
  return data.map((row) => mapTeam(row as TeamRow));
}

export async function getStats(): Promise<Stat[]> {
  if (!isSupabaseConfigured || !supabase) return FALLBACK_STATS;
  const { data, error } = await supabase
    .from("stats")
    .select("label, value")
    .order("sort_order", { ascending: true });
  if (error || !data || data.length === 0) return FALLBACK_STATS;
  return data as StatRow[];
}
