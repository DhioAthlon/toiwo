import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Slider } from "@/components/Slider";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { Media } from "@/components/Media";
import { ArrowIcon } from "@/components/icons";
import { getFilms, getFilm, getSiteSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/site-config";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = await getFilm(slug);
  if (!film) return {};
  return { title: film.title, description: film.excerpt };
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [film, allFilms, settings] = await Promise.all([
    getFilm(slug),
    getFilms(),
    getSiteSettings(),
  ]);
  if (!film) notFound();

  const index = allFilms.findIndex((f) => f.slug === slug);
  const prev = allFilms[(index - 1 + allFilms.length) % allFilms.length];
  const next = allFilms[(index + 1) % allFilms.length];

  const gallery = film.galleryImageIds.map((id) => ({
    imageId: id || null,
    tone: film.tone + 1,
  }));

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-4xl px-6 text-center mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">
          {film.type} — {film.location}, {film.year}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-6">{film.title}</h1>
        <p className="text-muted max-w-xl mx-auto leading-relaxed">{film.excerpt}</p>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {film.youtubeId ? (
          <YouTubeEmbed youtubeId={film.youtubeId} className="aspect-video" />
        ) : (
          <div className="aspect-video overflow-hidden">
            <Media tone={film.tone} label="Video belum ditautkan" />
          </div>
        )}
      </div>

      {gallery.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 mt-20">
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-6 text-center">
            Behind The Scenes
          </p>
          <Slider images={gallery} aspect="aspect-[16/10]" labelPrefix="BTS" />
        </div>
      )}

      <div className="mx-auto max-w-4xl px-6 mt-20 text-center">
        <a
          href={whatsappHref(
            settings.whatsappNumber,
            `Halo, saya suka film "${film.title}" dan ingin tanya paket videography.`
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-3.5 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
        >
          Tanya Paket Videography
        </a>
      </div>

      {allFilms.length > 1 && (
        <div className="mx-auto max-w-5xl px-6 mt-24 grid grid-cols-2 gap-6 border-t border-line pt-10">
          <Link href={`/videography/${prev.slug}`} className="group">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted">
              <ArrowIcon className="h-4 w-4 rotate-180" /> Sebelumnya
            </span>
            <p className="font-display text-lg mt-2 group-hover:opacity-60 transition-opacity">{prev.title}</p>
          </Link>
          <Link href={`/videography/${next.slug}`} className="group text-right">
            <span className="inline-flex items-center justify-end gap-2 text-xs uppercase tracking-[0.15em] text-muted">
              Berikutnya <ArrowIcon className="h-4 w-4" />
            </span>
            <p className="font-display text-lg mt-2 group-hover:opacity-60 transition-opacity">{next.title}</p>
          </Link>
        </div>
      )}
    </div>
  );
}
