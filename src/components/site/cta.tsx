import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function WhatsappCta({ message, children = "Reservar valoración", variant = "solid", className }: Props) {
  const href = waLink(message);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.78rem] uppercase tracking-[0.14em] transition-all duration-300",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:brightness-110 shadow-sm"
          : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        className,
      )}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}