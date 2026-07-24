import { useState } from "react";
import { FileCheck, Search, Filter, AlertOctagon, Send, Plus, Check, MailQuestion } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const FILTERS = [
  "Fiches techniques", "Certificats matière", "Certificats de conformité",
  "Normes", "Rapports de contrôle", "Procédures", "Non-conformités",
];

const DOCS = [
  { nom: "Fiche technique Hardox 450", type: "Fiche technique", ref: "FT-HX450", produit: "HX-450-P08", client: "MetalCorp", date: "12/06/2026", version: "v3", statut: "Valide" },
  { nom: "Certificat matière 3.1 Inox 304", type: "Certificat matière", ref: "CM-304-0725", produit: "IN-304-T20", client: "Atelier Dupont", date: "04/07/2026", version: "v1", statut: "Valide" },
  { nom: "Bon de livraison CMD-018", type: "BL", ref: "BL-2026-018", produit: "—", client: "Industrie Rhône", date: "—", version: "—", statut: "Manquant" },
  { nom: "Rapport de contrôle POM", type: "Rapport de contrôle", ref: "RC-POM-042", produit: "PL-POM-P20", client: "Techno Plast", date: "18/07/2026", version: "v1", statut: "Non conforme" },
  { nom: "Norme EN 10088-2", type: "Norme", ref: "EN-10088-2", produit: "Inox", client: "—", date: "01/01/2024", version: "2024", statut: "Valide" },
];

const NC = [
  { id: "NC-2026-004", pb: "Épaisseur POM 20mm hors tolérance (+0.35mm)", produit: "PL-POM-P20", resp: "Contrôle qualité", urg: "Haute", action: "Réception à isoler, contact fournisseur", statut: "En cours" },
  { id: "NC-2026-003", pb: "Certificat matière manquant lot Inox 304", produit: "IN-304-T20", resp: "Achats", urg: "Moyenne", action: "Relance fournisseur MétaFrance", statut: "Ouvert" },
];

const STATUT_COLORS: Record<string, string> = {
  Valide: "bg-success text-success-foreground",
  Manquant: "bg-warning text-warning-foreground",
  "Non conforme": "bg-destructive text-destructive-foreground",
};

export default function DocAgent() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState(DOCS[1]);
  const [active, setActive] = useState<string[]>([]);

  const toggle = (f: string) => setActive((a) => (a.includes(f) ? a.filter((x) => x !== f) : [...a, f]));

  return (
    <>
      <AgentHeader
        icon={FileCheck}
        name="Agent documentaire et qualité"
        mission="Recherche les documents techniques, contrôle leur conformité et facilite le suivi qualité."
        onDemo={() => toast.success("Analyse documentaire lancée sur 4 218 documents")}
        recu="Fiches techniques, certificats, rapports de contrôle et procédures."
        analyse="Validité, cohérence des versions, conformité aux normes et documents manquants."
        produit="Rapport de conformité, alertes qualité et non-conformités structurées."
      />

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher une fiche technique, un certificat ou une référence..." className="pl-10 h-11" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {FILTERS.map((f) => (
            <button key={f} onClick={() => toggle(f)} className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${active.includes(f) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="Documents" className="lg:col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[10px]">Nom</TableHead>
                <TableHead className="text-[10px]">Type</TableHead>
                <TableHead className="text-[10px]">Réf. produit</TableHead>
                <TableHead className="text-[10px]">Client</TableHead>
                <TableHead className="text-[10px]">Date</TableHead>
                <TableHead className="text-[10px]">Version</TableHead>
                <TableHead className="text-[10px]">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DOCS.filter((d) => !q || d.nom.toLowerCase().includes(q.toLowerCase()) || d.ref.toLowerCase().includes(q.toLowerCase())).map((d) => (
                <TableRow key={d.ref} onClick={() => setSelected(d)} className={`cursor-pointer ${selected.ref === d.ref ? "bg-primary/5" : ""}`}>
                  <TableCell className="text-xs font-medium">{d.nom}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.type}</TableCell>
                  <TableCell className="text-xs font-mono">{d.produit}</TableCell>
                  <TableCell className="text-xs">{d.client}</TableCell>
                  <TableCell className="text-xs">{d.date}</TableCell>
                  <TableCell className="text-xs">{d.version}</TableCell>
                  <TableCell><Badge className={`${STATUT_COLORS[d.statut] ?? "bg-muted"} text-[10px]`}>{d.statut}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionBlock>

        <SectionBlock title="Analyse du document">
          <div className="space-y-2 text-xs">
            <div className="rounded-md border p-2.5">
              <div className="text-[10px] uppercase text-muted-foreground">Document sélectionné</div>
              <div className="text-sm font-semibold">{selected.nom}</div>
              <div className="text-muted-foreground">{selected.type} · {selected.version}</div>
            </div>
            <Row label="Informations détectées" value="Nuance 1.4301, épaisseur, dimensions, mill test result" />
            <Row label="Date d'expiration" value="—" />
            <Row label="Documents manquants" value="Bon de livraison signé" warn />
            <Row label="Anomalies" value="Aucune anomalie détectée" />
            <Row label="Conformité" value="Conforme EN 10204 type 3.1" ok />
            <div className="rounded-md bg-primary/5 border border-primary/20 p-2.5">
              <div className="text-[10px] uppercase text-primary font-semibold">Recommandation</div>
              <div className="text-xs">Valider et transmettre au client. Demander le BL au transporteur.</div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => toast.success("Envoyé au client")}><Send className="h-3.5 w-3.5" /> Envoyer</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Document manquant demandé")}><MailQuestion className="h-3.5 w-3.5" /> Demander</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("NC créée")}><Plus className="h-3.5 w-3.5" /> Créer NC</Button>
              <Button size="sm" onClick={() => toast.success("Document validé")}><Check className="h-3.5 w-3.5" /> Valider</Button>
            </div>
          </div>
        </SectionBlock>
      </div>

      <SectionBlock title="Non-conformités ouvertes">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">N°</TableHead>
              <TableHead className="text-[10px]">Problème</TableHead>
              <TableHead className="text-[10px]">Produit</TableHead>
              <TableHead className="text-[10px]">Responsable</TableHead>
              <TableHead className="text-[10px]">Urgence</TableHead>
              <TableHead className="text-[10px]">Action corrective</TableHead>
              <TableHead className="text-[10px]">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {NC.map((n) => (
              <TableRow key={n.id}>
                <TableCell className="text-xs font-mono">{n.id}</TableCell>
                <TableCell className="text-xs">{n.pb}</TableCell>
                <TableCell className="text-xs font-mono">{n.produit}</TableCell>
                <TableCell className="text-xs">{n.resp}</TableCell>
                <TableCell><Badge className={n.urg === "Haute" ? "bg-destructive text-destructive-foreground text-[10px]" : "bg-warning text-warning-foreground text-[10px]"}>{n.urg}</Badge></TableCell>
                <TableCell className="text-xs text-muted-foreground">{n.action}</TableCell>
                <TableCell><Badge variant="outline" className="text-[10px]">{n.statut}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionBlock>
    </>
  );
}

function Row({ label, value, warn, ok }: { label: string; value: string; warn?: boolean; ok?: boolean }) {
  return (
    <div className={`rounded-md border p-2 ${warn ? "bg-warning/10 border-warning/30" : ok ? "bg-success/10 border-success/30" : ""}`}>
      <div className="text-[10px] uppercase text-muted-foreground flex items-center gap-1">
        {warn && <AlertOctagon className="h-3 w-3 text-warning-foreground" />}
        {label}
      </div>
      <div className="text-xs">{value}</div>
    </div>
  );
}
