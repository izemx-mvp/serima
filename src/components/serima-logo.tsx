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

  return (
    <img
      src={logoUrl}
      alt="Sérima"
      height={height}
      style={{ height, width: isMark ? height : "auto" }}
      className={cn(
        "select-none transition-[filter] duration-300",
        isMark && "object-cover object-left",
        dark && "brightness-125 saturate-150",
        className,
      )}
      draggable={false}
    />
  );
}
