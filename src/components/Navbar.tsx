import { getSiteSettings } from "@/lib/content";
import { nav } from "@/lib/site-config";
import { cloudinaryUrl } from "@/lib/cloudinary";
import { NavbarClient } from "@/components/NavbarClient";

export async function Navbar() {
  const settings = await getSiteSettings();
  const logoUrl = settings.logoId ? cloudinaryUrl(settings.logoId, { width: 240 }) : null;
  const logoLightUrl = settings.logoLightId ? cloudinaryUrl(settings.logoLightId, { width: 240 }) : null;
  return (
    <NavbarClient
      shortName={settings.shortName}
      logoUrl={logoUrl}
      logoLightUrl={logoLightUrl}
      navItems={nav}
    />
  );
}
