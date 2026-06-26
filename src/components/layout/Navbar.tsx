"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import ThemeDropdown from "./ThemeDropdown";
import LanguageDropdown from "./LanguageDropdown";
import { cn } from "@/lib/utils";

const navLinks = [{ href: "/", key: "home" as const, description: "Overview" }];

const dropdownMenus = [
  {
    title: "Solutions",
    links: [
      {
        href: "/business",
        key: "business" as const,
        description: "For Companies",
      },
      { href: "/homes", key: "homes" as const, description: "For Families" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", key: "about" as const, description: "How It Works" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/faq", key: "faq" as const, description: "Help" },
      {
        href: "/contact",
        key: "contact" as const,
        description: "Get in Touch",
      },
    ],
  },
];

const standaloneLinks = [
  { href: "/#pricing", key: "pricing" as const, description: "Plans" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-primary-dark/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent",
      )}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className="shrink-0" onClick={closeMobileMenu}>
            <Logo size="sm" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {/* Standalone Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}

            {/* Dropdown Menus */}
            {dropdownMenus.map((menu) => (
              <div
                key={menu.title}
                className="relative"
                onMouseEnter={() => setOpenDropdown(menu.title)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="group flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-accent transition-colors">
                  {menu.title}
                  <ChevronDown
                    size={14}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>

                {openDropdown === menu.title && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-primary-darker/95 backdrop-blur-md border border-border rounded-lg shadow-xl py-2 z-50">
                    {menu.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                      >
                        <div className="font-medium">{t(link.key)}</div>
                        <div className="text-xs text-foreground/50">
                          {link.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Pricing - Always Visible */}
            {standaloneLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeDropdown />
            <LanguageDropdown />
            <Button href="/contact" size="sm">
              {t("cta")}
            </Button>
          </div>

          {/* Mobile: Only Hamburger */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              className="p-2 text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-primary-dark/98 backdrop-blur-lg z-40 overflow-auto">
          <div className="flex flex-col p-6 gap-2">
            {/* Standalone Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-lg font-medium text-foreground hover:text-accent hover:bg-accent/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-between">
                  <span>{t(link.key)}</span>
                  <span className="text-xs text-foreground/50">
                    {link.description}
                  </span>
                </div>
              </Link>
            ))}

            {/* Dropdown Menus - Expanded */}
            {dropdownMenus.map((menu) => (
              <div key={menu.title}>
                <div className="py-3 px-4 text-lg font-semibold text-accent">
                  {menu.title}
                </div>
                {menu.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-2 px-6 text-base font-medium text-foreground hover:text-accent hover:bg-accent/5 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <div className="flex items-center justify-between">
                      <span>{t(link.key)}</span>
                      <span className="text-xs text-foreground/50">
                        {link.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}

            {/* Pricing - Always Visible */}
            {standaloneLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-lg font-medium text-accent hover:text-accent/80 hover:bg-accent/5 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                <div className="flex items-center justify-between">
                  <span>{t(link.key)}</span>
                  <span className="text-xs text-foreground/50">
                    {link.description}
                  </span>
                </div>
              </Link>
            ))}

            {/* Theme & Language Toggles */}
            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-foreground/70">Theme</span>
                <ThemeDropdown />
              </div>
              <div className="flex items-center justify-between px-4">
                <span className="text-sm text-foreground/70">Language</span>
                <LanguageDropdown />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Button
                href="/contact"
                className="w-full"
                onClick={closeMobileMenu}
              >
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
