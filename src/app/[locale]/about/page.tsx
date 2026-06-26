import type { Metadata } from "next";
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
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label={t("label")} title={t("title")} description={t("description")} />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
            <div className="space-y-8">
              {flow.map((item, i) => (
                <div key={item.step} className="relative lg:pl-20">
                  <div className="hidden lg:flex absolute left-0 w-16 h-16 rounded-full bg-accent/10 border border-accent/30 items-center justify-center">
                    <span className="text-accent font-bold">{item.step}</span>
                  </div>
                  <GlowCard>
                    <div className="lg:hidden text-accent font-bold text-sm mb-2">{item.step}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted leading-relaxed whitespace-pre-line">{item.description}</p>
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

      <section className="py-20 md:py-28 bg-primary-darker/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
            {t("capabilities.title")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card/40"
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
