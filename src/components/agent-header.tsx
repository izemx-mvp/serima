import type { ReactNode, ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Play, Inbox, Cpu, Rocket, ShieldCheck } from "lucide-react";

export function AgentHeader({
  icon: Icon,
  name,
  mission,
  onDemo,
  recu,
  analyse,
  produit,
}: {
  icon: ComponentType<{ className?: string }>;
  name: string;
  mission: string;
  onDemo: () => void;
  recu: string;
  analyse: string;
  produit: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          to="/agents"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Retour aux agents
        </Link>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Données fictives — démonstration MVP
        </span>
      </div>

      <div className="rounded-xl border bg-gradient-to-br from-primary/10 via-card to-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow">
              <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold tracking-tight text-foreground">{name}</h1>
              <p className="text-sm text-muted-foreground max-w-2xl">{mission}</p>
              <Badge className="bg-success text-success-foreground gap-1">
                <ShieldCheck className="h-3 w-3" /> Agent IA opérationnel
              </Badge>
            </div>
          </div>
          <Button onClick={onDemo} className="gap-2 shadow">
            <Play className="h-4 w-4" /> Lancer une démonstration
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <EduCard icon={Inbox} title="Ce que l'agent reçoit" text={recu} tone="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900" />
        <EduCard icon={Cpu} title="Ce que l'agent analyse" text={analyse} tone="bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800" />
        <EduCard icon={Rocket} title="Ce que l'agent produit" text={produit} tone="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" />
      </div>
    </div>
  );
}

function EduCard({
  icon: Icon,
  title,
  text,
  tone,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
  tone: string;
}) {
  return (
    <Card className={`border ${tone}`}>
      <CardContent className="p-4 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/80">
          <Icon className="h-3.5 w-3.5" /> {title}
        </div>
        <p className="text-sm text-foreground/90 leading-snug">{text}</p>
      </CardContent>
    </Card>
  );
}

export function SectionBlock({
  title,
  actions,
  children,
  className,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {actions}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
