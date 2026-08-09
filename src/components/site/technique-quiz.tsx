import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

type Technique = "Microblading" | "Shading" | "Técnica mixta" | "Valoración personalizada";

type Option = { label: string; scores: Partial<Record<Technique, number>> };

const questions: { id: string; question: string; options: Option[] }[] = [
  {
    id: "estado",
    question: "¿Cómo son actualmente tus cejas?",
    options: [
      { label: "Poco pobladas", scores: { Shading: 2, "Técnica mixta": 1 } },
      { label: "Con zonas sin pelo", scores: { "Técnica mixta": 2, Shading: 1 } },
      { label: "Bastante pobladas", scores: { Microblading: 2 } },
      { label: "No estoy segura", scores: { "Valoración personalizada": 2 } },
    ],
  },
  {
    id: "resultado",
    question: "¿Qué resultado buscas?",
    options: [
      { label: "Muy natural", scores: { Microblading: 2 } },
      { label: "Natural pero definido", scores: { "Técnica mixta": 2 } },
      { label: "Más marcado", scores: { Shading: 2 } },
    ],
  },
  {
    id: "objetivo",
    question: "¿Qué te gustaría mejorar?",
    options: [
      { label: "Quiero recuperar forma", scores: { "Técnica mixta": 1, Microblading: 1 } },
      { label: "Quiero más densidad", scores: { Shading: 2 } },
      { label: "Quiero más definición", scores: { "Técnica mixta": 2 } },
    ],
  },
  {
    id: "piel",
    question: "¿Cómo describirías tu piel?",
    options: [
      { label: "Normal o seca", scores: { Microblading: 2 } },
      { label: "Mixta", scores: { "Técnica mixta": 1, Shading: 1 } },
      { label: "Grasa", scores: { Shading: 2 } },
      { label: "No lo sé", scores: { "Valoración personalizada": 1 } },
    ],
  },
];

const explanations: Record<Technique, string> = {
  Microblading: "El acabado pelo a pelo suele ser la opción más natural cuando la piel y el vello lo permiten.",
  Shading: "El sombreado aporta densidad y un acabado más definido, con un efecto maquillado.",
  "Técnica mixta": "Combinar pelo a pelo y sombreado permite ganar densidad sin perder naturalidad.",
  "Valoración personalizada": "Con la información disponible, lo más honesto es valorar tus cejas en persona.",
};

export function TechniqueQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const answered = Object.keys(answers).length;

  const recommendation: Technique = (() => {
    const scores: Record<Technique, number> = {
      Microblading: 0,
      Shading: 0,
      "Técnica mixta": 0,
      "Valoración personalizada": 0,
    };
    questions.forEach((q) => {
      const idx = answers[q.id];
      if (idx === undefined) return;
      const opt = q.options[idx];
      if (!opt) return;
      (Object.entries(opt.scores) as [Technique, number][]).forEach(([k, v]) => {
        scores[k] += v;
      });
    });
    const best = (Object.entries(scores) as [Technique, number][]).sort((a, b) => b[1] - a[1])[0];
    return best && best[1] > 0 ? best[0] : "Valoración personalizada";
  })();

  const reset = () => {
    setAnswers({});
    setDone(false);
  };

  return (
    <section id="test" className="border-t border-border bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <div className="reveal text-center">
          <p className="section-kicker">Orientación</p>
          <h2 className="section-title mt-4">¿Qué técnica es mejor para ti?</h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
            Responde a cuatro preguntas rápidas y te damos una orientación inicial sobre la técnica que podría encajar
            contigo.
          </p>
        </div>

        <div className="reveal mt-12 border border-border bg-card p-6 md:p-10">
          {!done ? (
            <>
              <div className="flex items-center justify-between text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
                <span>
                  {answered} / {total} respondidas
                </span>
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 hover:text-foreground">
                  <RotateCcw className="h-3 w-3" aria-hidden="true" /> Reiniciar
                </button>
              </div>
              <div className="mt-3 h-px w-full bg-border">
                <div
                  className="h-px bg-primary transition-all duration-500"
                  style={{ width: `${(answered / total) * 100}%` }}
                />
              </div>

              <div className="mt-8 space-y-9">
                {questions.map((q, qi) => (
                  <fieldset key={q.id}>
                    <legend className="font-display text-xl tracking-tight">
                      <span className="mr-2 font-mono text-[0.62rem] tracking-[0.16em] text-primary">0{qi + 1}</span>
                      {q.question}
                    </legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {q.options.map((opt, oi) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                          aria-pressed={answers[q.id] === oi}
                          className={`rounded-full px-4 py-2.5 text-[0.78rem] transition-colors duration-300 ${
                            answers[q.id] === oi
                              ? "bg-primary text-primary-foreground"
                              : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>

              <button
                type="button"
                disabled={answered < total}
                onClick={() => setDone(true)}
                className="mt-9 w-full rounded-full bg-primary px-6 py-3.5 text-[0.78rem] uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-300 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Ver orientación
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="section-kicker">Orientación inicial</p>
              <h3 className="mt-4 font-display text-4xl tracking-tight md:text-5xl">{recommendation}</h3>
              <p className="mx-auto mt-5 max-w-md text-[0.9rem] leading-relaxed text-muted-foreground">
                {explanations[recommendation]}
              </p>
              <p className="mx-auto mt-6 max-w-md text-[0.78rem] italic text-muted-foreground">
                «Esta orientación no sustituye una valoración profesional.»
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsappCta message={waMessages.quiz}>Consultar mi caso por WhatsApp</WhatsappCta>
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[0.78rem] uppercase tracking-[0.14em] transition-colors duration-300 hover:border-foreground"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Repetir test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}