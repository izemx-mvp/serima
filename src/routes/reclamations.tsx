import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play } from "lucide-react";
import { reclamations } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";

export const Route = createFileRoute("/reclamations")({
  head: () => ({
    meta: [
      { title: "Réclamations & SAV — SERIMA AI" },
      { name: "description", content: "Tickets clients, urgence, solutions proposées et suivi par l'agent SAV SERIMA." },
      { property: "og:title", content: "Réclamations & SAV — SERIMA AI" },
      { property: "og:description", content: "Tickets et suivi SAV SERIMA." },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Réclamations & SAV"
      description="Tickets clients, urgence et suivi"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Créer un ticket (IA)</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Urgence</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reclamations.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.client}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        r.urgence === "Haute" ? "bg-destructive text-destructive-foreground" :
                        r.urgence === "Moyenne" ? "bg-warning text-warning-foreground" : ""
                      }
                      variant={r.urgence === "Basse" ? "outline" : "default"}
                    >
                      {r.urgence}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={r.statut === "Résolu" ? "bg-success text-success-foreground" : ""}>
                      {r.statut}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="sav" open={open} onOpenChange={setOpen} title="Agent réclamations & SAV" />
    </PageShell>
  );
}
