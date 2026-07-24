import type * as React from "react";
import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { agents } from "@/lib/mock-data";
import TechnicoAgent from "@/components/agents/technico";
import DevisAgent from "@/components/agents/devis";
import StocksAgent from "@/components/agents/stocks";
import AchatsAgent from "@/components/agents/achats";
import ServiceClientAgent from "@/components/agents/sc";
import DocAgent from "@/components/agents/doc";
import ProspectionAgent from "@/components/agents/prospection";
import SuiviAgent from "@/components/agents/suivi";
import SavAgent from "@/components/agents/sav";
import ReportingAgent from "@/components/agents/reporting";
import { Button } from "@/components/ui/button";

const REGISTRY: Record<string, React.ComponentType> = {
  technico: TechnicoAgent,
  devis: DevisAgent,
  stocks: StocksAgent,
  achats: AchatsAgent,
  sc: ServiceClientAgent,
  doc: DocAgent,
  prospection: ProspectionAgent,
  suivi: SuiviAgent,
  sav: SavAgent,
  reporting: ReportingAgent,
};

export const Route = createFileRoute("/agents/$id")({
  loader: ({ params }) => {
    const agent = agents.find((a) => a.id === params.id);
    if (!agent || !REGISTRY[params.id]) throw notFound();
    return { agent };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.agent?.nom ?? "Agent IA";
    return {
      meta: [
        { title: `${name} — SERIMA AI` },
        { name: "description", content: loaderData?.agent?.fonction ?? "Agent IA SERIMA" },
        { property: "og:title", content: `${name} — SERIMA AI` },
        { property: "og:description", content: loaderData?.agent?.fonction ?? "Agent IA SERIMA" },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-sm text-muted-foreground">Erreur : {error.message}</p>
        <Button onClick={() => { router.invalidate(); reset(); }}>Réessayer</Button>
      </div>
    );
  },
  component: AgentDetail,
});

function AgentDetail() {
  const { id } = Route.useParams();
  const Component = REGISTRY[id];
  return (
    <div className="p-6 space-y-6 max-w-[1500px] mx-auto">
      <Component />
    </div>
  );
}

function NotFound() {
  return (
    <div className="p-8 text-center">
      <p className="text-sm text-muted-foreground">Agent introuvable.</p>
    </div>
  );
}
