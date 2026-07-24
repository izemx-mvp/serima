import { useState } from "react";
import { Truck, CheckCircle2, Circle, Clock, AlertCircle, Bell, Phone, Edit, FileBarChart, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const COMMANDES = [
  { id: "CMD-2026-020", client: "MetalCorp SAS", montant: "12 480 €", date: "22/07", etat: "Préparation", progression: 43, livraison: "31/07", risque: "Moyen" },
  { id: "CMD-2026-019", client: "Atelier Dupont", montant: "3 220 €", date: "21/07", etat: "Découpe", progression: 57, livraison: "28/07", risque: "Faible" },
  { id: "CMD-2026-018", client: "Industrie Rhône", montant: "8 750 €", date: "18/07", etat: "Expédition", progression: 86, livraison: "24/07", risque: "Élevé" },
  { id: "CMD-2026-017", client: "Techno Plast", montant: "5 100 €", date: "17/07", etat: "Livrée", progression: 100, livraison: "22/07", risque: "Aucun" },
];

type Etape = { nom: string; datePrevue: string; dateReelle: string; resp: string; statut: "OK" | "En cours" | "À venir" | "Retard" };

const ETAPES: Etape[] = [
  { nom: "Commande validée", datePrevue: "18/07", dateReelle: "18/07", resp: "S. Léger", statut: "OK" },
  { nom: "Vérification du stock", datePrevue: "19/07", dateReelle: "19/07", resp: "Stock", statut: "OK" },
  { nom: "Préparation", datePrevue: "20/07", dateReelle: "20/07", resp: "Atelier A", statut: "OK" },
  { nom: "Découpe / transformation", datePrevue: "21/07", dateReelle: "22/07", resp: "Atelier découpe", statut: "OK" },
  { nom: "Contrôle qualité", datePrevue: "22/07", dateReelle: "23/07", resp: "Qualité", statut: "OK" },
  { nom: "Expédition", datePrevue: "23/07", dateReelle: "—", resp: "Logistique", statut: "Retard" },
  { nom: "Livraison", datePrevue: "24/07", dateReelle: "—", resp: "Transporteur", statut: "À venir" },
];

const RISK_COLORS: Record<string, string> = {
  "Élevé": "bg-destructive text-destructive-foreground",
  "Moyen": "bg-warning text-warning-foreground",
  "Faible": "bg-success text-success-foreground",
  "Aucun": "bg-muted text-foreground",
};

export default function SuiviAgent() {
  const [sel, setSel] = useState(COMMANDES[2].id);
  const cmd = COMMANDES.find((c) => c.id === sel)!;

  return (
    <>
      <AgentHeader
        icon={Truck}
        name="Agent de suivi des commandes et livraisons"
        mission="Suit chaque commande depuis sa validation jusqu'à sa livraison au client et anticipe les retards."
        onDemo={() => toast.success("38 commandes analysées")}
        recu="État des commandes, plannings atelier, contrôles qualité et transports."
        analyse="Charges, retards, dépendances et impact client."
        produit="Chronologie détaillée, alertes anticipées et actions correctives."
      />

      <SectionBlock title="Commandes en cours">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">N°</TableHead>
              <TableHead className="text-[10px]">Client</TableHead>
              <TableHead className="text-[10px] text-right">Montant</TableHead>
              <TableHead className="text-[10px]">État</TableHead>
              <TableHead className="text-[10px]">Progression</TableHead>
              <TableHead className="text-[10px]">Livraison</TableHead>
              <TableHead className="text-[10px]">Risque</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COMMANDES.map((c) => (
              <TableRow key={c.id} onClick={() => setSel(c.id)} className={`cursor-pointer ${sel === c.id ? "bg-primary/5" : ""}`}>
                <TableCell className="text-xs font-mono">{c.id}</TableCell>
                <TableCell className="text-xs font-medium">{c.client}</TableCell>
                <TableCell className="text-xs text-right">{c.montant}</TableCell>
                <TableCell className="text-xs">{c.etat}</TableCell>
                <TableCell className="w-40"><Progress value={c.progression} className="h-1.5" /></TableCell>
                <TableCell className="text-xs">{c.livraison}</TableCell>
                <TableCell><Badge className={`${RISK_COLORS[c.risque]} text-[10px]`}>{c.risque}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionBlock>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title={`Chronologie — ${cmd.id}`} className="lg:col-span-2">
          <div className="relative pl-6">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
            <div className="space-y-4">
              {ETAPES.map((e, i) => {
                const Icon = e.statut === "OK" ? CheckCircle2 : e.statut === "Retard" ? AlertCircle : e.statut === "En cours" ? Clock : Circle;
                const iconColor = e.statut === "OK" ? "text-success" : e.statut === "Retard" ? "text-destructive" : e.statut === "En cours" ? "text-primary" : "text-muted-foreground";
                return (
                  <div key={i} className="relative">
                    <Icon className={`absolute -left-6 top-0 h-4 w-4 ${iconColor} bg-background`} />
                    <div className="rounded-md border p-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{e.nom}</div>
                        <Badge variant="outline" className="text-[10px]">{e.statut}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-1 text-[11px] text-muted-foreground">
                        <div>Prévu : <span className="text-foreground">{e.datePrevue}</span></div>
                        <div>Réel : <span className={e.statut === "Retard" ? "text-destructive font-medium" : "text-foreground"}>{e.dateReelle}</span></div>
                        <div>Resp. : <span className="text-foreground">{e.resp}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Analyse IA">
          <div className="space-y-3 text-xs">
            <div className="rounded-md border bg-destructive/10 border-destructive/30 p-3">
              <div className="flex items-center gap-1.5 text-destructive font-semibold">
                <AlertTriangle className="h-3.5 w-3.5" /> Risque de retard : élevé
              </div>
              <p className="text-foreground/80 mt-1">Retard de 24 h détecté à l'étape « Expédition » — transporteur saturé.</p>
            </div>
            <Line label="Cause probable" value="Créneau transporteur reporté" />
            <Line label="Impact client" value="Retard 1 jour sur planning chantier" />
            <Line label="Nouvelle date estimée" value="25/07/2026" />
            <div className="rounded-md bg-primary/5 border border-primary/30 p-2.5">
              <div className="text-[10px] uppercase text-primary font-semibold">Action recommandée</div>
              <div>Informer proactivement Industrie Rhône, proposer une compensation commerciale.</div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Button size="sm" onClick={() => toast.success("Client informé")}><Bell className="h-3.5 w-3.5" /> Informer</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Nouvelle date envoyée")}><Edit className="h-3.5 w-3.5" /> Modifier date</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Logistique contactée")}><Phone className="h-3.5 w-3.5" /> Logistique</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Rapport de suivi généré")}><FileBarChart className="h-3.5 w-3.5" /> Rapport</Button>
            </div>
          </div>
        </SectionBlock>
      </div>
    </>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b pb-1.5">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}
