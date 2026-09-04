import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Slider } from "@/components/Slider";
import { ArrowIcon } from "@/components/icons";
import { projects } from "@/lib/data";
import { whatsappHref } from "@/lib/site-config";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.excerpt };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-4xl px-6 text-center mb-14">
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">
          {project.category} — {project.location}, {project.year}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl leading-tight mb-6">{project.title}</h1>
        <p className="text-muted max-w-xl mx-auto leading-relaxed">{project.story}</p>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <Slider count={project.imageCount} toneStart={project.tone} aspect="aspect-[16/10]" labelPrefix={project.title} />
      </div>

      <div className="mx-auto max-w-4xl px-6 mt-20 text-center">
        <a
          href={whatsappHref(`Halo, saya suka sesi "${project.title}" dan ingin tanya paket serupa.`)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-3.5 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
        >
          Tanya Paket Serupa
        </a>
      </div>

      <div className="mx-auto max-w-5xl px-6 mt-24 grid grid-cols-2 gap-6 border-t border-line pt-10">
        <Link href={`/projects/${prev.slug}`} className="group">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted">
            <ArrowIcon className="h-4 w-4 rotate-180" /> Sebelumnya
          </span>
          <p className="font-display text-lg mt-2 group-hover:opacity-60 transition-opacity">{prev.title}</p>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="inline-flex items-center justify-end gap-2 text-xs uppercase tracking-[0.15em] text-muted">
            Berikutnya <ArrowIcon className="h-4 w-4" />
          </span>
          <p className="font-display text-lg mt-2 group-hover:opacity-60 transition-opacity">{next.title}</p>
        </Link>
      </div>
    </div>
  );
}
