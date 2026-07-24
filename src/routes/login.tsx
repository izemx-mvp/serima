import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SerimaLogo } from "@/components/serima-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — Sérima" },
      { name: "description", content: "Accédez à votre plateforme d'agents IA Sérima : distribution industrielle, devis, stocks et reporting." },
      { property: "og:title", content: "Connexion — Sérima" },
      { property: "og:description", content: "Plateforme d'agents IA pour la distribution industrielle." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("amine@serima.ma");
  const [password, setPassword] = useState("SerimaDemo2026!");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/" }), 900);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob h-[520px] w-[520px] -top-40 -left-20 bg-primary/25" />
        <div className="blob h-[420px] w-[420px] top-40 -right-24 bg-chart-2/25" style={{ animationDelay: "-6s" }} />
        <div className="blob h-[360px] w-[360px] bottom-0 left-1/3 bg-chart-4/20" style={{ animationDelay: "-12s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent,var(--background)_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left: form */}
        <div className="flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md animate-fade-up">
            <div className="mb-8 flex items-center">
              <SerimaLogo height={44} />
            </div>

            <div className="glass-panel rounded-2xl p-7 shadow-elevated">
              <h1 className="text-2xl font-semibold tracking-tight">Bon retour parmi nous</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Connectez-vous à votre espace agents IA.
              </p>

              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">Adresse e-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 pl-9 rounded-lg bg-background/60"
                      placeholder="nom@serima.ma"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs font-medium">Mot de passe</Label>
                    <button type="button" className="text-[11px] text-primary hover:underline">Mot de passe oublié ?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pl-9 pr-10 rounded-lg bg-background/60"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                  <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                  Rester connecté sur cet appareil
                </label>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg font-medium shadow-soft group"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Connexion…</>
                  ) : (
                    <>Se connecter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>
                  )}
                </Button>

                <div className="text-center text-[11px] text-muted-foreground pt-1">
                  Identifiants pré-remplis pour la démonstration.
                </div>
              </form>
            </div>

            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              © {new Date().getFullYear()} Sérima · Distribution industrielle · Casablanca
            </p>
          </div>
        </div>

        {/* Right: brand panel */}
        <div className="hidden lg:flex relative items-center justify-center p-12 overflow-hidden">
          <div className="absolute inset-6 rounded-3xl gradient-brand shadow-elevated overflow-hidden">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:radial-gradient(circle_at_20%_20%,white,transparent_50%),radial-gradient(circle_at_80%_60%,white,transparent_45%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:24px_24px]" />

            <div className="relative h-full flex flex-col justify-between p-10 text-white">
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-medium border border-white/20">
                <Sparkles className="h-3 w-3" /> Plateforme d'agents IA industriels
              </div>

              <div className="space-y-6">
                <h2 className="text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.05]">
                  L'intelligence opérationnelle au service de la distribution industrielle.
                </h2>
                <p className="text-white/80 text-base max-w-md leading-relaxed">
                  10 agents spécialisés — devis, stocks, achats, SAV, reporting — connectés à votre ERP, votre CRM et vos canaux clients.
                </p>

                <div className="grid grid-cols-2 gap-3 max-w-md">
                  {[
                    { icon: Zap, label: "Réponse en < 30s" },
                    { icon: ShieldCheck, label: "Données isolées" },
                    { icon: Sparkles, label: "10 agents métiers" },
                    { icon: ArrowRight, label: "ERP · CRM · WhatsApp" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur px-3 py-2 border border-white/15">
                      <f.icon className="h-4 w-4 shrink-0" />
                      <span className="text-xs font-medium">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-white/70">
                <div className="flex -space-x-2">
                  {["JD", "MR", "AK", "SL"].map((i) => (
                    <div key={i} className="h-7 w-7 rounded-full bg-white/20 border border-white/30 grid place-items-center text-[10px] font-semibold">
                      {i}
                    </div>
                  ))}
                </div>
                <span>Équipes commerciales et achats déjà accompagnées.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
