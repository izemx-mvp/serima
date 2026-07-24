import logoUrl from "@/assets/serima-logo-wordmark.png";
import markAsset from "@/assets/serima-mark.png.asset.json";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Sérima official wordmark (extracted from serima.ma).
 * Use variant="mark" (square S) for collapsed sidebars/favicons; default is the full wordmark.
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
  const src = variant === "mark" ? markAsset.url : logoUrl;
  return (
    <img
      src={src}
      alt="Sérima"
      height={height}
      style={{ height, width: "auto" }}
      className={cn(
        "select-none transition-[filter] duration-300",
        dark && "brightness-125 saturate-150",
        className,
      )}
      draggable={false}
    />
  );
}
