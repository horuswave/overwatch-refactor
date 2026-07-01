import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import CTABanner from "@/components/home/CTABanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}/about`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/about`])),
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howItWorks");
  const flow = t.raw("flow") as { step: string; title: string; description: string }[];
  const capabilities = t.raw("capabilities.items") as string[];

  return (
    <>
      {/* HERO SECTION - Consistent with Business & FAQ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/surveillance-control-room.png"
            alt="Overwatch Control Center"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />

          {/* Matching Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/60 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/75 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(at_center,#4f46e520_0%,transparent_50%)]" />
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
          </div>
        </div>
      </section>

      {/* Flow / Timeline Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            <div className="space-y-6">
              {flow.map((item, i) => (
                <div key={item.step} className="relative lg:pl-20">
                  <div className="hidden lg:flex absolute left-0 w-16 h-16 rounded-full bg-accent/10 border border-accent/30 items-center justify-center backdrop-blur-sm">
                    <span className="text-accent font-bold text-lg">{item.step}</span>
                  </div>
                  <GlowCard techCorners={true}>
                    <div className="lg:hidden text-accent font-bold text-sm mb-2">{item.step}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2 glow-text">
                      {item.title}
                    </h3>
                    <p className="text-muted leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  </GlowCard>
                  {i < flow.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <div className="w-px h-8 bg-accent/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 md:py-28 bg-primary-darker/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-12 text-center glow-text">
            {t("capabilities.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/40 backdrop-blur-sm hover:border-accent/30 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-accent shrink-0 pulse-ring" />
                <span className="text-foreground text-sm">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
