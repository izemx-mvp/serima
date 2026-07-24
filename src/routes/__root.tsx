import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { FloatingAssistant } from "@/components/floating-assistant";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNav } from "@/components/top-nav";

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-muted-foreground">Rafraîchissez ou revenez à l'accueil.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}

// Prevent theme FOUC by inlining a bootstrap script before hydration
const themeBootstrap = `
(function(){try{var t=localStorage.getItem('serima-theme');var s=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var r=(t==='dark'||t==='light')?t:s;var d=document.documentElement;if(r==='dark')d.classList.add('dark');d.style.colorScheme=r;}catch(e){}})();
`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sérima — Plateforme d'agents IA industriels" },
      {
        name: "description",
        content:
          "Sérima : plateforme d'agents IA pour la distribution d'aciers, inox, tubes, plastiques et outillage professionnel au Maroc.",
      },
      { property: "og:title", content: "Sérima — Plateforme d'agents IA industriels" },
      {
        property: "og:description",
        content: "10 agents IA spécialisés pour la distribution industrielle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#159a3a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [{ children: themeBootstrap }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isAuthRoute = pathname === "/login";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {isAuthRoute ? (
          <>
            <Outlet />
            <Toaster />
          </>
        ) : (
          <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background text-foreground">
              <AppSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <TopNav />
                <main className="flex-1 min-w-0">
                  <Outlet />
                </main>
              </div>
            </div>
            <FloatingAssistant />
            <Toaster />
          </SidebarProvider>
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
