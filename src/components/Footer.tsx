import Link from "next/link";
import { getSiteSettings } from "@/lib/content";
import { nav } from "@/lib/site-config";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "@/components/icons";

export async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl tracking-[0.2em]">{settings.shortName}</p>
          <p className="mt-4 max-w-xs text-sm text-muted leading-relaxed">{settings.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="uppercase tracking-[0.18em] text-xs text-muted mb-1">Navigasi</span>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-60 transition-opacity w-fit">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <span className="uppercase tracking-[0.18em] text-xs text-muted mb-1">Kontak</span>
          <a href={`mailto:${settings.email}`} className="hover:opacity-60 transition-opacity w-fit">
            {settings.email}
          </a>
          <span className="text-muted">{settings.location}</span>
          <div className="flex items-center gap-4 mt-2">
            <a href={settings.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5 hover:opacity-60 transition-opacity" />
            </a>
            <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
              <YoutubeIcon className="h-5 w-5 hover:opacity-60 transition-opacity" />
            </a>
            <a href={settings.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon className="h-5 w-5 hover:opacity-60 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {settings.studioName}. All rights reserved.</span>
          <span>Dibuat dengan Next.js</span>
        </div>
      </div>
    </footer>
  );
}
