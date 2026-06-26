"use client";

import { useTranslations } from "next-intl";

export default function LaunchStrip() {
  const t = useTranslations("launchStrip");
  const pills = t.raw("pills") as string[];

  return (
    <div className="bg-primary-darker border-y border-border py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent pulse-ring shrink-0" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">
            {t("launch")}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {pills.map((pill) => (
            <span key={pill} className="text-xs text-muted font-medium">
              <span className="text-accent/60 mr-1.5">▪</span>
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
