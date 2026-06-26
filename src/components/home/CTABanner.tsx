"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import TechGrid from "@/components/ui/TechGrid";
import { IMAGES } from "@/lib/constants";

export default function CTABanner() {
  const t = useTranslations("cta");

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      <TechGrid className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8 whitespace-pre-line">{t("description")}</p>
            <Button href="/contact" size="lg" className="glow-accent">
              {t("button")}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-border shadow-2xl"
          >
            <video
              className="w-full h-auto block"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={IMAGES.ctaVideoPoster}
            >
              <source src={IMAGES.ctaVideoSrc} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
