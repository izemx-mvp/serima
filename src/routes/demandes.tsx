import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Play } from "lucide-react";
import { demandes } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/demandes")({
  head: () => ({
    meta: [
      { title: "Demandes clients — SERIMA AI" },
      { name: "description", content: "Suivi et analyse des demandes clients multicanal (email, WhatsApp, site web, téléphone) traitées par l'IA SERIMA." },
      { property: "og:title", content: "Demandes clients — SERIMA AI" },
      { property: "og:description", content: "Suivi des demandes clients multicanal." },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Demandes clients"
      description="Toutes les demandes reçues, tous canaux confondus"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Lancer l'agent technico</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demandes.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs">{d.id}</TableCell>
                  <TableCell className="font-medium">{d.client}</TableCell>
                  <TableCell><Badge variant="outline">{d.canal}</Badge></TableCell>
                  <TableCell className="text-sm">{d.produit}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        d.statut === "Traité" ? "bg-success text-success-foreground" :
                        d.statut === "Nouveau" ? "bg-brand-light text-primary" : ""
                      }
                    >
                      {d.statut}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="technico" open={open} onOpenChange={setOpen} title="Agent technico-commercial" />
    </PageShell>
  );
}
