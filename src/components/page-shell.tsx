import type { ReactNode } from "react";

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {/* subtle ambient gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 -z-10 overflow-hidden">
        <div className="blob h-80 w-80 -top-24 -left-16 bg-primary/15" />
        <div className="blob h-72 w-72 -top-20 right-10 bg-chart-2/15" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="p-6 md:p-8 space-y-6 max-w-[1500px] mx-auto animate-fade-up">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {description && (
              <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}
