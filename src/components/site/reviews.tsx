import { Quote } from "lucide-react";

export function Reviews() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Opiniones</p>
          <h2 className="section-title mt-4">La experiencia de nuestras clientas</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            Este espacio está preparado para mostrar reseñas reales. No publicamos opiniones inventadas.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <blockquote key={i} className="reveal border border-dashed border-border p-7">
              <Quote className="h-5 w-5 text-primary/60" aria-hidden="true" />
              <p className="mt-5 font-display text-xl leading-snug text-muted-foreground">
                «Aquí aparecerá una opinión real de una clienta.»
              </p>
              <footer className="mt-6 flex items-center justify-between">
                <span className="text-[0.72rem] uppercase tracking-[0.16em] text-muted-foreground">
                  [NOMBRE CLIENTA]
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}