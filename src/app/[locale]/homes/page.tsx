import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Users, Fence, Waves, Moon } from "lucide-react";
import { routing } from "@/i18n/routing";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import CTABanner from "@/components/home/CTABanner";

type Props = { params: Promise<{ locale: string }> };

const featureIcons = [Users, Fence, Waves, Moon];
const featureKeys = ["family", "perimeter", "pool", "overnight"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.homes" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}/homes`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/homes`])),
    },
  };
}

export default async function HomesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homes");

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
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

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <GlowCard key={key}>
                  <Icon className="text-accent mb-4" size={36} />
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </GlowCard>
              );
            })}
          </div>

          <div className="mt-16 relative aspect-[21/9] rounded-xl overflow-hidden border border-border">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-primary-dark/50" />
            <div className="absolute top-[25%] left-[15%] w-[30%] h-[40%] detection-box rounded">
              <span className="absolute -top-7 left-0 text-xs text-accent font-mono bg-primary-dark/80 px-2 py-1 rounded">
                PERIMETER · ACTIVE
              </span>
            </div>
            <div className="absolute bottom-[20%] right-[20%] w-[25%] h-[30%] detection-box rounded border-green-400/60">
              <span className="absolute -top-7 left-0 text-xs text-green-400 font-mono bg-primary-dark/80 px-2 py-1 rounded">
                POOL AREA · CLEAR
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
