import { useState } from "react";
import { Package, Search, TrendingDown, AlertCircle, Bell, Repeat, ShoppingCart, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

type Row = {
  ref: string; des: string; cat: string; dispo: number; reserve: number; min: number;
  emplacement: string; maj: string; statut: "Disponible" | "Stock faible" | "Rupture" | "Surstock";
};

const STOCKS: Row[] = [
  { ref: "AC-S235-P10", des: "Tôle S235 10mm 2000×1000", cat: "Aciers", dispo: 42, reserve: 5, min: 20, emplacement: "A1-03", maj: "24/07 09:12", statut: "Disponible" },
  { ref: "IN-304-T20", des: "Tube inox 304 Ø20 ép2", cat: "Inox", dispo: 8, reserve: 3, min: 15, emplacement: "B2-11", maj: "24/07 07:44", statut: "Stock faible" },
  { ref: "AL-6060-B30", des: "Barre alu 6060 Ø30", cat: "Alu", dispo: 320, reserve: 12, min: 40, emplacement: "C1-05", maj: "23/07 16:20", statut: "Surstock" },
  { ref: "PL-POM-P20", des: "Plaque POM 20mm", cat: "Plastiques", dispo: 0, reserve: 0, min: 10, emplacement: "D3-02", maj: "24/07 08:03", statut: "Rupture" },
  { ref: "HX-450-P08", des: "Tôle Hardox 450 8mm", cat: "Anti-abrasion", dispo: 15, reserve: 4, min: 12, emplacement: "A2-07", maj: "24/07 10:05", statut: "Disponible" },
  { ref: "HX-450-P10", des: "Tôle Hardox 450 10mm", cat: "Anti-abrasion", dispo: 4, reserve: 2, min: 8, emplacement: "A2-08", maj: "24/07 10:05", statut: "Stock faible" },
];

const STATUT_COLORS: Record<string, string> = {
  "Disponible": "bg-success text-success-foreground",
  "Stock faible": "bg-warning text-warning-foreground",
  "Rupture": "bg-destructive text-destructive-foreground",
  "Surstock": "bg-blue-500 text-white",
};

export default function StocksAgent() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Row>(STOCKS[1]);

  const filtered = STOCKS.filter((s) =>
    !q || (s.ref + s.des + s.cat).toLowerCase().includes(q.toLowerCase()),
  );

  const urgents = STOCKS.filter((s) => s.statut === "Rupture" || s.statut === "Stock faible");

  return (
    <>
      <AgentHeader
        icon={Package}
        name="Agent de gestion des stocks"
        mission="Surveille les disponibilités, détecte les ruptures et propose des références alternatives."
        onDemo={() => toast.success("Analyse de stock lancée sur 1 240 références")}
        recu="Mouvements de stock, réservations, ventes et commandes en cours."
        analyse="Consommations, seuils, saisonnalité et compatibilités produits."
        produit="Alertes ciblées, recommandations de réappro et alternatives disponibles."
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher une référence, un produit ou une catégorie..."
          className="pl-10 h-11 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="État du stock" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Réf.</TableHead>
                  <TableHead className="text-[10px]">Désignation</TableHead>
                  <TableHead className="text-[10px] text-right">Dispo</TableHead>
                  <TableHead className="text-[10px] text-right">Rés.</TableHead>
                  <TableHead className="text-[10px] text-right">Min</TableHead>
                  <TableHead className="text-[10px]">Empl.</TableHead>
                  <TableHead className="text-[10px]">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.ref} onClick={() => setSelected(s)} className={`cursor-pointer ${selected.ref === s.ref ? "bg-primary/5" : ""}`}>
                    <TableCell className="text-xs font-mono">{s.ref}</TableCell>
                    <TableCell className="text-xs">
                      <div>{s.des}</div>
                      <div className="text-[10px] text-muted-foreground">{s.cat} · maj {s.maj}</div>
                    </TableCell>
                    <TableCell className="text-xs text-right font-semibold">{s.dispo}</TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">{s.reserve}</TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">{s.min}</TableCell>
                    <TableCell className="text-xs font-mono">{s.emplacement}</TableCell>
                    <TableCell><Badge className={`${STATUT_COLORS[s.statut]} text-[10px]`}>{s.statut}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionBlock>

        <SectionBlock title={`Analyse IA — ${selected.ref}`}>
          <div className="space-y-3 text-sm">
            <Kpi label="Consommation moyenne" value="6 unités / semaine" icon={TrendingDown} />
            <Kpi label="Jours de stock restants" value={selected.dispo === 0 ? "0 j (rupture)" : `${Math.max(1, Math.floor(selected.dispo / 1))} j`} icon={AlertCircle} />
            <div className="rounded-md border bg-destructive/10 p-2.5">
              <div className="text-[10px] uppercase text-destructive font-semibold">Risque de rupture</div>
              <div className="text-xs text-foreground">Élevé — commander 30 unités dès aujourd'hui.</div>
            </div>
            <div className="rounded-md border bg-muted/40 p-2.5">
              <div className="text-[10px] uppercase text-muted-foreground font-semibold">Alternative disponible</div>
              <div className="text-xs font-medium">IN-316-T20 · +6 % prix · 24 pcs</div>
              <div className="text-[11px] text-muted-foreground mt-1">Compatibilité inox alimentaire équivalente, meilleure résistance à la corrosion.</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={() => toast.success("Alerte créée")}><Bell className="h-3.5 w-3.5" /> Alerte</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Stock réservé")}><Lock className="h-3.5 w-3.5" /> Réserver</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Alternatives affichées")}><Repeat className="h-3.5 w-3.5" /> Alt.</Button>
              <Button size="sm" onClick={() => toast.success("Demande de réappro envoyée")}><ShoppingCart className="h-3.5 w-3.5" /> Réappro</Button>
            </div>
          </div>
        </SectionBlock>
      </div>

      <SectionBlock title="Produits nécessitant une action urgente">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {urgents.map((u) => (
            <div key={u.ref} className="rounded-lg border bg-destructive/5 p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono">{u.ref}</span>
                <Badge className={`${STATUT_COLORS[u.statut]} text-[10px]`}>{u.statut}</Badge>
              </div>
              <div className="text-xs text-muted-foreground truncate">{u.des}</div>
              <div className="text-lg font-bold text-destructive mt-1">{u.dispo}<span className="text-xs text-muted-foreground font-normal"> / {u.min} min</span></div>
              <Button size="sm" variant="outline" className="w-full mt-2" onClick={() => toast.success("Réappro déclenché")}>Traiter</Button>
            </div>
          ))}
        </div>
      </SectionBlock>
    </>
  );
}

function Kpi({ label, value, icon: Icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="flex items-center gap-2 rounded-md border p-2.5">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <div className="flex-1">
        <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
        <div className="text-xs font-medium">{value}</div>
      </div>
    </div>
  );
}
