import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/shared/FAQAccordion";
import CTABanner from "@/components/home/CTABanner";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.faq" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}/faq`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `/${loc}/faq`]),
      ),
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  return (
    <>
      {/* HERO SECTION - Matching Business Page Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/faq-bg.jpg"
            alt="FAQ Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />

          {/* Matching Overlays from Business Page */}
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

      {/* FAQ Content Section */}
      <section className="py-20 md:py-28 bg-primary-darker/30 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FAQAccordion />
        </div>
      </section>

      <CTABanner />
    </>
  );
}
