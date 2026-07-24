import { Link, useRouterState } from "@tanstack/react-router";
import { Search, Bell, ChevronRight, Command, LogOut, User, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LABELS: Record<string, string> = {
  "": "Tableau de bord",
  agents: "Agents IA",
  configuration: "Configuration",
  demandes: "Demandes",
  devis: "Devis",
  commandes: "Commandes",
  stocks: "Stocks",
  documents: "Documents",
  reclamations: "Réclamations",
  reporting: "Reporting",
  login: "Connexion",
};

function Breadcrumb() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  return (
    <nav aria-label="Fil d'Ariane" className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground min-w-0">
      <Link to="/" className="hover:text-foreground transition-colors">Sérima</Link>
      {parts.map((p, i) => {
        const isLast = i === parts.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
            <span className={isLast ? "text-foreground font-medium truncate" : "truncate"}>
              {LABELS[p] ?? decodeURIComponent(p)}
            </span>
          </span>
        );
      })}
    </nav>
  );
}

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/60 bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="flex h-full items-center gap-3 px-4">
        <SidebarTrigger className="rounded-full h-9 w-9" />
        <Breadcrumb />

        <div className="flex-1" />

        {/* Global search */}
        <button className="hidden md:flex items-center gap-2 h-9 pl-3 pr-2 rounded-full border border-border/60 bg-muted/40 hover:bg-muted transition-colors text-sm text-muted-foreground min-w-[240px]">
          <Search className="h-4 w-4" />
          <span className="flex-1 text-left">Rechercher…</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border/70 bg-background px-1.5 py-0.5 text-[10px] font-mono">
            <Command className="h-3 w-3" /> K
          </kbd>
        </button>

        <Badge variant="outline" className="hidden xl:inline-flex text-[10px] gap-1.5 border-primary/30 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> MVP démo
        </Badge>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications <Badge variant="secondary" className="text-[10px]">3</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              { t: "Devis DEV-2026-140 à relancer", d: "il y a 3 min" },
              { t: "Rupture imminente : Inox 304 Ø20", d: "il y a 12 min" },
              { t: "CMD-2026-018 en retard", d: "il y a 1h" },
            ].map((n, i) => (
              <DropdownMenuItem key={i} className="flex-col items-start gap-0.5 py-2.5">
                <span className="text-sm font-medium">{n.t}</span>
                <span className="text-[11px] text-muted-foreground">{n.d}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-full hover:bg-muted transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">AK</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block text-sm font-medium">Amine K.</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm">Amine Kadiri</span>
              <span className="text-[11px] text-muted-foreground font-normal">amine@serima.ma</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="h-4 w-4" /> Profil</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/configuration"><Settings className="h-4 w-4" /> Configuration</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/login"><LogOut className="h-4 w-4" /> Se déconnecter</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
