import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  external?: boolean;
};

const variants = {
  primary:
    "bg-accent text-primary-dark font-semibold hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:brightness-110",
  secondary:
    "border border-accent/50 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]",
  ghost: "text-muted hover:text-accent hover:bg-accent/5",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external || isExternalHref(href)) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
