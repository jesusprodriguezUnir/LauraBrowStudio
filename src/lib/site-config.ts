const env = import.meta.env;

const BIZ_NAME = "LauraBrowStudio";

/** Datos del negocio. Los valores por defecto son provisionales:
 *  sustituirlos en `.env` (ver `.env.example`) la próxima semana.
 */
export const site = {
  name: BIZ_NAME,
  claim: "Microblading y micropigmentación de cejas en Palencia",
  city: "Palencia",
  region: "Castilla y León",
  country: "España",
  url: (env["PUBLIC_SITE_URL"] as string | undefined) ?? "https://laurabrowstudio.es",

  phoneDisplay: (env["PUBLIC_PHONE_DISPLAY"] as string | undefined) ?? "600 12 34 56",
  /** Número real en formato internacional sin "+", p. ej. 34600123456 */
  whatsappNumber: (env["PUBLIC_WHATSAPP_NUMBER"] as string | undefined) ?? "34600123456",
  email: (env["PUBLIC_EMAIL"] as string | undefined) ?? "hola@laurabrowstudio.es",
  address: (env["PUBLIC_ADDRESS"] as string | undefined) ?? "Calle Mayor Principal, 34001 Palencia",
  instagram: (env["PUBLIC_INSTAGRAM"] as string | undefined) ?? "laurabrowstudio",

  legalName: (env["PUBLIC_LEGAL_NAME"] as string | undefined) ?? BIZ_NAME,
  nif: (env["PUBLIC_NIF"] as string | undefined) ?? "12345678A",

  geo: {
    lat: Number(env["PUBLIC_LAT"]) || null,
    lng: Number(env["PUBLIC_LNG"]) || null,
  },
  /** Horario de apertura p. ej. "Mo-Sa 09:00-20:00" */
  businessHours: (env["PUBLIC_BUSINESS_HOURS"] as string | undefined) ?? "Mo-Sa 09:00-20:00",

  /** Endpoint de envío del formulario (Formspree/Web3Forms). Vacío = fallback a WhatsApp. */
  formEndpoint: (env["PUBLIC_FORM_ENDPOINT"] as string | undefined) ?? "",
  turnstileSiteKey: (env["PUBLIC_TURNSTILE_SITE_KEY"] as string | undefined) ?? "",
  plausibleDomain: (env["PUBLIC_PLAUSIBLE_DOMAIN"] as string | undefined) ?? "",
};

export const instagramUrl = site.instagram.startsWith("[")
  ? "#"
  : `https://www.instagram.com/${site.instagram}`;

/** Enlace a WhatsApp. Mientras no haya número real, abre el bloque de contacto. */
export function waLink(message: string): string {
  if (!site.whatsappNumber) return "#contacto";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hola, me gustaría solicitar una valoración de mis cejas.",
  quiz: "Hola, he hecho el test de la web y me gustaría consultar mi caso.",
  service: (name: string) => `Hola, me interesa el servicio de ${name}. ¿Podemos valorar mi caso?`,
};