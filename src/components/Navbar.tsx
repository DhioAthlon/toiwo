import { getSiteSettings } from "@/lib/content";
import { nav } from "@/lib/site-config";
import { NavbarClient } from "@/components/NavbarClient";

export async function Navbar() {
  const settings = await getSiteSettings();
  return <NavbarClient shortName={settings.shortName} navItems={nav} />;
}
