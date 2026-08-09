import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { site, waLink, waMessages } from "@/lib/site-config";

const schema = z.object({
  name: z.string().min(2, "Escribe tu nombre"),
  email: z.string().email("El email no es válido").optional().or(z.literal("")),
  phone: z.string().min(9, "Introduce un teléfono válido"),
  technique: z.enum(["Microblading pelo a pelo", "Microshading / Powder", "Técnica mixta", "Aún no lo sé"]),
  date: z.string().min(1, "Indica una fecha preferida"),
  slot: z.enum(["Mañana", "Tarde", "Cualquiera"]),
  message: z.string().max(500).optional().or(z.literal("")),
  adult: z.boolean().refine((v) => v, "Debes ser mayor de 18 años"),
  contraindications: z.boolean().refine((v) => v, "Revisa las contraindicaciones antes de reservar"),
});

type FormValues = z.infer<typeof schema>;

const today = new Date(Date.now() + 86400000).toISOString().split("T")[0];
const minDate = today;

const inputBase =
  "w-full rounded-sm border border-input bg-background px-3.5 py-2.5 text-[0.88rem] text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const labelBase = "mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground";
const errorBase = "mt-1 text-[0.72rem] text-destructive";

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = site.turnstileSiteKey;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { slot: "Cualquiera", technique: "Aún no lo sé" } });

  const technique = watch("technique");
  const showCaptcha = Boolean(siteKey);

  useEffect(() => {
    if (!showCaptcha) return;
    const existing = document.querySelector('script[data-astro-turnstile]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async = true;
      s.defer = true;
      s.setAttribute("data-astro-turnstile", "true");
      s.setAttribute("onload", "window.__lbsOnTurnstileLoad && window.__lbsOnTurnstileLoad()");
      document.head.appendChild(s);
    }
  }, [showCaptcha]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("sending");

    if (site.formEndpoint) {
      if (siteKey && !turnstileToken) {
        setStatus("idle");
        return;
      }
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, turnstile: turnstileToken, source: "laurabrowstudio" }),
        });
        if (!res.ok) throw new Error("server");
        setStatus("done");
        reset();
        setTurnstileToken("");
        return;
      } catch {
        setStatus("idle");
        window.alert("No se ha podido enviar el formulario. Escríbenos por WhatsApp para reservar.");
        return;
      }
    }

    // Sin endpoint configurado: abrimos WhatsApp con la solicitud preescrita.
    const lines = [
      `Hola ${site.name}, quiero reservar cita.`,
      `Nombre: ${values.name}`,
      `Teléfono: ${values.phone}${values.email ? ` · Email: ${values.email}` : ""}`,
      `Técnica: ${values.technique}`,
      `Fecha preferida: ${values.date} (${values.slot})`,
      values.message ? `Mensaje: ${values.message}` : "",
      `Mayor de 18 años: sí`,
    ].filter(Boolean);
    const href = waLink(`${waMessages.general}\n\n${lines.join("\n")}`);
    if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer");
    setStatus("done");
    reset();
  });

  if (status === "done") {
    return (
      <div className="rounded-sm border border-border bg-background p-8 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl tracking-tight">¡Solicitud preparada!</h3>
        <p className="mx-auto mt-3 max-w-sm text-[0.88rem] leading-relaxed text-muted-foreground">
          Te hemos enviado tu solicitud por WhatsApp (o por email) y te confirmaremos la cita en cuanto podamos.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[0.78rem] uppercase tracking-[0.14em] transition-colors hover:border-foreground"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-sm border border-border bg-background p-6 md:p-8" noValidate>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
        <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.14em]">Solicita tu reserva</h3>
      </div>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-muted-foreground">
        Rellena estos datos y te confirmamos fecha. También puedes reservar directamente por WhatsApp.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rf-name" className={labelBase}>Nombre</label>
          <input id="rf-name" type="text" placeholder="Tu nombre y apellidos" className={inputBase} {...register("name")} />
          {errors.name && <p className={errorBase} role="alert">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="rf-phone" className={labelBase}>Teléfono</label>
          <input id="rf-phone" type="tel" inputMode="tel" placeholder="600 000 000" className={inputBase} {...register("phone")} />
          {errors.phone && <p className={errorBase} role="alert">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="rf-email" className={labelBase}>Email (opcional)</label>
          <input id="rf-email" type="email" placeholder="tucorreo@ejemplo.es" className={inputBase} {...register("email")} />
          {errors.email && <p className={errorBase} role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="rf-date" className={labelBase}>Fecha preferida</label>
          <input id="rf-date" type="date" min={minDate} className={inputBase} {...register("date")} />
          {errors.date && <p className={errorBase} role="alert">{errors.date.message}</p>}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={labelBase}>Técnica de interés</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {(["Microblading pelo a pelo", "Microshading / Powder", "Técnica mixta", "Aún no lo sé"] as const).map((t) => (
            <label
              key={t}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[0.78rem] transition-colors ${
                technique === t ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              <input type="radio" value={t} className="sr-only" {...register("technique")} />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className={labelBase}>Franja horaria</legend>
        <div className="flex flex-wrap gap-2">
          {(["Mañana", "Tarde", "Cualquiera"] as const).map((slot) => (
            <label
              key={slot}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[0.78rem] transition-colors ${
                watch("slot") === slot ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:border-foreground"
              }`}
            >
              <input type="radio" value={slot} className="sr-only" {...register("slot")} />
              {slot}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="rf-message" className={labelBase}>Cuéntanos brevemente qué buscas (opcional)</label>
        <textarea id="rf-message" rows={3} maxLength={500} placeholder="Ej.: cejas muy despobladas, piel grasa…" className={inputBase} {...register("message")} />
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex cursor-pointer items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted-foreground">
          <input type="checkbox" className="mt-1" {...register("adult")} />
          Confirmo que soy mayor de 18 años y acepto someterme voluntariamente al procedimiento estético.
        </label>
        <label className="flex cursor-pointer items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted-foreground">
          <input type="checkbox" className="mt-1" {...register("contraindications")} />
          He leído y entiendo las contraindicaciones del tratamiento (embarazo, problemas de coagulación, piel irritada, etc.).
        </label>
        {(errors.adult || errors.contraindications) && (
          <p className={errorBase} role="alert">
            {errors.adult?.message ?? errors.contraindications?.message}
          </p>
        )}
      </div>

      {showCaptcha && (
        <div className="mt-5">
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-callback="__lbsTurnstileCb"
            data-theme="light"
            aria-label="Verificación anti-robots"
          />
          {!turnstileToken && status === "idle" && (
            <p className="mt-1 text-[0.72rem] text-muted-foreground">Completa la verificación antes de enviar.</p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full bg-foreground px-6 py-3.5 text-[0.78rem] uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending" ? "Enviando…" : "Solicitar cita"}
      </button>
      <p className="mt-3 text-center text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        Respuesta en menos de 24 h · sin compromiso
      </p>
    </form>
  );
}