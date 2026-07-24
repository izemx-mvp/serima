import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Bot,
  FileText,
  Package,
  Truck,
  ShoppingBag,
  MessageSquare,
  FileCheck,
  Users,
  AlertTriangle,
  BarChart3,
  Play,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  stocks,
  fournisseurs,
  messagesClient,
  documents,
  prospects,
  commandes,
  etapesCommande,
  reclamations,
  reporting,
  devis,
} from "@/lib/mock-data";

const ICONS: Record<string, any> = {
  technico: Bot,
  devis: FileText,
  stocks: Package,
  achats: ShoppingBag,
  sc: MessageSquare,
  doc: FileCheck,
  prospection: Users,
  suivi: Truck,
  sav: AlertTriangle,
  reporting: BarChart3,
};

export function AgentModal({
  agentId,
  open,
  onOpenChange,
  title,
}: {
  agentId: string | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  title: string;
}) {
  if (!agentId) return null;
  const Icon = ICONS[agentId] ?? Bot;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            {title}
          </DialogTitle>
          <DialogDescription>Démonstration interactive — réponses simulées</DialogDescription>
        </DialogHeader>
        <div className="pt-2">
          <AgentBody id={agentId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

function AgentBody({ id }: { id: string }) {
  switch (id) {
    case "technico":
      return <TechnicoAgent />;
    case "devis":
      return <DevisAgent />;
    case "stocks":
      return <StocksAgent />;
    case "achats":
      return <AchatsAgent />;
    case "sc":
      return <ServiceClientAgent />;
    case "doc":
      return <DocAgent />;
    case "prospection":
      return <ProspectionAgent />;
    case "suivi":
      return <SuiviAgent />;
    case "sav":
      return <SavAgent />;
    case "reporting":
      return <ReportingAgent />;
    default:
      return null;
  }
}

/* ---------- 1. Technico-commercial ---------- */
function TechnicoAgent() {
  const [besoin, setBesoin] = useState("Tôle résistante à l'abrasion pour benne de camion");
  const [reco, setReco] = useState<null | { produit: string; nuance: string; dim: string; alt: string; conf: number; questions: string[] }>(null);
  const [loading, setLoading] = useState(false);

  const launch = () => {
    setLoading(true);
    setReco(null);
    setTimeout(() => {
      setReco({
        produit: "Tôle anti-abrasion Hardox 450",
        nuance: "Hardox 450 — 450 HBW",
        dim: "8mm × 2000 × 6000",
        alt: "Hardox 500 (usure très sévère)",
        conf: 92,
        questions: [
          "Épaisseur souhaitée entre 6 et 12 mm ?",
          "Type de matériau transporté (roches, minerais, gravats) ?",
          "Besoin de découpe ou de cintrage ?",
        ],
      });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="space-y-5">
      <Section title="Besoin client">
        <Textarea value={besoin} onChange={(e) => setBesoin(e.target.value)} rows={2} />
        <Button onClick={launch} disabled={loading} className="gap-2">
          <Play className="h-4 w-4" />
          {loading ? "Analyse en cours..." : "Lancer une démonstration"}
        </Button>
      </Section>

      {reco && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">{reco.produit}</div>
              <div className="text-xs text-muted-foreground">{reco.nuance} · {reco.dim}</div>
            </div>
            <Badge className="bg-success text-success-foreground">Confiance {reco.conf}%</Badge>
          </div>
          <Progress value={reco.conf} />
          <div className="text-xs">
            <span className="font-medium">Référence équivalente :</span> {reco.alt}
          </div>
          <Section title="Questions techniques">
            <ul className="text-sm list-disc pl-5 space-y-1">
              {reco.questions.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </Section>
        </div>
      )}
    </div>
  );
}

/* ---------- 2. Devis ---------- */
function DevisAgent() {
  const [step, setStep] = useState(0);
  const sources = ["Email", "WhatsApp", "PDF", "Excel"];
  const [source, setSource] = useState("Email");

  return (
    <div className="space-y-4">
      <Section title="Source de la demande">
        <div className="flex flex-wrap gap-2">
          {sources.map((s) => (
            <Button key={s} variant={source === s ? "default" : "outline"} size="sm" onClick={() => setSource(s)}>
              {s}
            </Button>
          ))}
        </div>
      </Section>
      <Button onClick={() => setStep(1)} className="gap-2">
        <Play className="h-4 w-4" /> Lancer une démonstration
      </Button>

      {step >= 1 && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="text-sm font-semibold">Extraction ({source})</div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><span className="text-muted-foreground">Client :</span> MetalCorp SAS</div>
            <div><span className="text-muted-foreground">Contact :</span> J. Martin</div>
            <div><span className="text-muted-foreground">Produit :</span> Tôle Hardox 450</div>
            <div><span className="text-muted-foreground">Dimensions :</span> 8×2000×6000</div>
            <div><span className="text-muted-foreground">Quantité :</span> 12 tôles</div>
            <div><span className="text-muted-foreground">Délai :</span> <Badge variant="outline">à préciser</Badge></div>
          </div>
          <div className="text-xs text-warning-foreground bg-warning/20 border border-warning/40 rounded p-2">
            ⚠ Information manquante : délai souhaité de livraison
          </div>
          <Button size="sm" onClick={() => setStep(2)}>Générer le brouillon de devis</Button>
        </div>
      )}

      {step >= 2 && (
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Brouillon DEV-2026-142</div>
            <Badge>Total : 12 480 €</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            12 × Tôle Hardox 450 — 8×2000×6000 · 1 040 €/u
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => toast.success("Devis modifié")}>Modifier</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Devis validé")}>Valider</Button>
            <Button size="sm" onClick={() => toast.success("Devis envoyé au client")}>
              <Send className="h-3.5 w-3.5" /> Envoyer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 3. Stocks ---------- */
function StocksAgent() {
  const [q, setQ] = useState("");
  const results = stocks.filter((s) =>
    !q || s.ref.toLowerCase().includes(q.toLowerCase()) || s.designation.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="space-y-4">
      <Section title="Rechercher une référence">
        <Input placeholder="Ex : IN-304-T20 ou inox 304..." value={q} onChange={(e) => setQ(e.target.value)} />
      </Section>
      <div className="space-y-2">
        {results.map((s) => {
          const rupture = s.qte < s.seuil;
          return (
            <div key={s.ref} className="rounded-lg border bg-card p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold">{s.ref}</div>
                <div className="text-xs text-muted-foreground truncate">{s.designation}</div>
                <div className="text-xs mt-1">
                  Emplacement <span className="font-mono">{s.emplacement}</span> · Alt : {s.alt}
                </div>
              </div>
              <div className="text-right">
                <div className={cn("text-lg font-bold", rupture ? "text-destructive" : "text-foreground")}>
                  {s.qte}
                </div>
                {rupture ? (
                  <Button size="sm" variant="outline" onClick={() => toast.success(`Réappro suggéré pour ${s.ref}`)}>
                    Réapprovisionner
                  </Button>
                ) : (
                  <div className="text-[10px] text-muted-foreground">seuil {s.seuil}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 4. Achats ---------- */
function AchatsAgent() {
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-4">
      <Section title="Produits à commander">
        <div className="rounded-lg border bg-card p-3 text-sm">
          <div className="font-semibold">Tôle Hardox 450 — 8×2000×6000</div>
          <div className="text-xs text-muted-foreground">Quantité suggérée : 20 · Stock : 15 · Seuil : 12</div>
        </div>
      </Section>
      <Button onClick={() => setSent(true)} className="gap-2">
        <Play className="h-4 w-4" /> Lancer la demande de prix
      </Button>

      {sent && (
        <Section title="Comparaison de 3 offres fournisseurs">
          <div className="space-y-2">
            {fournisseurs.map((f, i) => (
              <div key={f.nom} className="rounded-lg border bg-card p-3 grid grid-cols-4 gap-2 text-sm items-center">
                <div className="font-semibold">{f.nom}</div>
                <div><span className="text-muted-foreground text-xs">Prix</span><br />{f.prix}</div>
                <div><span className="text-muted-foreground text-xs">Délai</span><br />{f.delai}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-muted-foreground text-xs">Paiement</span><br />
                    {f.paiement}
                  </div>
                  {i === 2 && <Badge className="bg-success text-success-foreground">Recommandé</Badge>}
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-destructive mt-2">⚠ Retard signalé : MétaFrance (2 commandes récentes)</div>
        </Section>
      )}
    </div>
  );
}

/* ---------- 5. Service client ---------- */
function ServiceClientAgent() {
  const [msgs, setMsgs] = useState(messagesClient);
  const [input, setInput] = useState("");
  const [source, setSource] = useState<"WhatsApp" | "Email" | "Site web">("WhatsApp");

  function respond(text: string) {
    const t = text.toLowerCase();
    if (t.includes("disponib")) return "Oui, produit disponible. Emplacement A1-03.";
    if (t.includes("fiche")) return "Voici la fiche technique en PDF (simulé).";
    if (t.includes("suivi") || t.includes("commande")) return "Commande CMD-2026-018 en expédition, livraison prévue demain.";
    if (t.includes("délai") || t.includes("livraison")) return "Délai standard : 3 à 5 jours ouvrés.";
    if (t.includes("devis")) return "Je transfère votre demande à l'Agent Devis, brouillon prêt sous 5 min.";
    if (t.includes("humain") || t.includes("conseiller")) return "Un conseiller humain va prendre le relais.";
    return "Bien reçu, je transmets à un conseiller.";
  }

  function send() {
    if (!input.trim()) return;
    const q = input;
    setMsgs((m) => [
      ...m,
      { from: "client", canal: source, nom: "Client démo", text: q, time: "maintenant" },
      { from: "agent", text: respond(q), time: "maintenant" },
    ]);
    setInput("");
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(["WhatsApp", "Email", "Site web"] as const).map((s) => (
          <Button key={s} size="sm" variant={source === s ? "default" : "outline"} onClick={() => setSource(s)}>
            {s}
          </Button>
        ))}
      </div>
      <div className="rounded-lg border bg-muted/30 h-80 overflow-y-auto p-3 space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className={cn("flex", m.from === "agent" ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[75%] rounded-lg px-3 py-2 text-sm",
              m.from === "agent" ? "bg-primary text-primary-foreground" : "bg-card border",
            )}>
              {m.from === "client" && (
                <div className="text-[10px] text-muted-foreground mb-0.5">
                  {m.nom} · {m.canal}
                </div>
              )}
              {m.text}
              <div className="text-[10px] opacity-60 mt-1">{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Répondre au client..." onKeyDown={(e) => e.key === "Enter" && send()} />
        <Button onClick={send}><Send className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

/* ---------- 6. Documentaire ---------- */
function DocAgent() {
  const [q, setQ] = useState("");
  return (
    <div className="space-y-4">
      <Input placeholder="Rechercher fiche technique, certificat matière..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="space-y-2">
        {documents.filter((d) => !q || d.nom.toLowerCase().includes(q.toLowerCase())).map((d) => (
          <div key={d.nom} className="rounded-lg border bg-card p-3 flex items-center justify-between text-sm">
            <div>
              <div className="font-semibold">{d.nom}</div>
              <div className="text-xs text-muted-foreground">{d.type} · {d.client} · {d.commande}</div>
            </div>
            {d.statut === "OK" && <Badge className="bg-success text-success-foreground">OK</Badge>}
            {d.statut === "Manquant" && <Badge variant="destructive">Manquant</Badge>}
            {d.statut === "Non conforme" && <Badge className="bg-warning text-warning-foreground">Non conforme</Badge>}
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-accent/40 p-3 text-sm">
        <div className="font-semibold mb-1">Analyse automatique</div>
        <div className="text-xs">1 document manquant · 1 non-conformité détectée. Action corrective proposée : contacter le fournisseur AcierPro pour certificat 3.1 manquant.</div>
      </div>
    </div>
  );
}

/* ---------- 7. Prospection ---------- */
function ProspectionAgent() {
  const [email, setEmail] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {prospects.map((p) => (
        <div key={p.entreprise} className="rounded-lg border bg-card p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold">{p.entreprise}</div>
              <div className="text-xs text-muted-foreground">{p.secteur} · {p.contact}</div>
            </div>
            <Badge variant="outline">{p.statut}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={() => setEmail(p.entreprise)}>Générer e-mail</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Relance programmée dans 7 jours")}>Programmer relance</Button>
            <Button size="sm" variant="outline" onClick={() => toast.success("Prospect qualifié")}>Qualifier</Button>
            <Button size="sm" onClick={() => toast.success("Opportunité transférée au commercial")}>Transférer</Button>
          </div>
        </div>
      ))}
      {email && (
        <div className="rounded-lg border bg-accent/30 p-3 text-sm space-y-1">
          <div className="font-semibold">E-mail généré pour {email}</div>
          <div className="text-xs whitespace-pre-line">
            Objet : Solutions SERIMA pour {email}{"\n\n"}
            Bonjour,{"\n\n"}
            SERIMA distribue aciers, inox et plastiques industriels adaptés à votre activité.
            Je serais ravi d'organiser un échange de 15 minutes pour identifier vos besoins récurrents.{"\n\n"}
            Cordialement,{"\n"}
            L'équipe SERIMA
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- 8. Suivi commandes ---------- */
function SuiviAgent() {
  const cmd = commandes[2]; // CMD-2026-018 en retard
  const activeIdx = etapesCommande.indexOf("Expédition");
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-3 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">{cmd.id} — {cmd.client}</div>
          <div className="text-xs text-muted-foreground">{cmd.montant}</div>
        </div>
        {cmd.retard && <Badge variant="destructive">En retard</Badge>}
      </div>

      <Section title="Étapes de production">
        <ol className="space-y-2">
          {etapesCommande.map((e, i) => (
            <li key={e} className="flex items-center gap-3 text-sm">
              {i < activeIdx ? (
                <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
              ) : i === activeIdx ? (
                <Clock className="h-5 w-5 text-brand-light shrink-0" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted shrink-0" />
              )}
              <span className={cn(i <= activeIdx ? "font-medium" : "text-muted-foreground")}>{e}</span>
              {i === activeIdx && <Badge variant="outline" className="ml-auto">En cours</Badge>}
            </li>
          ))}
        </ol>
      </Section>

      <Button onClick={() => toast.success("Notification envoyée au client")}>
        <Send className="h-4 w-4" /> Notifier le client du retard
      </Button>
    </div>
  );
}

/* ---------- 9. SAV ---------- */
function SavAgent() {
  const [created, setCreated] = useState(false);
  const [type, setType] = useState("Défaut matière");
  const [urgence, setUrgence] = useState("Moyenne");
  return (
    <div className="space-y-4">
      <Section title="Créer un ticket">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-muted-foreground">Type de problème</label>
            <select className="w-full h-9 rounded-md border bg-background px-2 text-sm mt-1" value={type} onChange={(e) => setType(e.target.value)}>
              <option>Défaut matière</option>
              <option>Erreur dimension</option>
              <option>Retard livraison</option>
              <option>Document manquant</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Urgence</label>
            <select className="w-full h-9 rounded-md border bg-background px-2 text-sm mt-1" value={urgence} onChange={(e) => setUrgence(e.target.value)}>
              <option>Basse</option>
              <option>Moyenne</option>
              <option>Haute</option>
            </select>
          </div>
        </div>
        <Button variant="outline" size="sm">📎 Ajouter photo / document (simulé)</Button>
        <Button onClick={() => { setCreated(true); toast.success("Ticket créé"); }} className="gap-2">
          <Play className="h-4 w-4" /> Créer le ticket
        </Button>
      </Section>

      {created && (
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">REC-2026-015 créé</div>
            <Badge>{urgence}</Badge>
          </div>
          <div className="text-sm text-muted-foreground">{type}</div>
          <div className="rounded bg-accent/40 p-2 text-sm">
            <span className="font-semibold">Solution proposée :</span> remplacement produit sous 5j, avoir de 10% sur la prochaine commande.
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => toast.success("Dossier transféré au service qualité")}>Transférer qualité</Button>
            <Button size="sm" onClick={() => toast.success("Statut mis à jour")}>Marquer en cours</Button>
          </div>
        </div>
      )}

      <Section title="Tickets récents">
        <div className="space-y-2">
          {reclamations.map((r) => (
            <div key={r.id} className="rounded-lg border bg-card p-3 flex items-center justify-between text-sm">
              <div>
                <div className="font-semibold">{r.id} · {r.client}</div>
                <div className="text-xs text-muted-foreground">{r.type}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{r.urgence}</Badge>
                <Badge className={cn(r.statut === "Résolu" ? "bg-success text-success-foreground" : "")}>
                  {r.statut}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ---------- 10. Reporting ---------- */
function ReportingAgent() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Kpi label="Devis envoyés" value={reporting.devisEnvoyes} />
        <Kpi label="Taux conversion" value={reporting.tauxConversion} />
        <Kpi label="CA" value={reporting.chiffreAffaires} />
        <Kpi label="Commandes en retard" value={reporting.commandesRetard} />
        <Kpi label="Ruptures" value={reporting.ruptures} />
        <Kpi label="Réclamations" value={reporting.reclamations} />
        <Kpi label="Top produit" value={reporting.topProduits[0].nom} />
        <Kpi label="Devis actifs" value={devis.length} />
      </div>

      <Section title="Produits les plus demandés">
        <div className="space-y-1.5">
          {reporting.topProduits.map((p) => (
            <div key={p.nom} className="flex items-center gap-3">
              <div className="text-sm w-40 shrink-0">{p.nom}</div>
              <Progress value={(p.qte / reporting.topProduits[0].qte) * 100} className="flex-1" />
              <div className="text-sm w-10 text-right font-medium">{p.qte}</div>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-lg border bg-primary/5 border-primary/30 p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" />
          Résumé IA — Priorités de la semaine
        </div>
        <p className="text-sm text-foreground leading-relaxed">{reporting.resume}</p>
      </div>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-lg font-bold mt-1 truncate">{value}</div>
    </div>
  );
}
