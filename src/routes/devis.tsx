import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play } from "lucide-react";
import { devis } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/devis")({
  head: () => ({
    meta: [
      { title: "Devis — SERIMA AI" },
      { name: "description", content: "Gestion et suivi des devis clients générés et relancés par l'agent IA SERIMA." },
      { property: "og:title", content: "Devis — SERIMA AI" },
      { property: "og:description", content: "Génération et suivi des devis SERIMA." },
    ],
  }),
  component: Page,
});

const color: Record<string, string> = {
  Brouillon: "bg-muted text-foreground",
  Envoyé: "bg-brand-light text-primary",
  Accepté: "bg-success text-success-foreground",
  "En relance": "bg-warning text-warning-foreground",
  Refusé: "bg-destructive text-destructive-foreground",
};

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Devis"
      description="Brouillons générés par l'IA, envois et relances"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Générer un devis (IA)</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devis.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs">{d.id}</TableCell>
                  <TableCell className="font-medium">{d.client}</TableCell>
                  <TableCell>{d.montant}</TableCell>
                  <TableCell><Badge className={color[d.statut]}>{d.statut}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="devis" open={open} onOpenChange={setOpen} title="Agent de traitement des devis" />
    </PageShell>
  );
}
