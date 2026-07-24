import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot, FileText, Package, ShoppingBag, MessageSquare,
  FileCheck, Users, Truck, AlertTriangle, BarChart3, ArrowRight,
} from "lucide-react";
import { agents } from "@/lib/mock-data";

const ICONS: Record<string, any> = {
  technico: Bot, devis: FileText, stocks: Package, achats: ShoppingBag,
  sc: MessageSquare, doc: FileCheck, prospection: Users, suivi: Truck,
  sav: AlertTriangle, reporting: BarChart3,
};

export const Route = createFileRoute("/agents/")({
  head: () => ({
    meta: [
      { title: "Agents IA — SERIMA AI" },
      { name: "description", content: "10 agents IA spécialisés pour la distribution industrielle SERIMA." },
      { property: "og:title", content: "Agents IA — SERIMA AI" },
      { property: "og:description", content: "10 agents IA spécialisés pour la distribution industrielle." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  return (
    <PageShell title="Agents IA" description="10 agents spécialisés pour votre activité de distribution industrielle. Chaque agent dispose d'une interface métier dédiée.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((a) => {
          const Icon = ICONS[a.id] ?? Bot;
          return (
            <Card key={a.id} className="hover:shadow-md transition-shadow group">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground leading-tight">{a.nom}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{a.fonction}</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground shrink-0 text-[10px]">{a.statut}</Badge>
                </div>
                <Button asChild size="sm" className="w-full group-hover:bg-primary/90">
                  <Link to="/agents/$id" params={{ id: a.id }}>
                    Ouvrir l'agent <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
