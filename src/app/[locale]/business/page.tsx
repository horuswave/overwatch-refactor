import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  Warehouse,
  ShoppingBag,
  Factory,
  Building2,
  Clock,
} from "lucide-react";
import { routing } from "@/i18n/routing";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/home/CTABanner";

type Props = { params: Promise<{ locale: string }> };

const sectorIcons = [
  Factory,
  Warehouse,
  ShoppingBag,
  Building2,
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.business" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}/business`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/business`])),
    },
  };
}

export default async function BusinessPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("business");
  const sectors = t.raw("sectors.items") as {
    title: string;
    description: string;
    helpsMonitor: string;
    bullets: string[];
    outro: string;
  }[];
  const steps = t.raw("implementation.steps") as { title: string; description: string }[];

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80"
            alt=""
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 to-primary-dark" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={t("label")}
            title={t("title")}
            description={t("description")}
            align="left"
          />
          <Button href="/contact" size="lg">
            {t("cta")}
          </Button>
        </div>
      </section>

      {/* Sectors Grid Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center glow-text">
            {t("sectors.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {sectors.map((sector, i) => {
              const Icon = sectorIcons[i % sectorIcons.length];
              return (
                <GlowCard key={sector.title} techCorners={true} className="flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{sector.title}</h3>
                    </div>
                    <p className="text-muted text-sm leading-relaxed mb-4">{sector.description}</p>
                    <p className="text-accent font-semibold text-xs uppercase tracking-wider mb-2">
                      {sector.helpsMonitor}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {sector.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="text-accent mt-1 shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t border-border/40 text-xs text-muted leading-relaxed">
                    {sector.outro}
                  </div>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 md:py-28 border-t border-border bg-primary-darker/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GlowCard techCorners={true} accentColor="red" className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0">
              <Clock size={32} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 glow-text">
                {t("whyNow.title")}
              </h2>
              <p className="text-muted leading-relaxed whitespace-pre-line">
                {t("whyNow.description")}
              </p>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Implementation Steps Section */}
      <section className="py-20 md:py-28 bg-primary-darker/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center">
            {t("implementation.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <GlowCard key={step.title}>
                <div className="text-accent text-3xl font-bold mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
