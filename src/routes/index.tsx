import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Inbox,
  FileText,
  ShoppingCart,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { stats, demandesParCategorie, activitesAgents } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tableau de bord — Sérima" },
      { name: "description", content: "Vue d'ensemble des demandes, devis, commandes, stocks et activités des agents IA Sérima." },
      { property: "og:title", content: "Tableau de bord — Sérima" },
      { property: "og:description", content: "KPI et activités des agents IA en temps réel (démo)." },
    ],
  }),
  component: Dashboard,
});

const kpis = [
  { label: "Demandes reçues", sub: "aujourd'hui", value: stats.demandesJour, icon: Inbox, trend: "+12%", tint: "from-primary/20 to-primary/0", accent: "text-primary" },
  { label: "Devis en préparation", sub: "en attente", value: stats.devisPrep, icon: FileText, trend: "+3", tint: "from-chart-2/20 to-chart-2/0", accent: "text-chart-2" },
  { label: "Commandes en cours", sub: "production", value: stats.commandesEnCours, icon: ShoppingCart, trend: "+8", tint: "from-chart-4/20 to-chart-4/0", accent: "text-chart-4" },
  { label: "Bientôt en rupture", sub: "seuil critique", value: stats.produitsRupture, icon: AlertCircle, trend: "!", tint: "from-destructive/20 to-destructive/0", accent: "text-destructive" },
  { label: "Réclamations", sub: "ouvertes", value: stats.reclamationsOuvertes, icon: AlertTriangle, trend: "-1", tint: "from-warning/20 to-warning/0", accent: "text-warning" },
  { label: "Chiffre d'affaires", sub: "mois en cours", value: stats.chiffreAffaires, icon: TrendingUp, trend: "+14%", tint: "from-success/20 to-success/0", accent: "text-success" },
];

function Dashboard() {
  const max = Math.max(...demandesParCategorie.map((d) => d.valeur));
  return (
    <PageShell
      title="Tableau de bord"
      description="Vue synthétique et temps-réel de l'activité Sérima."
      actions={
        <>
          <Button variant="outline" size="sm" asChild className="rounded-full">
            <Link to="/reporting">Voir reporting <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </Button>
          <Button size="sm" asChild className="rounded-full shadow-soft">
            <Link to="/agents"><Sparkles className="h-3.5 w-3.5" /> Explorer les agents</Link>
          </Button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k, i) => (
          <Card
            key={k.label}
            className="card-hover relative overflow-hidden border-border/60 shadow-soft animate-fade-up"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${k.tint} opacity-70`} />
            <CardContent className="relative p-4">
              <div className="flex items-start justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-background/70 backdrop-blur ${k.accent}`}>
                  <k.icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-semibold ${k.accent}`}>{k.trend}</span>
              </div>
              <div className="mt-3 text-2xl font-bold tracking-tight">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-tight">
                {k.label} <span className="text-muted-foreground/60">· {k.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border-border/60 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-sm font-semibold">Demandes par catégorie</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Volume qualifié par les agents IA · 7 derniers jours</p>
              </div>
              <Badge variant="outline" className="text-[10px]">Temps réel</Badge>
            </div>
            <div className="space-y-4">
              {demandesParCategorie.map((d, i) => (
                <div key={d.categorie} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{d.categorie}</span>
                    <span className="text-muted-foreground tabular-nums">{d.valeur}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/70 overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-brand transition-[width] duration-700"
                      style={{ width: `${(d.valeur / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Activité des agents</h2>
              <Link to="/agents" className="text-[11px] text-primary hover:underline inline-flex items-center gap-0.5">
                Tout voir <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ol className="space-y-3.5">
              {activitesAgents.map((a, i) => (
                <li key={i} className="relative pl-4 group">
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary ring-4 ring-primary/10" />
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                      {a.agent}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground ml-auto">{a.time}</span>
                  </div>
                  <p className="text-xs text-foreground/90 mt-1 leading-relaxed">{a.action}</p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
