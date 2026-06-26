import type { Metadata } from "next";
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
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/faq`])),
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("faq");

  return (
    <>
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label={t("label")} title={t("title")} description={t("description")} />
          <FAQAccordion />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
