import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  techCorners?: boolean;
  accentColor?: "gold" | "red" | "cyan";
};

const borderColors = {
  gold: "border-accent",
  red: "border-red-500/60",
  cyan: "border-accent/60",
};

export default function GlowCard({
  children,
  className,
  hover = true,
  techCorners = false,
  accentColor = "gold",
}: GlowCardProps) {
  const cornerColor = borderColors[accentColor];

  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-8 overflow-hidden",
        hover &&
          "transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(201,162,39,0.08)]",
        className
      )}
    >
      {/* High-Tech HUD Corners */}
      {techCorners && (
        <>
          {/* Top Left */}
          <div className={cn("absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 rounded-tl-sm", cornerColor)} />
          {/* Top Right */}
          <div className={cn("absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm", cornerColor)} />
          {/* Bottom Left */}
          <div className={cn("absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm", cornerColor)} />
          {/* Bottom Right */}
          <div className={cn("absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 rounded-br-sm", cornerColor)} />
        </>
      )}
      {children}
    </div>
  );
}
