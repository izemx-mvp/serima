import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play } from "lucide-react";
import { stocks } from "@/lib/mock-data";
import { AgentModal } from "@/components/agent-modal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/stocks")({
  head: () => ({
    meta: [
      { title: "Stocks — SERIMA AI" },
      { name: "description", content: "Gestion des stocks industriels SERIMA : disponibilité, emplacements, seuils et alternatives proposées par l'IA." },
      { property: "og:title", content: "Stocks — SERIMA AI" },
      { property: "og:description", content: "Disponibilités et alertes stock SERIMA." },
    ],
  }),
  component: Page,
});

function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageShell
      title="Stocks"
      description="Disponibilité, emplacements et alertes de rupture"
      actions={<Button onClick={() => setOpen(true)} className="gap-2"><Play className="h-4 w-4" /> Ouvrir l'agent stocks</Button>}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Désignation</TableHead>
                <TableHead>Qté</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>Alternative</TableHead>
                <TableHead>État</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((s) => {
                const rupture = s.qte < s.seuil;
                return (
                  <TableRow key={s.ref}>
                    <TableCell className="font-mono text-xs">{s.ref}</TableCell>
                    <TableCell className="text-sm">{s.designation}</TableCell>
                    <TableCell className={cn("font-bold", rupture && "text-destructive")}>{s.qte}</TableCell>
                    <TableCell className="font-mono text-xs">{s.emplacement}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{s.alt}</TableCell>
                    <TableCell>
                      {rupture ? <Badge variant="destructive">Rupture</Badge> : <Badge className="bg-success text-success-foreground">OK</Badge>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <AgentModal agentId="stocks" open={open} onOpenChange={setOpen} title="Agent de gestion des stocks" />
    </PageShell>
  );
}
