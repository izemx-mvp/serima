import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play } from "lucide-react";
import { documents } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents & Qualité — SERIMA AI" },
      { name: "description", content: "Fiches techniques, certificats matière et bons de livraison classés par client et commande, avec détection des non-conformités." },
      { property: "og:title", content: "Documents & Qualité — SERIMA AI" },
      { property: "og:description", content: "Documents techniques et qualité SERIMA." },
    ],
  }),
  component: Page,
});

const statutColor: Record<string, string> = {
  OK: "bg-success text-success-foreground",
  Manquant: "bg-destructive text-destructive-foreground",
  "Non conforme": "bg-warning text-warning-foreground",
};

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Documents & Qualité"
      description="Fiches techniques, certificats et non-conformités"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Ouvrir l'agent documentaire</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Commande</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((d) => (
                <TableRow key={d.nom}>
                  <TableCell className="font-medium">{d.nom}</TableCell>
                  <TableCell><Badge variant="outline">{d.type}</Badge></TableCell>
                  <TableCell>{d.client}</TableCell>
                  <TableCell className="font-mono text-xs">{d.commande}</TableCell>
                  <TableCell><Badge className={statutColor[d.statut]}>{d.statut}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="doc" open={open} onOpenChange={setOpen} title="Agent documentaire & qualité" />
    </PageShell>
  );
}
