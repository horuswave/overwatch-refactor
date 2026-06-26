"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Check, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export default function ThemeDropdown() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center gap-1 p-2 text-foreground/70 hover:text-accent transition-colors"
          aria-label="Theme"
        >
          <Moon size={18} />
          <ChevronDown size={14} className="transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 p-2 text-foreground/70 hover:text-accent transition-colors"
        aria-label="Theme"
      >
        {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
        <ChevronDown size={14} className="transition-transform" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-48 bg-primary-darker/95 backdrop-blur-md border border-border rounded-xl shadow-2xl py-3 z-50">
            <button
              onClick={() => {
                if (theme !== "dark") toggleTheme();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
                theme === "dark"
                  ? "bg-accent text-primary-dark font-medium"
                  : "text-foreground hover:bg-accent/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Moon size={16} />
                Dark
              </div>
              {theme === "dark" && <Check size={16} />}
            </button>
            <button
              onClick={() => {
                if (theme !== "light") toggleTheme();
                setIsOpen(false);
              }}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-sm transition-colors",
                theme === "light"
                  ? "bg-accent text-primary-dark font-medium"
                  : "text-foreground hover:bg-accent/10"
              )}
            >
              <div className="flex items-center gap-2">
                <Sun size={16} />
                Light
              </div>
              {theme === "light" && <Check size={16} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
