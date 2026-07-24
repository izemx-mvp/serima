import { useState } from "react";
import { Users, Mail, Linkedin, Phone, Sparkles, CalendarClock, StickyNote, Trophy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AgentHeader, SectionBlock } from "@/components/agent-header";

type Prospect = {
  id: string; entreprise: string; secteur: string; ville: string;
  contact: string; fonction: string; produits: string; potentiel: "Élevé" | "Moyen" | "Bas";
  derniere: string; relance: string; etape: string;
};

const ETAPES = ["À contacter", "Contacté", "Réponse reçue", "Rendez-vous", "Proposition envoyée", "Négociation", "Gagné"];

const PROSPECTS: Prospect[] = [
  { id: "P1", entreprise: "Métallurgie Alpine", secteur: "Sous-traitance mécanique", ville: "Grenoble", contact: "M. Laurent", fonction: "Directeur achats", produits: "Aciers spéciaux, Hardox", potentiel: "Élevé", derniere: "—", relance: "26/07", etape: "À contacter" },
  { id: "P2", entreprise: "Fabrik Industries", secteur: "Chaudronnerie", ville: "Lyon", contact: "Mme Petit", fonction: "Resp. approvisionnement", produits: "Tôles inox, tubes", potentiel: "Élevé", derniere: "Email 22/07", relance: "27/07", etape: "Contacté" },
  { id: "P3", entreprise: "ProCut Solutions", secteur: "Découpe laser", ville: "Toulouse", contact: "M. Bernard", fonction: "Gérant", produits: "Tôles fines acier", potentiel: "Moyen", derniere: "Appel 20/07", relance: "28/07", etape: "Réponse reçue" },
  { id: "P4", entreprise: "InoxTech", secteur: "Agroalimentaire", ville: "Nantes", contact: "Mme Rousseau", fonction: "Directrice technique", produits: "Inox 316L, tubes", potentiel: "Élevé", derniere: "Visite 18/07", relance: "29/07", etape: "Rendez-vous" },
  { id: "P5", entreprise: "AéroSud", secteur: "Aéronautique", ville: "Toulouse", contact: "M. Duval", fonction: "Acheteur", produits: "Alu 7075, titane", potentiel: "Élevé", derniere: "Devis 15/07", relance: "25/07", etape: "Proposition envoyée" },
  { id: "P6", entreprise: "MécanoPro", secteur: "Maintenance industrielle", ville: "Lille", contact: "M. Roche", fonction: "Chef d'atelier", produits: "Outillage, aciers", potentiel: "Moyen", derniere: "Négo 21/07", relance: "26/07", etape: "Négociation" },
];

const POT_COLORS: Record<string, string> = {
  "Élevé": "bg-success text-success-foreground",
  "Moyen": "bg-warning text-warning-foreground",
  "Bas": "bg-muted text-foreground",
};

export default function ProspectionAgent() {
  const [sel, setSel] = useState<Prospect>(PROSPECTS[1]);

  return (
    <>
      <AgentHeader
        icon={Users}
        name="Agent de prospection B2B"
        mission="Identifie les entreprises à potentiel, prépare les messages personnalisés et organise les relances commerciales."
        onDemo={() => toast.success("12 nouvelles entreprises ciblées identifiées")}
        recu="Base d'entreprises, secteurs industriels, contacts et historique commercial."
        analyse="Potentiel commercial, besoins probables et meilleur moment pour contacter."
        produit="Messages personnalisés, script d'appel et planning de relances."
      />

      <SectionBlock title="Pipeline commercial">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {ETAPES.map((e) => {
            const items = PROSPECTS.filter((p) => p.etape === e);
            return (
              <div key={e} className="rounded-lg border bg-muted/30 p-2 min-h-[180px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] font-semibold uppercase text-foreground/70 truncate">{e}</div>
                  <Badge variant="outline" className="text-[9px]">{items.length}</Badge>
                </div>
                <div className="space-y-1.5">
                  {items.map((p) => (
                    <button key={p.id} onClick={() => setSel(p)}
                      className={`w-full text-left rounded-md border bg-card p-2 hover:shadow-sm ${sel.id === p.id ? "border-primary ring-1 ring-primary" : ""}`}>
                      <div className="text-[11px] font-medium truncate">{p.entreprise}</div>
                      <div className="text-[10px] text-muted-foreground truncate">{p.contact}</div>
                      <Badge className={`${POT_COLORS[p.potentiel]} text-[9px] mt-1`}>{p.potentiel}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </SectionBlock>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionBlock title="Fiche entreprise ciblée">
          <div className="space-y-3 text-sm">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <div className="text-base font-semibold">{sel.entreprise}</div>
                <Badge className={`${POT_COLORS[sel.potentiel]} text-[10px]`}>Potentiel {sel.potentiel}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">{sel.secteur} · {sel.ville}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Info label="Contact" value={sel.contact} />
              <Info label="Fonction" value={sel.fonction} />
              <Info label="Produits d'intérêt" value={sel.produits} />
              <Info label="Étape" value={sel.etape} />
              <Info label="Dernière action" value={sel.derniere} />
              <Info label="Prochaine relance" value={sel.relance} />
            </div>
          </div>
        </SectionBlock>

        <SectionBlock title="Assistant de prospection">
          <div className="space-y-3 text-xs">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
              <div className="flex items-center gap-1.5 font-semibold text-primary text-[11px]">
                <Sparkles className="h-3.5 w-3.5" /> Angle d'approche recommandé
              </div>
              <p className="mt-1 text-foreground/80">
                {sel.entreprise} recherche activement des solutions {sel.produits.toLowerCase()}. Mettre en avant notre stock immédiat et notre service de découpe sur mesure sous 48 h.
              </p>
            </div>

            <Tab title="E-mail personnalisé" icon={Mail}>
              Bonjour {sel.contact.split(" ").pop()},<br />
              Suite à la croissance de vos activités en {sel.secteur.toLowerCase()}, nous pensons que notre gamme {sel.produits} pourrait sécuriser vos approvisionnements. Seriez-vous disponible pour un échange de 15 min cette semaine ?
            </Tab>

            <Tab title="Message LinkedIn" icon={Linkedin}>
              Bonjour {sel.contact.split(" ").pop()}, j'accompagne des acteurs du secteur {sel.secteur.toLowerCase()} sur leurs achats {sel.produits}. Ravi d'échanger sur vos enjeux si cela vous intéresse.
            </Tab>

            <Tab title="Script d'appel" icon={Phone}>
              Bonjour, {sel.contact} ? Je suis SERIMA, distributeur industriel. Rapidement — travaillez-vous actuellement avec un fournisseur unique sur les {sel.produits.toLowerCase()} ? …
            </Tab>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button size="sm" onClick={() => toast.success("Message généré et copié")}><Sparkles className="h-3.5 w-3.5" /> Générer un message</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Envoyé au commercial")}><Send className="h-3.5 w-3.5" /> Au commercial</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Relance planifiée")}><CalendarClock className="h-3.5 w-3.5" /> Programmer</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Note ajoutée")}><StickyNote className="h-3.5 w-3.5" /> Note</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Transformé en opportunité")}><Trophy className="h-3.5 w-3.5" /> Opportunité</Button>
            </div>
          </div>
        </SectionBlock>
      </div>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border p-2">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="text-xs font-medium">{value}</div>
    </div>
  );
}

function Tab({ title, icon: Icon, children }: { title: string; icon: any; children: any }) {
  return (
    <div className="rounded-md border p-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase text-muted-foreground font-semibold">
        <Icon className="h-3 w-3" /> {title}
      </div>
      <p className="mt-1 text-xs text-foreground/90 leading-relaxed">{children}</p>
    </div>
  );
}
