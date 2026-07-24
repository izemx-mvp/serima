import { useState } from "react";
import { FileText, Mail, MessageCircle, Globe, FileSpreadsheet, FileType, AlertTriangle, Send, Download, Edit, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const DEMANDES = [
  { id: "D-091", client: "MetalCorp SAS", source: "Email", icon: Mail, date: "24/07", produits: 3, statut: "Nouveau" },
  { id: "D-090", client: "Atelier Dupont", source: "WhatsApp", icon: MessageCircle, date: "24/07", produits: 2, statut: "En cours" },
  { id: "D-089", client: "Industrie Rhône", source: "Site web", icon: Globe, date: "23/07", produits: 5, statut: "Traité" },
  { id: "D-088", client: "Techno Plast", source: "PDF", icon: FileType, date: "23/07", produits: 1, statut: "Nouveau" },
  { id: "D-087", client: "Constructions BTS", source: "Excel", icon: FileSpreadsheet, date: "22/07", produits: 8, statut: "En cours" },
];

const LIGNES = [
  { ref: "HX-450-P08", des: "Tôle Hardox 450 8mm", dim: "2000×6000", qte: 12, pu: 1040, dispo: "OK", remise: 3, incertain: false },
  { ref: "IN-304-T20", des: "Tube inox 304 Ø20", dim: "L=6m", qte: 40, pu: 28, dispo: "OK", remise: 5, incertain: false },
  { ref: "?", des: "Barre acier — dimensions incomplètes", dim: "à préciser", qte: 0, pu: 0, dispo: "?", remise: 0, incertain: true },
];

export default function DevisAgent() {
  const [selected, setSelected] = useState("D-091");
  const [issued, setIssued] = useState(false);
  const total = LIGNES.filter(l => !l.incertain).reduce((s, l) => s + l.qte * l.pu * (1 - l.remise / 100), 0);
  const tva = total * 0.2;

  return (
    <>
      <AgentHeader
        icon={FileText}
        name="Agent de traitement des devis"
        mission="Analyse les demandes reçues sur tous les canaux et génère automatiquement un brouillon de devis prêt à être vérifié."
        onDemo={() => { setIssued(true); toast.success("Brouillon de devis généré"); }}
        recu="Demandes par email, WhatsApp, formulaires, PDF ou fichiers Excel."
        analyse="Références, dimensions, quantités et conditions commerciales."
        produit="Brouillon de devis structuré, chiffré et prêt à valider."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Demandes reçues */}
        <SectionBlock title="Demandes reçues" className="lg:col-span-3">
          <div className="space-y-1.5">
            {DEMANDES.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelected(d.id)}
                className={`w-full text-left rounded-md border p-2.5 transition-colors ${selected === d.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <d.icon className="h-3 w-3" /> {d.source}
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.date}</span>
                </div>
                <div className="text-sm font-medium mt-1">{d.client}</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] text-muted-foreground">{d.produits} produit(s)</span>
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">{d.statut}</Badge>
                </div>
              </button>
            ))}
          </div>
        </SectionBlock>

        {/* Informations extraites */}
        <SectionBlock title="Informations extraites par l'IA" className="lg:col-span-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Réf.</TableHead>
                <TableHead className="text-[10px]">Désignation</TableHead>
                <TableHead className="text-[10px]">Dim.</TableHead>
                <TableHead className="text-[10px] text-right">Qté</TableHead>
                <TableHead className="text-[10px] text-right">PU</TableHead>
                <TableHead className="text-[10px] text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LIGNES.map((l, i) => (
                <TableRow key={i} className={l.incertain ? "bg-warning/10" : ""}>
                  <TableCell className="text-xs font-mono">{l.ref}</TableCell>
                  <TableCell className="text-xs">
                    {l.des}
                    {l.incertain && (
                      <Badge variant="outline" className="ml-2 text-[9px] gap-1 border-warning text-warning-foreground">
                        <AlertTriangle className="h-2.5 w-2.5" /> à préciser
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs">{l.dim}</TableCell>
                  <TableCell className="text-xs text-right">{l.qte || "—"}</TableCell>
                  <TableCell className="text-xs text-right">{l.pu ? `${l.pu} €` : "—"}</TableCell>
                  <TableCell className="text-xs text-right font-medium">
                    {l.pu ? `${(l.qte * l.pu * (1 - l.remise / 100)).toLocaleString("fr-FR")} €` : "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex gap-2 pt-2 border-t">
            <Button size="sm" variant="outline" onClick={() => toast.success("Corrections demandées au client")}><Edit className="h-3.5 w-3.5" /> Corriger</Button>
            <Button size="sm" onClick={() => { setIssued(true); toast.success("Brouillon généré"); }}>Générer le devis</Button>
          </div>
        </SectionBlock>

        {/* Brouillon devis */}
        <SectionBlock title="Brouillon du devis" className="lg:col-span-4">
          {!issued && <div className="text-xs text-muted-foreground text-center py-8 border border-dashed rounded-md">Générez le devis pour afficher le brouillon.</div>}
          {issued && (
            <div className="rounded-lg border bg-card p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-semibold text-sm">DEV-2026-142</div>
                  <div className="text-muted-foreground">MetalCorp SAS · 24/07/2026</div>
                </div>
                <Badge className="bg-success text-success-foreground gap-1"><CheckCircle2 className="h-3 w-3" /> Prêt</Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Sous-total HT</span><span className="font-medium">{total.toLocaleString("fr-FR")} €</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">TVA 20 %</span><span>{tva.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</span></div>
                <div className="flex justify-between border-t pt-1 text-sm font-semibold"><span>Total TTC</span><span>{(total + tva).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €</span></div>
              </div>
              <div className="border-t pt-2 space-y-0.5 text-[11px] text-muted-foreground">
                <div>Paiement : 30 jours fin de mois</div>
                <div>Livraison : sous 7 jours ouvrés</div>
                <div>Validité : 30 jours</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Button size="sm" variant="outline" onClick={() => toast.success("Envoyé au commercial")}>Au commercial</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Export PDF prêt")}><Download className="h-3.5 w-3.5" /> PDF</Button>
                <Button size="sm" className="col-span-2" onClick={() => toast.success("Devis envoyé au client")}><Send className="h-3.5 w-3.5" /> Envoyer au client</Button>
              </div>
            </div>
          )}
        </SectionBlock>
      </div>
    </>
  );
}
