import { useState } from "react";
import { Bot, Send, ThumbsUp, UserCheck, FilePlus, Sparkles, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

export default function TechnicoAgent() {
  const [form, setForm] = useState({
    secteur: "Carrière / mines",
    utilisation: "Benne de camion",
    famille: "Tôle",
    matiere: "Acier anti-abrasion",
    dim: "2000 × 6000",
    ep: "10",
    qte: "20",
    contraintes: "Résistance à l'abrasion, chocs répétés, exposition extérieure",
    urgence: "Sous 15 jours",
  });
  const [reco, setReco] = useState<null | any>(null);
  const [loading, setLoading] = useState(false);

  const analyser = () => {
    setLoading(true);
    setReco(null);
    setTimeout(() => {
      setReco({
        produit: "Tôle anti-abrasion Hardox 450",
        ref: "HX-450-P10-2060",
        nuance: "Hardox 450 — 450 HBW",
        dim: "10 × 2000 × 6000 mm",
        dispo: "15 unités en stock A2-07",
        justif: "Le secteur carrière et l'usage benne imposent une résistance élevée à l'abrasion et aux impacts. Hardox 450 est le standard reconnu pour ce type d'application, avec un excellent rapport durabilité / prix.",
        conf: 92,
        alt: "Hardox 500 — HX-500-P10 (usure très sévère, +18 %)",
        criteres: [
          { label: "Résistance à l'abrasion", value: "Très élevée (450 HBW)" },
          { label: "Environnement", value: "Extérieur, poussiéreux" },
          { label: "Contraintes mécaniques", value: "Chocs & flexion" },
          { label: "Disponibilité", value: "Immédiate (15 pcs)" },
          { label: "Compatibilité soudage", value: "OK sans préchauffage" },
          { label: "Norme", value: "EN 10029 classe A" },
        ],
      });
      setLoading(false);
    }, 700);
  };

  return (
    <>
      <AgentHeader
        icon={Bot}
        name="Agent technico-commercial"
        mission="Analyse les besoins techniques des clients et recommande les produits industriels les plus adaptés."
        onDemo={analyser}
        recu="Demandes clients, références, dimensions, quantités et contraintes techniques."
        analyse="Catalogue, disponibilité, compatibilité produit et historique de commandes."
        produit="Recommandation produit chiffrée avec alternative et niveau de confiance."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Colonne gauche */}
        <SectionBlock title="Demande du client">
          <div className="space-y-3">
            <Field label="Secteur d'activité">
              <Select value={form.secteur} onValueChange={(v) => setForm({ ...form, secteur: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Carrière / mines">Carrière / mines</SelectItem>
                  <SelectItem value="Automobile">Automobile</SelectItem>
                  <SelectItem value="Chaudronnerie">Chaudronnerie</SelectItem>
                  <SelectItem value="Aéronautique">Aéronautique</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Type d'utilisation"><Input value={form.utilisation} onChange={(e) => setForm({ ...form, utilisation: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Famille"><Input value={form.famille} onChange={(e) => setForm({ ...form, famille: e.target.value })} /></Field>
              <Field label="Matière"><Input value={form.matiere} onChange={(e) => setForm({ ...form, matiere: e.target.value })} /></Field>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Dim."><Input value={form.dim} onChange={(e) => setForm({ ...form, dim: e.target.value })} /></Field>
              <Field label="Ép. (mm)"><Input value={form.ep} onChange={(e) => setForm({ ...form, ep: e.target.value })} /></Field>
              <Field label="Qté"><Input value={form.qte} onChange={(e) => setForm({ ...form, qte: e.target.value })} /></Field>
            </div>
            <Field label="Contraintes techniques"><Textarea rows={2} value={form.contraintes} onChange={(e) => setForm({ ...form, contraintes: e.target.value })} /></Field>
            <Field label="Urgence"><Input value={form.urgence} onChange={(e) => setForm({ ...form, urgence: e.target.value })} /></Field>
            <Button onClick={analyser} disabled={loading} className="w-full gap-2">
              <Sparkles className="h-4 w-4" /> {loading ? "Analyse en cours..." : "Analyser le besoin"}
            </Button>
          </div>
        </SectionBlock>

        {/* Colonne centrale */}
        <SectionBlock title="Analyse de l'agent">
          {!reco && !loading && <EmptyState text="Cliquez sur « Analyser le besoin » pour voir les critères détectés." />}
          {loading && <SkeletonList />}
          {reco && (
            <div className="space-y-2">
              {reco.criteres.map((c: any) => (
                <div key={c.label} className="flex items-start gap-2 rounded-md border bg-muted/30 p-2.5">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-foreground">{c.label}</div>
                    <div className="text-xs text-muted-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionBlock>

        {/* Colonne droite */}
        <SectionBlock title="Recommandation">
          {!reco && <EmptyState text="La recommandation apparaîtra ici." />}
          {reco && (
            <div className="space-y-3">
              <div className="rounded-lg border bg-gradient-to-br from-primary/5 to-transparent p-3 space-y-2">
                <Badge className="bg-success text-success-foreground">Confiance {reco.conf}%</Badge>
                <div>
                  <div className="text-sm font-semibold">{reco.produit}</div>
                  <div className="text-xs text-muted-foreground">Réf. {reco.ref} · {reco.nuance}</div>
                </div>
                <Progress value={reco.conf} className="h-1.5" />
                <div className="text-xs"><span className="text-muted-foreground">Dimensions :</span> {reco.dim}</div>
                <div className="text-xs"><span className="text-muted-foreground">Disponibilité :</span> {reco.dispo}</div>
                <p className="text-xs text-foreground/80 border-t pt-2">{reco.justif}</p>
              </div>
              <div className="rounded-md border border-dashed p-2.5">
                <div className="text-[10px] uppercase text-muted-foreground">Alternative</div>
                <div className="text-xs font-medium">{reco.alt}</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline" onClick={() => toast.success("Recommandation validée")}><ThumbsUp className="h-3.5 w-3.5" /> Valider</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Expert notifié")}><UserCheck className="h-3.5 w-3.5" /> Avis expert</Button>
                <Button size="sm" variant="outline" onClick={() => toast.success("Produit ajouté au devis")}><FilePlus className="h-3.5 w-3.5" /> Ajouter au devis</Button>
                <Button size="sm" onClick={() => toast.success("Envoyé au client")}><Send className="h-3.5 w-3.5" /> Envoyer</Button>
              </div>
            </div>
          )}
        </SectionBlock>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: any }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
function EmptyState({ text }: { text: string }) {
  return <div className="text-xs text-muted-foreground text-center py-6 border border-dashed rounded-md">{text}</div>;
}
function SkeletonList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-10 rounded-md bg-muted animate-pulse" />
      ))}
    </div>
  );
}
