import { BarChart3, Sparkles, FileDown, Send, Eye, UserCheck, FileBarChart, AlertTriangle, ArrowUp, ArrowDown, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line as RLine, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

const CA_MOIS = [
  { m: "Fév", v: 820 }, { m: "Mar", v: 940 }, { m: "Avr", v: 890 }, { m: "Mai", v: 1120 }, { m: "Juin", v: 1180 }, { m: "Juil", v: 1284 },
];
const VENTES_FAMILLE = [
  { f: "Aciers", v: 420 }, { f: "Inox", v: 310 }, { f: "Alu", v: 190 }, { f: "Plastiques", v: 140 }, { f: "Anti-abrasion", v: 224 },
];
const DEVIS_STATUT = [
  { name: "Brouillon", value: 14, c: "#94a3b8" },
  { name: "Envoyés", value: 42, c: "hsl(var(--primary))" },
  { name: "Acceptés", value: 38, c: "hsl(var(--success))" },
  { name: "Refusés", value: 8, c: "hsl(var(--destructive))" },
];
const CMD_ETAPES = [
  { e: "Validées", n: 12 }, { e: "Préparation", n: 9 }, { e: "Découpe", n: 7 }, { e: "Expédition", n: 6 }, { e: "Livrées", n: 4 },
];
const RECLAMATIONS_CAT = [
  { c: "Non conforme", n: 3 }, { c: "Quantité", n: 2 }, { c: "Transport", n: 1 }, { c: "Retard", n: 4 }, { c: "Document", n: 2 },
];

const PRIORITES = [
  { titre: "Relancer les 3 devis > 10k€", detail: "MetalCorp, Industrie Rhône, InoxTech", urg: "Haute" },
  { titre: "Réapprovisionner Inox 304 et POM", detail: "Rupture prévue sous 5 jours", urg: "Haute" },
  { titre: "Notifier retard CMD-2026-018", detail: "Client Industrie Rhône", urg: "Moyenne" },
  { titre: "Qualifier Fabrik Industries", detail: "Réponse positive au premier contact", urg: "Moyenne" },
  { titre: "Traiter réclamation POM non conforme", detail: "REC-2026-014", urg: "Haute" },
];

export default function ReportingAgent() {
  return (
    <>
      <AgentHeader
        icon={BarChart3}
        name="Agent reporting et pilotage"
        mission="Analyse les performances de l'entreprise et présente les priorités nécessitant une décision."
        onDemo={() => toast.success("Nouveau rapport hebdomadaire généré")}
        recu="Données commerciales, opérationnelles, stocks, qualité et satisfaction client."
        analyse="Tendances, écarts vs objectifs, corrélations et signaux faibles."
        produit="Synthèse exécutive, indicateurs clés et priorités classées."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <Kpi label="Chiffre d'affaires" value="1 284 500 €" trend="+8.2 %" up />
        <Kpi label="Devis envoyés" value="128" trend="+12" up />
        <Kpi label="Conversion" value="34 %" trend="+3 pts" up />
        <Kpi label="Commandes en cours" value="38" trend="+5" up />
        <Kpi label="Marge moyenne" value="21.4 %" trend="-0.4 pt" />
        <Kpi label="Produits en rupture" value="6" trend="+2" danger />
        <Kpi label="Réclamations ouvertes" value="4" trend="=" />
        <Kpi label="Retards de livraison" value="5" trend="+1" danger />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="Chiffre d'affaires par mois (k€)">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={CA_MOIS}>
              <XAxis dataKey="m" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <RLine type="monotone" dataKey="v" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionBlock>

        <SectionBlock title="Ventes par famille (k€)">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={VENTES_FAMILLE}>
              <XAxis dataKey="f" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="v" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionBlock>

        <SectionBlock title="Devis par statut">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={DEVIS_STATUT} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70}>
                {DEVIS_STATUT.map((d) => <Cell key={d.name} fill={d.c} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 text-[10px]">
            {DEVIS_STATUT.map((d) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm" style={{ background: d.c }} />
                {d.name} · {d.value}
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Commandes par étape">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={CMD_ETAPES} layout="vertical">
              <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="e" fontSize={10} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="n" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionBlock>

        <SectionBlock title="Réclamations par catégorie">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={RECLAMATIONS_CAT}>
              <XAxis dataKey="c" fontSize={9} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Bar dataKey="n" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </SectionBlock>

        <SectionBlock title="Performance commerciale (7j)">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={[
              { j: "L", v: 12 }, { j: "Ma", v: 18 }, { j: "Me", v: 15 }, { j: "J", v: 22 }, { j: "V", v: 19 }, { j: "S", v: 8 }, { j: "D", v: 4 },
            ]}>
              <XAxis dataKey="j" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <RLine type="monotone" dataKey="v" stroke="hsl(var(--success))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </SectionBlock>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <SectionBlock title="Synthèse générée par l'agent IA" className="lg:col-span-2">
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-1.5 text-primary font-semibold text-sm">
              <Sparkles className="h-4 w-4" /> Analyse de la semaine
            </div>
            <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
              Les demandes concernant les tubes sans soudure ont augmenté de <strong>18 %</strong> sur les 7 derniers jours.
              <strong> Douze devis</strong> nécessitent une relance dont trois supérieurs à 10 000 €.
              <strong> Quatre références</strong> risquent une rupture dans les quinze prochains jours (Inox 304, POM 20mm, Hardox 450 10mm, Alu 6082).
              <strong> Deux commandes</strong> présentent un risque de retard (CMD-2026-018 et CMD-2026-020).
              La marge moyenne recule légèrement (-0.4 pt) mais reste au-dessus de l'objectif.
            </p>
            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-primary/20">
              <Button size="sm" onClick={() => toast.success("Rapport généré")}><FileBarChart className="h-3.5 w-3.5" /> Générer un rapport</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Export PDF prêt")}><FileDown className="h-3.5 w-3.5" /> PDF</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Rapport envoyé à la direction")}><Send className="h-3.5 w-3.5" /> Envoyer à la direction</Button>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Priorités recommandées cette semaine">
          <ol className="space-y-2">
            {PRIORITES.map((p, i) => (
              <li key={i} className="flex items-start gap-2 rounded-md border p-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    {p.titre}
                    {p.urg === "Haute" && <AlertTriangle className="h-3 w-3 text-destructive" />}
                  </div>
                  <div className="text-[11px] text-muted-foreground">{p.detail}</div>
                </div>
                <div className="flex flex-col gap-1">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => toast.success("Détails ouverts")}><Eye className="h-3 w-3" /></Button>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => toast.success("Action affectée")}><UserCheck className="h-3 w-3" /></Button>
                </div>
              </li>
            ))}
          </ol>
        </SectionBlock>
      </div>
    </>
  );
}

function Kpi({ label, value, trend, up, danger }: { label: string; value: string; trend: string; up?: boolean; danger?: boolean }) {
  const Icon = up ? ArrowUp : danger ? ArrowDown : TrendingDown;
  const color = up ? "text-success" : danger ? "text-destructive" : "text-muted-foreground";
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="text-[10px] uppercase text-muted-foreground truncate">{label}</div>
      <div className="text-lg font-bold mt-0.5">{value}</div>
      <div className={`text-[11px] flex items-center gap-0.5 ${color}`}>
        <Icon className="h-3 w-3" /> {trend}
      </div>
    </div>
  );
}
