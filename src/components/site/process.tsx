const steps = [
  ["01", "Valoración", "Conocemos tus cejas y tus objetivos."],
  ["02", "Diseño", "Diseñamos la forma antes de comenzar el tratamiento."],
  ["03", "Elección de técnica", "Seleccionamos la técnica más adecuada."],
  ["04", "Tratamiento", "Realizamos el procedimiento siguiendo el diseño acordado."],
  ["05", "Cicatrización", "Te explicamos todos los cuidados posteriores."],
  ["06", "Seguimiento", "Revisamos la evolución y, cuando corresponda, realizamos el retoque."],
];

export function Process() {
  return (
    <section className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.8fr_1.2fr] md:px-8">
        <div className="reveal">
          <p className="section-kicker">Proceso</p>
          <h2 className="section-title mt-4">Cómo trabajamos</h2>
          <p className="mt-5 max-w-sm text-[0.9rem] leading-relaxed text-muted-foreground">
            Un proceso ordenado, explicado paso a paso, para que sepas en todo momento qué va a ocurrir.
          </p>
        </div>
        <ol className="relative">
          {steps.map(([num, title, text]) => (
            <li key={num} className="reveal grid grid-cols-[auto_minmax(0,1fr)] gap-5 border-t border-border py-6 last:border-b">
              <span className="font-mono text-[0.7rem] tracking-[0.16em] text-primary">{num}</span>
              <div className="min-w-0">
                <h3 className="font-display text-2xl tracking-tight">{title}</h3>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}