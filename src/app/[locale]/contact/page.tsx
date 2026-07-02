import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Mail, Phone, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/shared/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: { title: t("title"), description: t("description") },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}/contact`])),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 bg-primary-dark">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl">
            <SectionHeader
              title={t("title")}
              description={t("description")}
              align="left"
            />

            {/* Contact info cards */}
            
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 md:py-28 bg-primary-darker/50 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}