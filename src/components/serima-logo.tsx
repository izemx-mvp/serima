import logoAsset from "@/assets/serima-logo.png.asset.json";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Sérima official wordmark (extracted from serima.ma).
 * The logo already contains the company name — never render text beside it.
 * On dark backgrounds we brighten it slightly for optimal contrast.
 */
export function SerimaLogo({
  className,
  height = 28,
  forceDark,
}: {
  className?: string;
  height?: number;
  forceDark?: boolean;
}) {
  const { resolved } = useTheme();
  const dark = forceDark ?? resolved === "dark";
  return (
    <img
      src={logoAsset.url}
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
