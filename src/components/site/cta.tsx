import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  children?: React.ReactNode;
  variant?: "solid" | "outline" | "inverse";
  size?: "default" | "sm" | "lg";
  className?: string;
};

const variants = {
  solid: "btn-solid",
  outline: "btn-outline",
  inverse: "btn-inverse",
} as const;

const sizes = { sm: "btn-sm", default: "", lg: "btn-lg" } as const;

export function WhatsappCta({
  message,
  children = "Reservar valoración",
  variant = "solid",
  size = "default",
  className,
}: Props) {
  const href = waLink(message);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn("btn", sizes[size], variants[variant], className)}
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </a>
  );
}
