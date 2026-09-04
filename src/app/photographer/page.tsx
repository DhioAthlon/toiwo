import type { Metadata } from "next";
import { Media } from "@/components/Media";
import { SectionHeading } from "@/components/SectionHeading";
import { getTeam, getStats, getSiteSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/site-config";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Photographer",
  description: "Kenali tim fotografer dan videografer di balik studio kami.",
};

export default async function PhotographerPage() {
  const [team, stats, settings] = await Promise.all([
    getTeam(),
    getStats(),
    getSiteSettings(),
  ]);

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Studio story */}
      <div className="mx-auto max-w-6xl px-6 grid gap-12 md:grid-cols-2 items-center mb-24 md:mb-32">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Cerita Kami</p>
          <h1 className="font-display text-3xl sm:text-4xl leading-tight mb-6">
            Lebih dari sekadar kamera — kami hadir untuk merasakan momenmu.
          </h1>
          <p className="text-muted leading-relaxed mb-4 max-w-md">
            {settings.studioName} lahir dari kegemaran sederhana memotret
            reaksi jujur manusia. Sejak itu, kami tumbuh menjadi tim kecil yang
            percaya bahwa dokumentasi terbaik lahir dari kepercayaan, bukan pose.
          </p>
          <p className="text-muted leading-relaxed max-w-md">
            Kami selalu meluangkan waktu untuk mengenal cerita setiap pasangan
            sebelum hari besar tiba, sehingga hasil akhirnya terasa personal —
            bukan sekadar galeri foto yang seragam.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden">
          <Media imageId={team[0]?.photoId} tone={1} alt={settings.studioName} />
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-line bg-ink text-paper mb-24 md:mb-32">
        <div className="mx-auto max-w-6xl px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl sm:text-4xl">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-paper/60 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="Tim Kami" title="Wajah di Balik Lensa" align="center" className="mb-14" />
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.slug}>
              <div className="aspect-[4/5] overflow-hidden">
                <Media imageId={member.photoId} tone={member.tone} alt={member.name} />
              </div>
              <h3 className="font-display text-xl mt-4">{member.name}</h3>
              <p className="text-xs uppercase tracking-[0.12em] text-muted mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-muted leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-3xl px-6 mt-24 md:mt-32 text-center">
        <h2 className="font-display italic text-2xl sm:text-3xl leading-tight mb-8">
          Ingin berkenalan langsung dengan tim kami?
        </h2>
        <a
          href={whatsappHref(
            settings.whatsappNumber,
            `Halo, saya ingin konsultasi dan kenalan dengan tim ${settings.studioName}.`
          )}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-ink text-paper px-8 py-3.5 text-sm uppercase tracking-[0.15em] hover:opacity-90 transition-opacity"
        >
          Chat via WhatsApp
        </a>
      </div>
    </div>
  );
}
