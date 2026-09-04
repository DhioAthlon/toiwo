import Link from "next/link";
import { Media } from "@/components/Media";
import { PlayIcon } from "@/components/icons";
import type { Project, FilmProject } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <div className="overflow-hidden aspect-[4/5]">
        <Media
          imageId={project.coverImageId}
          tone={project.tone}
          alt={project.title}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl">{project.title}</h3>
          <p className="text-sm text-muted mt-1">
            {project.location} — {project.year}
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.15em] text-muted whitespace-nowrap mt-1">
          {project.category}
        </span>
      </div>
    </Link>
  );
}

export function FilmCard({ film }: { film: FilmProject }) {
  const thumbnail = film.youtubeId
    ? `https://i.ytimg.com/vi/${film.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <Link href={`/videography/${film.slug}`} className="group block">
      <div className="relative overflow-hidden aspect-video">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element -- YouTube-hosted thumbnail, not a Cloudinary/Next asset
          <img
            src={thumbnail}
            alt={film.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Media tone={film.tone} label="Video belum ditautkan" className="transition-transform duration-500 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/85 backdrop-blur-sm transition-transform group-hover:scale-110">
            <PlayIcon className="h-5 w-5 translate-x-0.5" />
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl">{film.title}</h3>
          <p className="text-sm text-muted mt-1">
            {film.location} — {film.year}
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.15em] text-muted whitespace-nowrap mt-1">
          {film.type}
        </span>
      </div>
    </Link>
  );
}
