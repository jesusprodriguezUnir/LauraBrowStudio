const timeline = [
  ["Días 1-2", "El color se ve más intenso y oscuro de lo que será, con una ligera inflamación normal."],
  ["Días 3-5", "El pigmento empieza a oxidarse y la zona puede tirar o picar levemente."],
  ["Días 5-10", "Aparece una descamación fina. No se debe rascar ni arrancar nada."],
  ["Días 10-21", "Efecto «ceja fantasma»: el color se ve muy claro porque la piel está regenerándose."],
  ["Semanas 4-8", "El tono real ya está asentado y es el momento del retoque de perfeccionamiento."],
];

const dos = [
  "Limpiar con suavidad según las indicaciones entregadas",
  "Aplicar la crema recomendada en capa muy fina",
  "Dormir evitando presionar la zona",
  "Usar protección solar alta una vez cicatrizada",
];

const donts = [
  "Mojar, frotar o exfoliar la zona los primeros días",
  "Piscina, playa, sauna, vapor y ejercicio intenso (7-10 días)",
  "Maquillaje, cremas con ácidos o retinol sobre las cejas",
  "Depilar, teñir o tocar las cejas hasta el retoque",
];

export function Aftercare() {
  return (
    <section id="cuidados" className="border-t border-border bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="reveal max-w-2xl">
          <p className="section-kicker">Cicatrización y cuidados</p>
          <h2 className="section-title mt-4">Qué ocurre después de la sesión</h2>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            El resultado final depende tanto de la técnica como de los cuidados de las primeras semanas.
            Recibirás las indicaciones por escrito y seguimiento por WhatsApp.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-5">
          {timeline.map(([when, what], i) => (
            <li key={when} className="reveal bg-background p-6">
              <span className="font-mono text-[0.62rem] tracking-[0.16em] text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em]">{when}</h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-muted-foreground">{what}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="reveal bg-background p-7">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary">Sí</h3>
            <ul className="mt-5 space-y-3">
              {dos.map((item) => (
                <li key={item} className="text-[0.88rem] leading-relaxed text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
          <div className="reveal bg-background p-7">
            <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.14em]">Evitar</h3>
            <ul className="mt-5 space-y-3">
              {donts.map((item) => (
                <li key={item} className="text-[0.88rem] leading-relaxed text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
