import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { agents } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents IA — SERIMA AI" },
      { name: "description", content: "10 agents IA spécialisés pour la distribution industrielle SERIMA : technico-commercial, devis, stocks, achats, service client, documentaire, prospection, suivi, SAV, reporting." },
      { property: "og:title", content: "Agents IA — SERIMA AI" },
      { property: "og:description", content: "10 agents IA spécialisés pour la distribution industrielle." },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = agents.find((a) => a.id === openId) ?? null;

  return (
    <PageShell title="Agents IA" description="10 agents spécialisés pour votre activité de distribution industrielle">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((a) => (
          <Card key={a.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground leading-tight">{a.nom}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{a.fonction}</p>
                </div>
                <Badge className="bg-success text-success-foreground shrink-0">{a.statut}</Badge>
              </div>
              <div className="flex gap-2 pt-1">
                <Button size="sm" onClick={() => setOpenId(a.id)}>Ouvrir l'agent</Button>
                <Button size="sm" variant="outline" onClick={() => setOpenId(a.id)}>
                  <Play className="h-3.5 w-3.5" /> Démo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AgentModal
        agentId={openId}
        open={!!openId}
        onOpenChange={(o) => !o && setOpenId(null)}
        title={active?.nom ?? ""}
      />
    </PageShell>
  );
}
