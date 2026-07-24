import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Search, Save, Upload, Plus, FileDown, Database, Mail, MessageCircle,
  Globe, Truck, ShoppingCart, FileText, Users, ShieldCheck, Trash2,
  Edit, Eye, RefreshCw, Power, HelpCircle, CheckCircle2, AlertCircle,
  Sparkles, History, Building2,
} from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AGENTS, HISTORIQUE, type AgentConfig } from "@/lib/agents-config";

export const Route = createFileRoute("/configuration")({
  head: () => ({
    meta: [
      { title: "Configuration des agents — SERIMA AI" },
      { name: "description", content: "Configurez chaque agent IA et gérez leur base de connaissances depuis une interface centralisée." },
      { property: "og:title", content: "Configuration des agents — SERIMA AI" },
      { property: "og:description", content: "Console d'administration des agents IA SERIMA." },
    ],
  }),
  component: ConfigurationPage,
});

const SOURCE_ICONS: Record<string, any> = {
  ERP: Database, CRM: Users, "E-mails": Mail, WhatsApp: MessageCircle,
  "Site web": Globe, "Documents internes": FileText, "Fichiers Excel": FileDown,
  "Historique des commandes": ShoppingCart, "Base fournisseurs": Building2,
  "Catalogue SERIMA": FileText,
};

const STATUS_TONE: Record<string, string> = {
  Disponible: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300",
  "En traitement": "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300",
  "À vérifier": "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300",
  Obsolète: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300",
  Erreur: "bg-red-100 text-red-800 border-red-200 dark:bg-red-950/40 dark:text-red-300",
  Connecté: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Non connecté": "bg-slate-100 text-slate-700 border-slate-200",
  "Synchronisation nécessaire": "bg-amber-100 text-amber-800 border-amber-200",
};

function InfoTip({ text }: { text: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent><p className="max-w-xs text-xs">{text}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ConfigurationPage() {
  const [selectedId, setSelectedId] = useState(AGENTS[0].id);
  const [search, setSearch] = useState("");
  const [attribOpen, setAttribOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [testAnswer, setTestAnswer] = useState<AgentConfig["reponseTest"] | null>(null);
  const [testQuestion, setTestQuestion] = useState("");

  const agent = useMemo(() => AGENTS.find(a => a.id === selectedId)!, [selectedId]);
  const filtered = AGENTS.filter(a => a.nom.toLowerCase().includes(search.toLowerCase()));

  const runTest = () => {
    setTestAnswer(agent.reponseTest);
    toast.success("Réponse simulée générée");
  };

  return (
    <PageShell
      title="Configuration des agents"
      description="Console centralisée pour configurer les 10 agents IA et administrer leur base de connaissances."
      actions={
        <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
          Configuration MVP – données fictives
        </Badge>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* --- Left column : agents list --- */}
        <Card className="xl:col-span-3">
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold">Agents IA</h3>
              <p className="text-[11px] text-muted-foreground">Sélectionnez un agent pour éditer sa configuration.</p>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un agent"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-7 h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {filtered.map(a => {
                const Icon = a.icon;
                const active = a.id === selectedId;
                return (
                  <button
                    key={a.id}
                    onClick={() => { setSelectedId(a.id); setTestAnswer(null); }}
                    className={`w-full text-left rounded-md border p-2.5 transition-colors ${active ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${active ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium leading-tight truncate">{a.nom}</div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`inline-flex h-1.5 w-1.5 rounded-full ${a.statut === "Actif" ? "bg-emerald-500" : "bg-slate-400"}`} />
                          <span className="text-[10px] text-muted-foreground">{a.statut} · {a.sourcesCount} sources</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">MAJ {a.maj}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">Aucun agent trouvé.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* --- Center : configuration tabs --- */}
        <Card className="xl:col-span-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 pb-3 mb-3 border-b">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <agent.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-sm font-semibold truncate">{agent.nom}</h2>
                <p className="text-[11px] text-muted-foreground truncate">{agent.description}</p>
              </div>
              <Badge className="bg-success text-success-foreground gap-1 shrink-0">
                <ShieldCheck className="h-3 w-3" /> Opérationnel
              </Badge>
            </div>

            <Tabs defaultValue="infos" className="w-full">
              <TabsList className="grid grid-cols-5 h-9">
                <TabsTrigger value="infos" className="text-[11px]">Général</TabsTrigger>
                <TabsTrigger value="instructions" className="text-[11px]">Instructions</TabsTrigger>
                <TabsTrigger value="kb" className="text-[11px]">Connaissances</TabsTrigger>
                <TabsTrigger value="sources" className="text-[11px]">Sources</TabsTrigger>
                <TabsTrigger value="test" className="text-[11px]">Test</TabsTrigger>
              </TabsList>

              {/* --- Infos --- */}
              <TabsContent value="infos" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs flex items-center gap-1.5">Nom de l'agent <InfoTip text="Nom affiché dans la plateforme." /></Label>
                    <Input defaultValue={agent.nom} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Service responsable</Label>
                    <Input defaultValue={agent.service} className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs">Description</Label>
                    <Textarea defaultValue={agent.description} rows={2} className="text-xs" />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs">Mission principale</Label>
                    <Textarea defaultValue={agent.mission} rows={2} className="text-xs" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Langue principale</Label>
                    <Select defaultValue={agent.langue}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Français">Français</SelectItem>
                        <SelectItem value="Anglais">Anglais</SelectItem>
                        <SelectItem value="Espagnol">Espagnol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Ton de communication</Label>
                    <Select defaultValue={agent.ton}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[agent.ton, "Formel", "Direct", "Empathique", "Technique"].filter((v, i, a) => a.indexOf(v) === i).map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between rounded-md border p-2.5 md:col-span-2">
                    <div>
                      <div className="text-xs font-medium">Statut de l'agent</div>
                      <div className="text-[11px] text-muted-foreground">Activer ou désactiver l'agent sur toute la plateforme.</div>
                    </div>
                    <Switch defaultChecked={agent.statut === "Actif"} />
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-xs flex items-center gap-1.5">Niveau d'autonomie <InfoTip text="Détermine ce que l'agent peut faire sans validation humaine." /></Label>
                    <Select defaultValue={agent.autonomie}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Suggestions uniquement">Suggestions uniquement</SelectItem>
                        <SelectItem value="Validation humaine obligatoire">Validation humaine obligatoire</SelectItem>
                        <SelectItem value="Actions automatiques limitées">Actions automatiques limitées</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold flex items-center gap-1.5">
                      Actions autorisées <InfoTip text="Actions que l'agent est autorisé à réaliser dans son périmètre." />
                    </div>
                    <span className="text-[10px] text-muted-foreground">Adaptées à l'agent sélectionné</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {agent.actions.map((a, i) => (
                      <label key={i} className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted/40 cursor-pointer">
                        <Checkbox defaultChecked={a.enabled} />
                        <span className="text-xs">{a.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* --- Instructions --- */}
              <TabsContent value="instructions" className="space-y-4 mt-4">
                <div className="rounded-md border bg-primary/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-primary">Mission de l'agent</div>
                  <p className="text-xs mt-1">{agent.mission}</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs flex items-center gap-1.5">
                    Instructions principales <InfoTip text="Consignes détaillées que l'agent doit suivre à chaque exécution." />
                  </Label>
                  <Textarea defaultValue={agent.instructions} rows={6} className="text-xs" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-md border p-3">
                    <div className="text-xs font-semibold mb-2">Informations obligatoires</div>
                    <ul className="space-y-1.5">
                      {agent.obligatoires.map((o, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="text-xs font-semibold mb-2">Restrictions</div>
                    <ul className="space-y-1.5">
                      {agent.restrictions.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => toast.info("Instructions restaurées par défaut")}>
                    <RefreshCw className="h-3.5 w-3.5" /> Restaurer
                  </Button>
                  <Button size="sm" onClick={() => toast.success("Instructions enregistrées")}>
                    <Save className="h-3.5 w-3.5" /> Enregistrer les instructions
                  </Button>
                </div>
              </TabsContent>

              {/* --- Knowledge base --- */}
              <TabsContent value="kb" className="space-y-4 mt-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <div className="text-xs font-semibold">Base de connaissances de : <span className="text-primary">{agent.nom}</span></div>
                    <div className="text-[11px] text-muted-foreground">Gérer les documents et sources utilisés par cet agent.</div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm"><Plus className="h-3.5 w-3.5" /> Ajouter un document</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Ajouter un document</DialogTitle>
                          <DialogDescription>Sélectionnez un fichier à ajouter à la base de connaissances.</DialogDescription>
                        </DialogHeader>
                        <div className="rounded-md border-2 border-dashed p-8 text-center space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <div className="text-sm font-medium">Glissez-déposez un fichier</div>
                          <div className="text-xs text-muted-foreground">PDF, Word, Excel ou image</div>
                          <Button variant="outline" size="sm" className="mt-2">Parcourir…</Button>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setUploadOpen(false)}>Annuler</Button>
                          <Button onClick={() => { setUploadOpen(false); toast.success("Document ajouté à la base"); }}>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Source ajoutée")}><Database className="h-3.5 w-3.5" /> Ajouter une source</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Connaissance créée manuellement")}><Edit className="h-3.5 w-3.5" /> Créer manuellement</Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <StatCard label="Documents disponibles" value={agent.docsCount} tone="text-emerald-600" />
                  <StatCard label="Sources actives" value={agent.sourcesCount} tone="text-blue-600" />
                  <StatCard label="Éléments à vérifier" value={agent.connaissances.filter(k => k.statut === "À vérifier" || k.statut === "En traitement").length} tone="text-amber-600" />
                  <StatCard label="Dernière synchro." value={agent.maj} tone="text-primary" small />
                </div>

                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-[10px]">Source</TableHead>
                        <TableHead className="text-[10px]">Type</TableHead>
                        <TableHead className="text-[10px]">Catégorie</TableHead>
                        <TableHead className="text-[10px]">Partage</TableHead>
                        <TableHead className="text-[10px]">Ajout</TableHead>
                        <TableHead className="text-[10px]">MAJ</TableHead>
                        <TableHead className="text-[10px]">Statut</TableHead>
                        <TableHead className="text-[10px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {agent.connaissances.map((k, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-xs font-medium">{k.nom}</TableCell>
                          <TableCell className="text-xs">{k.type}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{k.categorie}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[9px]">{k.partage}</Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">{k.date}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{k.maj}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[9px] ${STATUS_TONE[k.statut] ?? ""}`}>{k.statut}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="inline-flex gap-0.5">
                              <IconAct icon={Eye} label="Consulter" />
                              <IconAct icon={Edit} label="Modifier" />
                              <IconAct icon={RefreshCw} label="Remplacer" />
                              <IconAct icon={Power} label="Désactiver" />
                              <IconAct icon={Trash2} label="Supprimer" tone="text-red-600" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <Dialog open={attribOpen} onOpenChange={setAttribOpen}>
                  <div className="flex items-center justify-between rounded-md border p-3 bg-muted/30">
                    <div>
                      <div className="text-xs font-semibold">Attribution des connaissances</div>
                      <div className="text-[11px] text-muted-foreground">Partagez une source avec un ou plusieurs agents.</div>
                    </div>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline"><Users className="h-3.5 w-3.5" /> Attribuer à des agents</Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Attribuer la source aux agents</DialogTitle>
                      <DialogDescription>Sélectionnez les agents qui peuvent consulter cette source.</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
                      {AGENTS.map(a => (
                        <label key={a.id} className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted/40 cursor-pointer">
                          <Checkbox defaultChecked={a.id === agent.id} />
                          <a.icon className="h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-xs">{a.nom}</span>
                        </label>
                      ))}
                    </div>
                    <div className="rounded-md border bg-muted/30 p-2.5 text-[11px] space-y-1">
                      <div><span className="font-medium">Privée</span> : accessible à un seul agent.</div>
                      <div><span className="font-medium">Partagée</span> : accessible à plusieurs agents.</div>
                      <div><span className="font-medium">Générale</span> : accessible à tous les agents.</div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAttribOpen(false)}>Annuler</Button>
                      <Button onClick={() => { setAttribOpen(false); toast.success("Attribution mise à jour"); }}>Valider l'attribution</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              {/* --- Sources & accès --- */}
              <TabsContent value="sources" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {agent.sources.map((s, i) => {
                    const Icon = SOURCE_ICONS[s.nom] ?? Database;
                    const active = s.statut === "Connecté";
                    return (
                      <div key={i} className="rounded-md border p-3 flex items-start gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300" : "bg-muted text-muted-foreground"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-xs font-medium truncate">{s.nom}</div>
                            <Badge variant="outline" className={`text-[9px] shrink-0 ${STATUS_TONE[s.statut] ?? ""}`}>{s.statut}</Badge>
                          </div>
                          <div className="text-[11px] text-muted-foreground">{s.description}</div>
                          <div className="flex items-center justify-between mt-2">
                            <Switch defaultChecked={active} />
                            <Button size="sm" variant="ghost" className="h-7 text-[11px]" onClick={() => toast.success(`${s.nom} : ${active ? "déconnecté" : "connecté"}`)}>
                              {active ? "Désactiver" : "Activer"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-md border p-3 space-y-2">
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    Droits d'accès <InfoTip text="Niveaux de droits accordés à l'agent sur ses sources." />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {["Consultation", "Analyse", "Création", "Modification", "Validation"].map(niv => (
                      <label key={niv} className="flex items-center gap-2 rounded-md border p-2 hover:bg-muted/40 cursor-pointer">
                        <Checkbox defaultChecked={niv === "Consultation" || niv === "Analyse"} />
                        <span className="text-xs">{niv}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* --- Test agent --- */}
              <TabsContent value="test" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-xs flex items-center gap-1.5">
                    Poser une question à l'agent <InfoTip text="Simulez une requête pour vérifier la configuration et les connaissances." />
                  </Label>
                  <Textarea
                    placeholder="Écrivez votre question ici…"
                    value={testQuestion}
                    onChange={e => setTestQuestion(e.target.value)}
                    rows={2}
                    className="text-xs"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {agent.questionsSuggerees.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setTestQuestion(q)}
                        className="text-[11px] rounded-full border px-2.5 py-1 hover:bg-muted/60"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <Button size="sm" onClick={runTest} className="gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" /> Tester l'agent
                  </Button>
                </div>

                {testAnswer && (
                  <div className="rounded-md border bg-card space-y-3 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-semibold">Réponse simulée</div>
                      <Badge variant="outline" className={testAnswer.confiance >= 85 ? "text-emerald-700 border-emerald-200" : "text-amber-700 border-amber-200"}>
                        Confiance {testAnswer.confiance}%
                      </Badge>
                    </div>
                    <div className="rounded-md bg-muted/40 p-3 space-y-1">
                      {testAnswer.contenu.map((c, i) => (
                        <div key={i} className="text-xs">• {c}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Sources consultées</div>
                        <ul className="space-y-1">
                          {testAnswer.sourcesUsed.map((s, i) => (
                            <li key={i} className="text-xs flex items-center gap-1.5">
                              <FileText className="h-3 w-3 text-primary" /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Informations manquantes</div>
                        {testAnswer.manquantes.length === 0
                          ? <div className="text-xs text-emerald-700">Aucune</div>
                          : <ul className="space-y-1">{testAnswer.manquantes.map((m, i) => (
                              <li key={i} className="text-xs flex items-center gap-1.5"><AlertCircle className="h-3 w-3 text-amber-600" /> {m}</li>
                            ))}</ul>}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Actions proposées</div>
                      <div className="flex flex-wrap gap-1.5">
                        {testAnswer.actions.map((a, i) => (
                          <Badge key={i} variant="secondary" className="text-[10px]">{a}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t">
                      <Button size="sm" variant="outline" onClick={() => toast.success("Merci, réponse validée")}>Réponse correcte</Button>
                      <Button size="sm" variant="outline" onClick={() => toast.info("Feedback enregistré")}>Réponse à améliorer</Button>
                      <Button size="sm" variant="outline" onClick={() => toast.info("Redirection vers les instructions")}><Edit className="h-3.5 w-3.5" /> Modifier les instructions</Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("Ajout d'une connaissance")}><Plus className="h-3.5 w-3.5" /> Ajouter une connaissance</Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* --- Right column : summary --- */}
        <Card className="xl:col-span-3">
          <CardContent className="p-4 space-y-3">
            <div>
              <h3 className="text-sm font-semibold">Résumé</h3>
              <p className="text-[11px] text-muted-foreground">État courant de l'agent sélectionné.</p>
            </div>
            <SummaryRow label="Statut" value={
              <Badge className={agent.statut === "Actif" ? "bg-success text-success-foreground" : ""} variant={agent.statut === "Actif" ? undefined : "outline"}>
                {agent.statut}
              </Badge>
            } />
            <SummaryRow label="Dernière modification" value={<span className="text-xs">{agent.maj}</span>} />
            <SummaryRow label="Documents" value={<span className="text-xs font-medium">{agent.docsCount}</span>} />
            <SummaryRow label="Sources connectées" value={<span className="text-xs font-medium">{agent.sources.filter(s => s.statut === "Connecté").length} / {agent.sources.length}</span>} />
            <SummaryRow label="Responsable" value={<span className="text-xs">{agent.responsable}</span>} />
            <Separator />
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">État de préparation</span>
                <span className="font-medium">{agent.readiness}%</span>
              </div>
              <Progress value={agent.readiness} className="h-1.5" />
            </div>
            <Button className="w-full gap-1.5" onClick={() => toast.success("Configuration enregistrée")}>
              <Save className="h-3.5 w-3.5" /> Enregistrer les modifications
            </Button>
            <div className="rounded-md border bg-muted/40 p-2.5 text-[11px] text-muted-foreground">
              Les modifications sont simulées : aucune donnée réelle n'est modifiée dans ce MVP.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- History --- */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Historique de configuration</h3>
          </div>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[10px]">Date</TableHead>
                  <TableHead className="text-[10px]">Agent</TableHead>
                  <TableHead className="text-[10px]">Modification</TableHead>
                  <TableHead className="text-[10px]">Utilisateur</TableHead>
                  <TableHead className="text-[10px]">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {HISTORIQUE.map((h, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{h.date}</TableCell>
                    <TableCell className="text-xs">{h.agent}</TableCell>
                    <TableCell className="text-xs">{h.modification}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{h.user}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={h.statut === "Validé" ? "text-emerald-700 border-emerald-200 text-[10px]" : "text-amber-700 border-amber-200 text-[10px]"}>
                        {h.statut}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageShell>
  );
}

function StatCard({ label, value, tone, small }: { label: string; value: string | number; tone?: string; small?: boolean }) {
  return (
    <div className="rounded-md border p-2.5">
      <div className={`${small ? "text-sm" : "text-lg"} font-semibold ${tone ?? ""}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      {value}
    </div>
  );
}

function IconAct({ icon: Icon, label, tone }: { icon: any; label: string; tone?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className={`h-7 w-7 ${tone ?? ""}`}
            onClick={() => toast.success(`${label} : action simulée`)}
          >
            <Icon className="h-3.5 w-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent><p className="text-xs">{label}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
