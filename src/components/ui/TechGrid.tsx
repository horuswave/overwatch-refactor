import { cn } from "@/lib/utils";

type TechGridProps = {
  className?: string;
  children?: React.ReactNode;
};

export default function TechGrid({ className, children }: TechGridProps) {
  return (
    <div className={cn("relative tech-grid hex-pattern", className)}>
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      {children}
    </div>
  );
}
