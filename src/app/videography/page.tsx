import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { FilmCard } from "@/components/ProjectCard";
import { getFilms } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Videography",
  description: "Film pernikahan sinematik dan highlight reel.",
};

export default async function VideographyPage() {
  const films = await getFilms();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <SectionHeading kicker="Videography" title="Karya Video" className="mb-4" />
      <p className="text-muted max-w-lg mb-14">
        Film pernikahan, highlight reel, dan cinematic teaser yang menangkap
        gerak dan suara di balik setiap momen.
      </p>
      {films.length === 0 ? (
        <p className="text-muted">Belum ada video yang ditambahkan.</p>
      ) : (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {films.map((film) => (
            <FilmCard key={film.slug} film={film} />
          ))}
        </div>
      )}
    </div>
  );
}
