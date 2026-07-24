import { useState } from "react";
import { ShoppingBag, Award, FileText, Send, ClipboardCheck, PhoneCall, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const BESOINS = [
  { produit: "Tôle Hardox 450 10mm", qte: 30, urgence: "Haute", stock: 4, date: "31/07" },
  { produit: "Tube inox 304 Ø20", qte: 50, urgence: "Moyenne", stock: 8, date: "05/08" },
  { produit: "Plaque POM 20mm", qte: 20, urgence: "Haute", stock: 0, date: "28/07" },
];

const FOURNISSEURS = [
  { nom: "AcierPro SA", prix: 8200, delai: 5, paiement: "30j fin de mois", qualite: 5, dispo: "Immédiate", fiab: 96 },
  { nom: "MétaFrance", prix: 8450, delai: 3, paiement: "45j", qualite: 5, dispo: "Sur commande", fiab: 92 },
  { nom: "SteelDirect", prix: 7980, delai: 8, paiement: "Comptant", qualite: 4, dispo: "Immédiate", fiab: 87 },
];

const URG_COLORS: Record<string, string> = {
  "Haute": "bg-destructive text-destructive-foreground",
  "Moyenne": "bg-warning text-warning-foreground",
  "Basse": "bg-muted text-foreground",
};

export default function AchatsAgent() {
  const [chosen, setChosen] = useState("AcierPro SA");

  return (
    <>
      <AgentHeader
        icon={ShoppingBag}
        name="Agent achats et approvisionnement"
        mission="Analyse les besoins de réapprovisionnement, consulte les fournisseurs et compare les offres pour recommander la meilleure décision."
        onDemo={() => toast.success("Consultation envoyée aux 3 fournisseurs")}
        recu="Besoins détectés, stocks bas et commandes clients à honorer."
        analyse="Prix, délais, qualité, historique de fiabilité et conditions de paiement."
        produit="Comparatif d'offres et recommandation chiffrée avec risques."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionBlock title="Besoins détectés">
          <div className="space-y-2">
            {BESOINS.map((b) => (
              <div key={b.produit} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{b.produit}</div>
                  <div className="text-[11px] text-muted-foreground">Stock : {b.stock} · Besoin : {b.qte} · Souhaité le {b.date}</div>
                </div>
                <Badge className={`${URG_COLORS[b.urgence]} text-[10px]`}>{b.urgence}</Badge>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Fournisseurs consultés">
          <div className="grid grid-cols-1 gap-2">
            {FOURNISSEURS.map((f) => (
              <div key={f.nom} className={`rounded-lg border p-3 ${chosen === f.nom ? "border-primary bg-primary/5" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{f.nom}</div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Award className="h-3 w-3" /> Fiabilité {f.fiab}%
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2 text-[11px]">
                  <div><div className="text-muted-foreground">Prix</div><div className="font-medium">{f.prix.toLocaleString("fr-FR")} €</div></div>
                  <div><div className="text-muted-foreground">Délai</div><div className="font-medium">{f.delai} j</div></div>
                  <div><div className="text-muted-foreground">Paiement</div><div className="font-medium">{f.paiement}</div></div>
                  <div><div className="text-muted-foreground">Dispo</div><div className="font-medium">{f.dispo}</div></div>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      </div>

      <SectionBlock title="Comparaison des offres">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Fournisseur</TableHead>
              <TableHead className="text-[10px] text-right">Prix</TableHead>
              <TableHead className="text-[10px] text-right">Délai</TableHead>
              <TableHead className="text-[10px]">Paiement</TableHead>
              <TableHead className="text-[10px] text-right">Qualité</TableHead>
              <TableHead className="text-[10px] text-right">Fiabilité</TableHead>
              <TableHead className="text-[10px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FOURNISSEURS.map((f) => (
              <TableRow key={f.nom} className={chosen === f.nom ? "bg-primary/5" : ""}>
                <TableCell className="text-xs font-medium">{f.nom}</TableCell>
                <TableCell className="text-xs text-right">{f.prix.toLocaleString("fr-FR")} €</TableCell>
                <TableCell className="text-xs text-right">{f.delai} j</TableCell>
                <TableCell className="text-xs">{f.paiement}</TableCell>
                <TableCell className="text-xs text-right">{"★".repeat(f.qualite)}</TableCell>
                <TableCell className="text-xs text-right">{f.fiab}%</TableCell>
                <TableCell>
                  <Button size="sm" variant={chosen === f.nom ? "default" : "outline"} onClick={() => { setChosen(f.nom); toast.success(`${f.nom} sélectionné`); }}>
                    {chosen === f.nom ? "Sélectionné" : "Choisir"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionBlock>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="Recommandation de l'agent" className="lg:col-span-2">
          <div className="rounded-lg border bg-gradient-to-br from-success/10 to-transparent p-4 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <div className="text-sm font-semibold">Retenir : AcierPro SA</div>
            </div>
            <p className="text-xs text-muted-foreground">
              Meilleur compromis qualité / délai / fiabilité. Prix compétitif à 220 € au-dessus du moins-disant mais fiabilité supérieure (96 %) et disponibilité immédiate évitent tout risque de retard sur la commande CMD-2026-020.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t">
              <div><div className="text-[10px] text-muted-foreground">Économie</div><div className="text-sm font-semibold text-success">+250 € vs MétaFrance</div></div>
              <div><div className="text-[10px] text-muted-foreground">Délai estimé</div><div className="text-sm font-semibold">5 jours</div></div>
              <div><div className="text-[10px] text-muted-foreground">Risque</div><div className="text-sm font-semibold text-warning-foreground">Faible</div></div>
            </div>
            <div className="text-[11px] text-muted-foreground border-t pt-2">
              Fournisseur alternatif : <span className="font-medium text-foreground">SteelDirect</span> si contrainte budgétaire.
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Actions">
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => toast.success("Demande de prix générée")}><FileText className="h-3.5 w-3.5" /> Générer une demande de prix</Button>
            <Button variant="outline" onClick={() => toast.success("Consultation envoyée")}><Send className="h-3.5 w-3.5" /> Envoyer aux fournisseurs</Button>
            <Button onClick={() => toast.success("Bon de commande créé")}><ClipboardCheck className="h-3.5 w-3.5" /> Créer un bon de commande</Button>
            <Button variant="outline" onClick={() => toast.success("Relance envoyée")}><PhoneCall className="h-3.5 w-3.5" /> Relancer le fournisseur</Button>
          </div>
        </SectionBlock>
      </div>
    </>
  );
}
