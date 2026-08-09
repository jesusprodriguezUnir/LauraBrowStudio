export const site = {
  name: "LauraBrowStudio",
  claim: "Microblading y micropigmentación de cejas en Palencia",
  city: "Palencia",
  region: "Castilla y León",
  country: "España",
  phoneDisplay: "[TELÉFONO / WHATSAPP]",
  /** Sustituir por el número real en formato internacional, p. ej. 34600000000 */
  whatsappNumber: "",
  email: "[EMAIL]",
  address: "[DIRECCIÓN / ZONA DE PALENCIA]",
  instagram: "[INSTAGRAM]",
} as const;

/** Enlace a WhatsApp. Mientras no haya número real, abre el bloque de contacto. */
export function waLink(message: string): string {
  if (!site.whatsappNumber) return "#contacto";
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  general: "Hola, me gustaría solicitar una valoración de mis cejas.",
  quiz: "Hola, he hecho el test de la web y me gustaría consultar mi caso.",
  service: (name: string) => `Hola, me interesa el servicio de ${name}. ¿Podemos valorar mi caso?`,
} as const;
