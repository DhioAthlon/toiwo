"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";

export function NavbarClient({
  shortName,
  logoUrl,
  logoLightUrl,
  navItems,
}: {
  shortName: string;
  logoUrl: string | null;
  logoLightUrl: string | null;
  navItems: { label: string; href: string }[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const [left, right] = [navItems.slice(0, 1), navItems.slice(1)];
  // Solid = opaque light header with dark text (scrolled past the hero, or
  // mobile menu open). Otherwise the header floats transparent over the hero
  // photo with a dark gradient + white text/logo for legibility.
  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          solid ? "bg-paper/90 backdrop-blur-sm border-b border-line text-ink" : "bg-transparent text-paper"
        }`}
      >
        {/* Dark scrim behind the floating header — deliberately taller than the nav
            row (h-20) itself, so the whole row sits solidly in the dark part of the
            gradient instead of right where it's already fading to transparent. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/85 via-ink/45 to-transparent transition-opacity duration-300 ${
            solid ? "opacity-0" : "opacity-100"
          }`}
        />
        <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:grid md:grid-cols-3">
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            {left.map((item) => (
              <Link key={item.href} href={item.href} className="hover:opacity-60 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="justify-self-start md:justify-self-center flex items-center"
          >
            {logoUrl || logoLightUrl ? (
              <>
                {/* Dark/normal logo — shown once scrolled past the hero (solid header). */}
                {/* eslint-disable-next-line @next/next/no-img-element -- Cloudinary already serves an optimized image via URL params (f_auto,q_auto). */}
                <img
                  src={logoUrl ?? logoLightUrl!}
                  alt={shortName}
                  className="h-[21px] md:h-6 w-auto"
                  hidden={!solid}
                />
                {/* Light/white logo — shown while floating over the hero photo. Uses the
                    uploaded logo_light_id when set; otherwise falls back to whitening the
                    dark logo with a CSS filter so the navbar still looks right. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoLightUrl ?? logoUrl!}
                  alt={shortName}
                  className={`h-[21px] md:h-6 w-auto ${logoLightUrl ? "" : "brightness-0 invert"}`}
                  hidden={solid}
                />
              </>
            ) : (
              <span className="font-display text-xl md:text-2xl tracking-[0.2em]">{shortName}</span>
            )}
          </Link>

          <nav className="hidden md:flex items-center justify-end gap-8 text-sm tracking-wide">
            {right.map((item) => (
              <Link key={item.href} href={item.href} className="hover:opacity-60 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden justify-self-end p-2 -mr-2"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-30 bg-paper transition-transform duration-500 md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl tracking-wide"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
