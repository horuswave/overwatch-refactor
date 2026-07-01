"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";

const benefitKeys = [
  "guards",
  "detection",
  "visibility",
  "accountability",
  "protection",
] as const;
const benefitImages: Partial<Record<(typeof benefitKeys)[number], string>> = {
  guards: "/guard-sleeping.jpg",
  detection: "/weapon-detection.png",
  visibility:
    "/surveillance-control-room.png",
  accountability:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  protection:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
};

export default function WhyChoose() {
  const t = useTranslations("whyChoose");

  return (
    <section className="py-20 md:py-28 bg-primary-darker/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={t("title")}
          description={t("description")}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitKeys.map((key, i) => {
            const image = benefitImages[key];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={
                  key === "protection" ? "md:col-span-2 lg:col-span-1" : ""
                }
              >
                <GlowCard className="h-full overflow-hidden p-0 flex flex-col justify-between">
                  <div>
                    {image && (
                      <div className="relative aspect-video border-b border-border">
                        <Image
                          src={image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-6 md:p-8">
                      <h3 className="text-xl font-bold text-foreground mb-3">
                        {t(`benefits.${key}.title`)}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {t(`benefits.${key}.description`)}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
