import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const suggestions = [
  "Quels devis nécessitent une relance ?",
  "Quels produits risquent une rupture ?",
  "Où en est la commande CMD-2026-018 ?",
  "Trouve une alternative à cette référence.",
  "Résume les priorités commerciales de la semaine.",
];

function simulateReply(q: string): string {
  const s = q.toLowerCase();
  if (s.includes("relance") || s.includes("devis"))
    return "3 devis nécessitent une relance : DEV-2026-140 (Industrie Rhône, 8 750 €), DEV-2026-138 (Constructions BTS) et DEV-2026-135 (InoxTech). Je peux préparer les e-mails ?";
  if (s.includes("rupture") || s.includes("stock"))
    return "Alertes rupture : Inox 304 Ø20 (8 unités, seuil 15), Plaque POM 20mm (3 unités, seuil 10). Alternatives proposées : IN-316-T20 et PL-PA6-P20.";
  if (s.includes("cmd-2026-018") || s.includes("commande"))
    return "CMD-2026-018 (Industrie Rhône) est en étape Expédition, en retard de 1 jour. Notification client recommandée.";
  if (s.includes("alternative") || s.includes("référence"))
    return "Pour Inox 304 Ø20 en rupture, alternative : Inox 316 Ø20 (IN-316-T20) — disponible 24 unités, prix +6%.";
  if (s.includes("priorité") || s.includes("semaine") || s.includes("résume"))
    return "Priorités : relancer les 3 devis > 10k€, réapprovisionner Inox 304 et POM, notifier Industrie Rhône du retard CMD-2026-018, qualifier Fabrik Industries.";
  return "J'ai analysé votre demande sur les données SERIMA. Voici une synthèse : les indicateurs sont dans le vert, seuls 2 points nécessitent votre attention (ruptures et retard CMD-2026-018).";
}

type Msg = { from: "user" | "bot"; text: string };

export function FloatingAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Bonjour, je suis l'Assistant SERIMA AI. Comment puis-je vous aider ?" },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }, { from: "bot", text: simulateReply(text) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Ouvrir l'assistant"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col rounded-xl border bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b bg-primary text-primary-foreground rounded-t-xl px-4 py-3">
            <Sparkles className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Assistant SERIMA AI</span>
              <span className="text-[10px] opacity-80">En ligne · réponses simulées</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    m.from === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {messages.length <= 1 && (
              <div className="pt-2 space-y-1.5">
                <div className="text-xs text-muted-foreground mb-1">Suggestions :</div>
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="block w-full text-left text-xs rounded-md border bg-background px-2.5 py-1.5 hover:bg-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              className="h-9"
            />
            <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
