import { useState } from "react";
import { MessageSquare, MessageCircle, Mail, Globe, Send, Edit, FileText, Sparkles, UserPlus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const CANAUX: Record<string, { icon: any; color: string }> = {
  WhatsApp: { icon: MessageCircle, color: "bg-green-500 text-white" },
  Email: { icon: Mail, color: "bg-blue-500 text-white" },
  "Site web": { icon: Globe, color: "bg-slate-500 text-white" },
};

const CONVS = [
  { id: 1, nom: "Jean Dupont", entreprise: "Atelier Dupont", canal: "WhatsApp", dernier: "Oui, pour 20 unités svp", heure: "09:13", statut: "Ouvert", priorite: "Haute" },
  { id: 2, nom: "M. Martin", entreprise: "MetalCorp SAS", canal: "Email", dernier: "Merci pour le devis, question sur…", heure: "08:45", statut: "En attente", priorite: "Moyenne" },
  { id: 3, nom: "Mme Petit", entreprise: "Industrie Rhône", canal: "Site web", dernier: "Formulaire — demande fiche technique", heure: "hier", statut: "Nouveau", priorite: "Basse" },
  { id: 4, nom: "M. Bernard", entreprise: "Techno Plast", canal: "WhatsApp", dernier: "Pouvez-vous confirmer la livraison ?", heure: "hier", statut: "Résolu", priorite: "Basse" },
];

const MSG = [
  { from: "client", text: "Bonjour, avez-vous du tube inox 304 Ø20 en stock ?", time: "09:12" },
  { from: "agent", text: "Bonjour Jean, oui 8 unités disponibles emplacement B2-11. Souhaitez-vous un devis ?", time: "09:12" },
  { from: "client", text: "Oui, pour 20 unités svp.", time: "09:13" },
];

const SUGGESTIONS = [
  "Nous préparons un devis pour 20 tubes inox 304 Ø20. Attention : stock actuel 8 unités, un délai de 3 jours est nécessaire pour compléter la commande.",
  "Je vous confirme l'envoi de la fiche technique inox 304 par email dans les prochaines minutes.",
];

export default function ServiceClientAgent() {
  const [sel, setSel] = useState(CONVS[0]);
  const [reply, setReply] = useState(SUGGESTIONS[0]);

  return (
    <>
      <AgentHeader
        icon={MessageSquare}
        name="Agent service client omnicanal"
        mission="Centralise et traite les demandes provenant de WhatsApp, des e-mails et du site web."
        onDemo={() => toast.success("Nouvelle conversation attribuée")}
        recu="Messages entrants sur WhatsApp, email et formulaire du site web."
        analyse="Historique du client, contexte commercial et intention détectée."
        produit="Réponses suggérées prêtes à valider et actions commerciales pertinentes."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionBlock title="Conversations" className="lg:col-span-3">
          <div className="space-y-1.5">
            {CONVS.map((c) => {
              const C = CANAUX[c.canal];
              return (
                <button key={c.id} onClick={() => setSel(c)}
                  className={`w-full text-left rounded-md border p-2.5 transition-colors ${sel.id === c.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex h-5 w-5 items-center justify-center rounded ${C.color}`}>
                        <C.icon className="h-3 w-3" />
                      </span>
                      <span className="text-xs font-medium">{c.nom}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{c.heure}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate mt-1">{c.dernier}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">{c.statut}</Badge>
                    {c.priorite === "Haute" && <Badge className="bg-destructive text-destructive-foreground text-[9px] px-1.5 py-0">Urgent</Badge>}
                  </div>
                </button>
              );
            })}
          </div>
        </SectionBlock>

        <SectionBlock title={`${sel.nom} — ${sel.canal}`} className="lg:col-span-6">
          <div className="rounded-md border bg-muted/20 p-3 space-y-2 max-h-64 overflow-y-auto">
            {MSG.map((m, i) => (
              <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-lg px-3 py-2 text-xs ${m.from === "agent" ? "bg-primary text-primary-foreground" : "bg-card border"}`}>
                  {m.text}
                  <div className={`text-[9px] mt-0.5 ${m.from === "agent" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/5 p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Compréhension de la demande par l'IA
            </div>
            <p className="text-xs text-foreground/80">
              Le client souhaite connaître la disponibilité d'un tube inox 304 Ø20 et confirmer une commande de 20 unités. Stock actuel insuffisant (8 pcs), délai de réappro nécessaire.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] uppercase text-muted-foreground">Réponses suggérées</div>
            <div className="grid gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => setReply(s)} className={`text-left text-xs p-2 rounded border ${reply === s ? "border-primary bg-primary/5" : ""}`}>
                  {s}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={reply} onChange={(e) => setReply(e.target.value)} className="text-xs" />
              <Button size="sm" onClick={() => toast.success("Réponse envoyée")}><Send className="h-3.5 w-3.5" /></Button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button size="sm" variant="outline" onClick={() => toast.success("Réponse modifiée")}><Edit className="h-3.5 w-3.5" /> Modifier</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Fiche technique envoyée")}><FileText className="h-3.5 w-3.5" /> Fiche technique</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Devis créé")}>Créer devis</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Transféré à un conseiller")}><UserPlus className="h-3.5 w-3.5" /> Transférer</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Ticket SAV créé")}><Ticket className="h-3.5 w-3.5" /> Ticket SAV</Button>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Informations client" className="lg:col-span-3">
          <div className="space-y-3 text-xs">
            <div>
              <div className="text-sm font-semibold">{sel.entreprise}</div>
              <div className="text-muted-foreground">{sel.nom}</div>
            </div>
            <InfoRow label="Secteur" value="Chaudronnerie" />
            <InfoRow label="Commercial" value="Sophie Léger" />
            <InfoRow label="Commandes récentes" value="CMD-2026-019 · CMD-2026-014" />
            <InfoRow label="Devis en cours" value="DEV-2026-141" />
            <InfoRow label="Produits consultés" value="Inox 304, Inox 316" />
            <div className="rounded-md bg-success/10 p-2">
              <div className="text-[10px] uppercase text-success font-semibold">Satisfaction</div>
              <div className="text-sm font-semibold">Excellente (4.8/5)</div>
            </div>
          </div>
        </SectionBlock>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b pb-1.5">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-xs font-medium">{value}</div>
    </div>
  );
}
