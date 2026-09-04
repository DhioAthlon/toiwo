import { getSiteSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/site-config";
import { WhatsappIcon } from "@/components/icons";

export async function WhatsAppButton() {
  const settings = await getSiteSettings();

  return (
    <a
      href={whatsappHref(settings.whatsappNumber, settings.whatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
