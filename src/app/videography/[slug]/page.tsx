import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Slider } from "@/components/Slider";
import { PlayIcon, ArrowIcon } from "@/components/icons";
import { films } from "@/lib/data";
import { whatsappHref } from "@/lib/site-config";

export function generateStaticParams() {
  return films.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = films.find((f) => f.slug === slug);
  if (!film) return {};
  return { title: film.title, description: film.excerpt };
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = films.findIndex((f) => f.slug === slug);
  if (index === -1) notFound();

  const film = films[index];
  const prev = films[(index - 1 + films.length) % films.length];
  const next = films[(index + 1) % films.length];

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
        <div className="relative">
          <PlaceholderImage tone={film.tone} className="aspect-video" iconClassName="h-12 w-12" />
          <button
            aria-label="Putar video"
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-paper/85 backdrop-blur-sm transition-transform group-hover:scale-110">
              <PlayIcon className="h-7 w-7 translate-x-0.5" />
            </span>
          </button>
          <span className="absolute bottom-4 right-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-paper">
            {film.duration}
          </span>
        </div>
        <p className="text-xs text-muted text-center mt-3">
          Pemutar video akan aktif setelah file asli diunggah.
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-6 mt-20">
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-6 text-center">
          Behind The Scenes
        </p>
        <Slider count={film.stillCount} toneStart={film.tone + 1} aspect="aspect-[16/10]" labelPrefix="BTS" />
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-20 text-center">
        <a
          href={whatsappHref(`Halo, saya suka film "${film.title}" dan ingin tanya paket videography.`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-3.5 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
        >
          Tanya Paket Videography
        </a>
      </div>

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
    </div>
  );
}
