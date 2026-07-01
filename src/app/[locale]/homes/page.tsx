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
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}/homes`]),
      ),
    },
  };
}

export default async function HomesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homes");

  return (
    <>
      {/* HERO SECTION - Full Height + Premium Overlay (same style as Business) */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/homes-bg.jpg" // ← Use the new image you generated
            alt="Residential AI Surveillance"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />

          {/* Reversed Overlay: Lighter top, Darker bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/75 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e520_0%,transparent_70%)]" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl">
            <SectionHeader
              title={t("title")}
              description={t("description")}
              align="left"
              variant="white"
            />
            <Button href="/contact" size="lg" className="mt-6">
              {t("cta")}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              return (
                <GlowCard key={key}>
                  <Icon className="text-accent mb-3" size={36} />
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`features.${key}.title`)}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {t(`features.${key}.description`)}
                  </p>
                </GlowCard>
              );
            })}
          </div>

          {/* Detection Demo Box */}
          <div className="mt-12 relative aspect-[21/9] rounded-xl overflow-hidden border border-border">
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
                LOUNGE AREA · CLEAR
              </span>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
