import { MessageCircle } from "lucide-react";
import { waLink, waMessages } from "@/lib/site-config";

export function WhatsappBar() {
  const href = waLink(waMessages.general);
  const external = href.startsWith("http");
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-[0.8rem] uppercase tracking-[0.14em] text-background"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Reservar valoración
      </a>
    </div>
  );
}