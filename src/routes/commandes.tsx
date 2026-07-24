import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play } from "lucide-react";
import { commandes } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/commandes")({
  head: () => ({
    meta: [
      { title: "Commandes — SERIMA AI" },
      { name: "description", content: "Suivi des commandes et livraisons SERIMA : validation, préparation, découpe, expédition et livraison." },
      { property: "og:title", content: "Commandes — SERIMA AI" },
      { property: "og:description", content: "Suivi des commandes et livraisons SERIMA." },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Commandes"
      description="Suivi complet des commandes et étapes de production"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Ouvrir l'agent suivi</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Étape</TableHead>
                <TableHead>État</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {commandes.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell className="font-medium">{c.client}</TableCell>
                  <TableCell>{c.montant}</TableCell>
                  <TableCell><Badge variant="outline">{c.etape}</Badge></TableCell>
                  <TableCell>
                    {c.retard ? <Badge variant="destructive">En retard</Badge> : <Badge className="bg-success text-success-foreground">À l'heure</Badge>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="suivi" open={open} onOpenChange={setOpen} title="Agent de suivi des commandes et livraisons" />
    </PageShell>
  );
}
