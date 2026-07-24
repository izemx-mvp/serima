import logoUrl from "@/assets/serima-logo-wordmark.png";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Sérima official wordmark.
 * Use variant="mark" (square S crop) for collapsed sidebars/favicons; default is the full wordmark.
 */
export function SerimaLogo({
  className,
  height = 28,
  forceDark,
  variant = "full",
}: {
  className?: string;
  height?: number;
  forceDark?: boolean;
  variant?: "full" | "mark";
}) {
  const { resolved } = useTheme();
  const dark = forceDark ?? resolved === "dark";
  const isMark = variant === "mark";

  if (isMark) {
    return (
      <div
        className={cn("relative mx-auto shrink-0 overflow-hidden", className)}
        style={{ width: height, height }}
      >
        <img
          src={logoUrl}
          alt="Sérima"
          draggable={false}
          className={cn(
            "absolute top-1/2 left-1/2 max-w-none -translate-x-[36%] -translate-y-1/2 select-none",
            dark && "brightness-125 saturate-150",
          )}
          style={{ height: height * 1.25, width: "auto" }}
        />
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt="Sérima"
      height={height}
      style={{ height, width: "auto" }}
      className={cn(
        "mx-auto block select-none transition-[filter] duration-300",
        dark && "brightness-125 saturate-150",
        className,
      )}
      draggable={false}
    />
  );
}
