import Link from "next/link";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Slider } from "@/components/Slider";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowIcon, PlayIcon } from "@/components/icons";
import { projects, team } from "@/lib/data";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Slider count={5} aspect="aspect-auto h-[92vh] min-h-[560px]" labelPrefix="Hero" autoPlayMs={6000} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-ink/5 to-ink/10" />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-paper/80 text-xs uppercase tracking-[0.3em] mb-4">
            Photography &amp; Videography Studio
          </p>
          <h1 className="font-display italic text-4xl sm:text-6xl md:text-7xl text-paper leading-tight max-w-3xl">
            {siteConfig.tagline}
          </h1>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 border border-paper/70 text-paper px-7 py-3 text-sm uppercase tracking-[0.15em] hover:bg-paper hover:text-ink transition-colors"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid gap-12 md:grid-cols-2 items-center">
        <PlaceholderImage tone={2} className="aspect-[4/5] order-2 md:order-1" />
        <div className="order-1 md:order-2">
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Tentang Kami</p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-6">
            Setiap momen punya jiwa. Kami di sini untuk merekamnya.
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            {siteConfig.name} telah mendampingi lebih dari 480 pasangan mengabadikan
            perjalanan cinta mereka selama satu dekade terakhir — dari prosesi adat
            yang sakral hingga sesi prewedding di ujung dunia.
          </p>
          <Link
            href="/photographer"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
          >
            Kenali Tim Kami <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <SectionHeading kicker="Portofolio" title="Karya Pilihan" />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity whitespace-nowrap"
          >
            Lihat Semua Projects <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Videography teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32 grid gap-12 md:grid-cols-2 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Videography</p>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight mb-6">
            Gerakan &amp; suara yang menghidupkan kembali setiap momen.
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md">
            Dari film pernikahan sinematik hingga highlight reel singkat, tim
            videografi kami menangkap emosi yang tidak selalu bisa ditangkap
            oleh foto diam.
          </p>
          <Link
            href="/videography"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] hover:opacity-60 transition-opacity"
          >
            Tonton Karya Video <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <Link href="/videography" className="group relative block overflow-hidden">
          <PlaceholderImage
            tone={3}
            className="aspect-video transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/85 backdrop-blur-sm transition-transform group-hover:scale-110">
              <PlayIcon className="h-6 w-6 translate-x-0.5" />
            </span>
          </div>
        </Link>
      </section>

      {/* Team teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading kicker="Di Balik Layar" title="Tim Toiwo Studio" align="center" className="mb-14" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <Link key={member.slug} href="/photographer" className="group block text-center">
              <PlaceholderImage
                tone={member.tone}
                className="aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
              />
              <h3 className="font-display text-lg mt-4">{member.name}</h3>
              <p className="text-xs uppercase tracking-[0.12em] text-muted mt-1">{member.role}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-paper/60 mb-4">Mari Berkarya Bersama</p>
          <h2 className="font-display italic text-3xl sm:text-5xl leading-tight mb-10">
            Ceritamu layak diabadikan dengan cara yang paling jujur.
          </h2>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-paper text-ink px-8 py-3.5 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
          >
            Chat via WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
