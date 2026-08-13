import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { waMessages } from "@/lib/site-config";
import { WhatsappCta } from "./cta";

type Verdict = "Encaja" | "Dudoso" | "Requiere valoración";

type Option = { label: string; score: number };

const questions: { id: string; question: string; options: Option[] }[] = [
  {
    id: "estado",
    question: "¿Cómo son actualmente tus cejas?",
    options: [
      { label: "Con zonas sin pelo", score: 2 },
      { label: "Poco pobladas", score: 1 },
      { label: "Bastante pobladas", score: 1 },
      { label: "Casi no tengo cejas", score: -1 },
    ],
  },
  {
    id: "resultado",
    question: "¿Qué resultado buscas?",
    options: [
      { label: "Muy natural", score: 2 },
      { label: "Natural pero definido", score: 2 },
      { label: "Más marcado", score: -1 },
      { label: "No lo sé", score: 0 },
    ],
  },
  {
    id: "objetivo",
    question: "¿Qué te gustaría mejorar?",
    options: [
      { label: "Recuperar forma", score: 2 },
      { label: "Densidad en zonas vacías", score: 2 },
      { label: "Más definición", score: 1 },
      { label: "Relleno marcado", score: -1 },
    ],
  },
  {
    id: "piel",
    question: "¿Cómo describirías tu piel?",
    options: [
      { label: "Normal o seca", score: 2 },
      { label: "Mixta", score: 1 },
      { label: "Grasa", score: -2 },
      { label: "No lo sé", score: 0 },
    ],
  },
];

const explanations: Record<Verdict, string> = {
  Encaja:
    "Por lo que cuentas, el microblading puede encajar: buscas un resultado natural y tu piel lo suele permitir. En la cita confirmo el diseño, el tono y si procedemos.",
  Dudoso:
    "Puede encajar, pero hay cosas que hay que ver en persona. En piel grasa o con zonas muy despobladas el trazo tiene límites, y te lo digo si veo que no es lo mejor para ti.",
  "Requiere valoración":
    "Con lo que has contado, lo honesto es verlo en persona. El microblading no siempre es la mejor opción, y también es mi trabajo decírtelo.",
};

export function TechniqueQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = questions.length;
  const answered = Object.keys(answers).length;

  const verdict: Verdict = (() => {
    let score = 0;
    questions.forEach((q) => {
      const idx = answers[q.id];
      if (idx === undefined) return;
      const opt = q.options[idx];
      if (opt) score += opt.score;
    });
    if (score >= 5) return "Encaja";
    if (score >= 2) return "Dudoso";
    return "Requiere valoración";
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
          <h2 className="section-title mt-4">¿Encaja el microblading en tu caso?</h2>
          <p className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
            Cuatro preguntas para una primera orientación. La decisión se toma en la
            valoración, mirando tu piel y tu ceja.
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
                className="btn btn-solid btn-lg mt-9 w-full disabled:cursor-not-allowed disabled:opacity-35"
              >
                Ver orientación
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="section-kicker">Orientación inicial</p>
              <h3 className="section-title mt-4">{verdict}</h3>
              <p className="mx-auto mt-5 max-w-md text-[0.9rem] leading-relaxed text-muted-foreground">
                {explanations[verdict]}
              </p>
              <p className="mx-auto mt-6 max-w-md text-[0.78rem] italic text-muted-foreground">
                «Esta orientación no sustituye una valoración profesional.»
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <WhatsappCta message={waMessages.quiz}>Consultar mi caso por WhatsApp</WhatsappCta>
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn-ghost"
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