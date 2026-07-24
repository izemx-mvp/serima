import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Bot,
  Inbox,
  FileText,
  ShoppingCart,
  Package,
  FolderOpen,
  AlertTriangle,
  BarChart3,
  Settings2,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { SerimaLogo } from "@/components/serima-logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const workspace = [
  { title: "Tableau de bord", url: "/", icon: LayoutDashboard },
  { title: "Agents IA", url: "/agents", icon: Bot, badge: "10" },
  { title: "Configuration", url: "/configuration", icon: Settings2 },
];

const operations = [
  { title: "Demandes clients", url: "/demandes", icon: Inbox },
  { title: "Devis", url: "/devis", icon: FileText },
  { title: "Commandes", url: "/commandes", icon: ShoppingCart },
  { title: "Stocks", url: "/stocks", icon: Package },
  { title: "Documents", url: "/documents", icon: FolderOpen },
  { title: "Réclamations", url: "/reclamations", icon: AlertTriangle },
];

const insights = [
  { title: "Reporting", url: "/reporting", icon: BarChart3 },
];

function NavGroup({
  label,
  items,
  pathname,
}: {
  label: string;
  items: { title: string; url: string; icon: any; badge?: string }[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] uppercase tracking-wider font-semibold text-sidebar-foreground/50">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={item.title}
                  className="group/item relative h-9 rounded-lg data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium transition-all"
                >
                  <Link to={item.url}>
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-r-full bg-primary" />
                    )}
                    <item.icon className="shrink-0" />
                    <span className="flex-1 truncate">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-medium group-data-[collapsible=icon]:hidden">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/60">
      <SidebarHeader className="border-b border-sidebar-border/60 h-16 px-3">
        <Link to="/" className="flex items-center h-full min-w-0 group">
          <div className="flex items-center justify-center h-full transition-transform group-hover:scale-[1.02]">
            <SerimaLogo height={collapsed ? 22 : 30} />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1 py-2">
        <NavGroup label="Espace de travail" items={workspace} pathname={pathname} />
        <NavGroup label="Opérations" items={operations} pathname={pathname} />
        <NavGroup label="Insights" items={insights} pathname={pathname} />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 p-2">
        <div className="rounded-lg bg-sidebar-accent/40 p-2.5 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-sidebar-foreground">Assistant Sérima AI</div>
              <div className="text-[10px] text-sidebar-foreground/60">10 agents opérationnels</div>
            </div>
          </div>
          <div className="text-[10px] text-sidebar-foreground/60 leading-relaxed">
            MVP de démonstration — toutes les données sont fictives.
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg p-2 hover:bg-sidebar-accent/60 transition-colors cursor-pointer">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-primary/15 text-primary text-xs font-semibold">AK</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="text-xs font-medium text-sidebar-foreground truncate">Amine Kadiri</div>
            <div className="text-[10px] text-sidebar-foreground/60 truncate">amine@serima.ma</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
