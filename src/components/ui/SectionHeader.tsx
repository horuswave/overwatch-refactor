import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {label && (
        <span className="inline-block text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-lg md:text-xl leading-relaxed whitespace-pre-line">{description}</p>
      )}
    </div>
  );
}
