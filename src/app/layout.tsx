import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/lib/site-config";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Photography & Videography`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
