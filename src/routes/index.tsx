import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Inbox,
  FileText,
  ShoppingCart,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { stats, demandesParCategorie, activitesAgents } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — SERIMA AI" },
      { name: "description", content: "Vue d'ensemble des demandes, devis, commandes, stocks et activités des agents IA SERIMA." },
      { property: "og:title", content: "Tableau de bord — SERIMA AI" },
      { property: "og:description", content: "KPI et activités des agents IA en temps réel (démo)." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Demandes reçues aujourd'hui", value: stats.demandesJour, icon: Inbox, color: "text-brand-light" },
  { label: "Devis en préparation", value: stats.devisPrep, icon: FileText, color: "text-primary" },
  { label: "Commandes en cours", value: stats.commandesEnCours, icon: ShoppingCart, color: "text-primary" },
  { label: "Bientôt en rupture", value: stats.produitsRupture, icon: AlertCircle, color: "text-destructive" },
  { label: "Réclamations ouvertes", value: stats.reclamationsOuvertes, icon: AlertTriangle, color: "text-warning" },
  { label: "Chiffre d'affaires", value: stats.chiffreAffaires, icon: TrendingUp, color: "text-success" },
];

function Dashboard() {
  const max = Math.max(...demandesParCategorie.map((d) => d.valeur));
  return (
    <PageShell
      title="Tableau de bord"
      description="Vue synthétique de l'activité SERIMA AI"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <Card key={k.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <k.icon className={`h-4 w-4 ${k.color}`} />
              </div>
              <div className="mt-2 text-2xl font-bold">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{k.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Demandes par catégorie</h2>
              <span className="text-xs text-muted-foreground">7 derniers jours</span>
            </div>
            <div className="space-y-3">
              {demandesParCategorie.map((d) => (
                <div key={d.categorie}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{d.categorie}</span>
                    <span className="text-muted-foreground">{d.valeur}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-brand-light rounded-full"
                      style={{ width: `${(d.valeur / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold mb-4">Dernières activités des agents IA</h2>
            <ol className="space-y-3">
              {activitesAgents.map((a, i) => (
                <li key={i} className="text-sm border-l-2 border-primary/50 pl-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px]">{a.agent}</Badge>
                    <span className="text-[10px] text-muted-foreground ml-auto">{a.time}</span>
                  </div>
                  <p className="text-xs text-foreground mt-1">{a.action}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
