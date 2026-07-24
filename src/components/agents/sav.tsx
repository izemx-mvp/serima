import { useState } from "react";
import { AlertTriangle, Camera, Image as ImageIcon, ArrowRight, UserPlus, MailQuestion, Reply, Repeat, FileMinus, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const CATS = ["produit non conforme", "quantité incorrecte", "dommage de transport", "retard de livraison", "problème d'outillage", "document manquant"];

const TICKETS = [
  { id: "REC-2026-014", client: "Industrie Rhône", cat: "produit non conforme", produit: "PL-POM-P20", urg: "Haute", date: "22/07", resp: "Sophie L.", statut: "En analyse" },
  { id: "REC-2026-013", client: "MetalCorp SAS", cat: "quantité incorrecte", produit: "IN-304-T20", urg: "Moyenne", date: "21/07", resp: "Marc D.", statut: "Action en cours" },
  { id: "REC-2026-012", client: "Techno Plast", cat: "retard de livraison", produit: "AL-6060-B30", urg: "Basse", date: "20/07", resp: "Sophie L.", statut: "En attente client" },
  { id: "REC-2026-011", client: "Atelier Dupont", cat: "document manquant", produit: "HX-450-P08", urg: "Moyenne", date: "19/07", resp: "Julie R.", statut: "Résolu" },
];

const URG_COLORS: Record<string, string> = {
  Haute: "bg-destructive text-destructive-foreground",
  Moyenne: "bg-warning text-warning-foreground",
  Basse: "bg-muted text-foreground",
};

const WORKFLOW = ["Nouveau", "En analyse", "Action en cours", "En attente client", "Résolu"];

export default function SavAgent() {
  const [sel, setSel] = useState(TICKETS[0]);
  const currentStep = WORKFLOW.indexOf(sel.statut);

  return (
    <>
      <AgentHeader
        icon={AlertTriangle}
        name="Agent réclamations et SAV"
        mission="Analyse les réclamations, détermine leur urgence et propose les actions de résolution les plus adaptées."
        onDemo={() => toast.success("Nouvelle réclamation classifiée")}
        recu="Réclamations clients avec descriptions, photos et pièces jointes."
        analyse="Catégorie de problème, cause probable, impact et responsabilité."
        produit="Ticket qualifié, solution recommandée et délai de résolution estimé."
      />

      <div className="flex flex-wrap gap-1.5">
        <span className="text-[10px] uppercase text-muted-foreground self-center mr-1">Catégories :</span>
        {CATS.map((c) => <Badge key={c} variant="outline" className="text-[10px] capitalize">{c}</Badge>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <SectionBlock title="Tickets SAV" className="lg:col-span-5">
          <div className="space-y-1.5">
            {TICKETS.map((t) => (
              <button key={t.id} onClick={() => setSel(t)}
                className={`w-full text-left rounded-md border p-2.5 transition-colors ${sel.id === t.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono">{t.id}</div>
                  <Badge className={`${URG_COLORS[t.urg]} text-[10px]`}>{t.urg}</Badge>
                </div>
                <div className="text-sm font-medium mt-1">{t.client}</div>
                <div className="text-[11px] text-muted-foreground capitalize">{t.cat} · {t.produit}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">{t.date} · {t.resp}</span>
                  <Badge variant="outline" className="text-[9px]">{t.statut}</Badge>
                </div>
              </button>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title={`Détail — ${sel.id}`} className="lg:col-span-7">
          <div className="flex items-center gap-1 flex-wrap">
            {WORKFLOW.map((w, i) => (
              <div key={w} className="flex items-center gap-1">
                <div className={`rounded-full px-2.5 py-1 text-[10px] font-medium border ${i <= currentStep ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground"}`}>
                  {i < currentStep && <Check className="inline h-3 w-3 mr-0.5" />}
                  {w}
                </div>
                {i < WORKFLOW.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2 text-xs">
              <div className="rounded-md border p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Description</div>
                <p className="mt-0.5">Client signale que les plaques POM 20mm reçues ont une épaisseur de 20,35mm au lieu de 20mm. Impact usinage.</p>
              </div>
              <div className="rounded-md border p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Commande / produit</div>
                <div>Commande CMD-2026-020 · {sel.produit}</div>
              </div>
              <div className="rounded-md border p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Pièces jointes</div>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-center h-14 w-14 rounded border bg-muted/40">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                  <div className="flex items-center justify-center h-14 w-14 rounded border bg-muted/40">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              <div className="rounded-md border p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Historique</div>
                <ul className="mt-1 space-y-0.5 text-[11px]">
                  <li>22/07 09:14 — Ticket créé</li>
                  <li>22/07 10:02 — Analyse IA effectuée</li>
                  <li>22/07 11:20 — Affectation Sophie L.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
                <div className="text-[10px] uppercase text-primary font-semibold">Analyse IA</div>
                <ul className="mt-1 space-y-1">
                  <li><span className="text-muted-foreground">Problème :</span> tolérance dimensionnelle dépassée</li>
                  <li><span className="text-muted-foreground">Urgence :</span> haute</li>
                  <li><span className="text-muted-foreground">Cause probable :</span> lot fournisseur non conforme</li>
                  <li><span className="text-muted-foreground">Service :</span> qualité + achats</li>
                  <li><span className="text-muted-foreground">Solution :</span> remplacement immédiat + avoir</li>
                  <li><span className="text-muted-foreground">Délai estimé :</span> 3 jours ouvrés</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <Button size="sm" variant="outline" onClick={() => toast.success("Ticket affecté")}><UserPlus className="h-3.5 w-3.5" /> Affecter</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Informations demandées")}><MailQuestion className="h-3.5 w-3.5" /> Infos</Button>
                <Button size="sm" onClick={() => toast.success("Réponse envoyée")}><Reply className="h-3.5 w-3.5" /> Répondre</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Remplacement proposé")}><Repeat className="h-3.5 w-3.5" /> Remplacement</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Avoir créé")}><FileMinus className="h-3.5 w-3.5" /> Avoir</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Transféré au qualité")}><Send className="h-3.5 w-3.5" /> Qualité</Button>
                <Button size="sm" variant="outline" className="col-span-2" onClick={() => toast.success("Réclamation clôturée")}><Check className="h-3.5 w-3.5" /> Clôturer la réclamation</Button>
              </div>
            </div>
          </div>
        </SectionBlock>
      </div>
    </>
  );
}
