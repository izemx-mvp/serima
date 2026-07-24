import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Play } from "lucide-react";
import { reporting } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/reporting")({
  head: () => ({
    meta: [
      { title: "Reporting & Pilotage — SERIMA AI" },
      { name: "description", content: "KPI commerciaux, top produits, retards et synthèse IA des priorités hebdomadaires SERIMA." },
      { property: "og:title", content: "Reporting & Pilotage — SERIMA AI" },
      { property: "og:description", content: "KPI et synthèse IA des priorités SERIMA." },
    ],
  }),
  component: Page,
});

const kpis = [
  { label: "Devis envoyés", value: reporting.devisEnvoyes },
  { label: "Taux de conversion", value: reporting.tauxConversion },
  { label: "Chiffre d'affaires", value: reporting.chiffreAffaires },
  { label: "Commandes en retard", value: reporting.commandesRetard },
  { label: "Ruptures de stock", value: reporting.ruptures },
  { label: "Réclamations ouvertes", value: reporting.reclamations },
];

function Page() {
  const [open, setOpen] = useState(false);
  const max = reporting.topProduits[0].qte;

  return (
    <PageShell
      title="Reporting & Pilotage"
      description="Indicateurs clés et synthèse IA"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Générer la synthèse IA</Button>}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
              <div className="mt-1 text-2xl font-bold">{k.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold mb-4">Produits les plus demandés</h2>
            <div className="space-y-3">
              {reporting.topProduits.map((p) => (
                <div key={p.nom}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{p.nom}</span>
                    <span className="text-muted-foreground">{p.qte}</span>
                  </div>
                  <Progress value={(p.qte / max) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/30">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Synthèse IA — Priorités de la semaine
            </div>
            <p className="text-sm text-foreground leading-relaxed">{reporting.resume}</p>
          </CardContent>
        </Card>
      </div>

      <AgentModal agentId="reporting" open={open} onOpenChange={setOpen} title="Agent reporting & pilotage" />
    </PageShell>
  );
}
