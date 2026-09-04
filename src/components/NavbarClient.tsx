"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/icons";

export function NavbarClient({
  shortName,
  navItems,
}: {
  shortName: string;
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled || open ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:grid md:grid-cols-3">
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            {left.map((item) => (
              <Link key={item.href} href={item.href} className="hover:opacity-60 transition-opacity">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="font-display text-xl md:text-2xl tracking-[0.2em] justify-self-start md:justify-self-center"
          >
            {shortName}
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
