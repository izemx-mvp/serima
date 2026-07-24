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
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  { title: "Tableau de bord", url: "/", icon: LayoutDashboard },
  { title: "Agents IA", url: "/agents", icon: Bot },
  { title: "Demandes clients", url: "/demandes", icon: Inbox },
  { title: "Devis", url: "/devis", icon: FileText },
  { title: "Commandes", url: "/commandes", icon: ShoppingCart },
  { title: "Stocks", url: "/stocks", icon: Package },
  { title: "Documents", url: "/documents", icon: FolderOpen },
  { title: "Réclamations", url: "/reclamations", icon: AlertTriangle },
  { title: "Reporting", url: "/reporting", icon: BarChart3 },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            S
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">SERIMA AI</span>
            <span className="text-[10px] text-sidebar-foreground/60">Distribution industrielle</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-2 py-2 text-[10px] text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          MVP de démonstration
          <br />
          données fictives
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
