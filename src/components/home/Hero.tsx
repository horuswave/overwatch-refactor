"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Clock, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import TechGrid from "@/components/ui/TechGrid";
import { WHATSAPP_URL } from "@/lib/constants";

const benefitIcons = [Shield, Clock, CheckCircle];

export default function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const benefits = t.raw("benefits") as {
    title: string;
    description: string;
  }[];

  const stats = [
    { value: tStats("monitoring.value"), label: tStats("monitoring.label") },
    { value: tStats("response.value"), label: tStats("response.label") },
    { value: tStats("compliance.value"), label: tStats("compliance.label") },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/u68Kg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/65 via-primary-dark/70 to-primary-dark/85" />
      </div>

      {/* Tech grid layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <TechGrid className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-accent text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-lg shadow-accent/10">
            {t("badge")}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            <span className="text-foreground block drop-shadow-xl">
              {t("headline")}
            </span>
            {t("headlineAccent") && (
              <span className="text-accent glow-text block">
                {t("headlineAccent")}
              </span>
            )}
          </h1>

          <p className="text-foreground text-lg leading-relaxed mb-8 whitespace-pre-line font-medium drop-shadow-md max-w-3xl mx-auto">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button href="/contact" size="lg">
              {t("ctaPrimary")}
            </Button>
            <Button href={WHATSAPP_URL} variant="secondary" size="lg" external>
              {t("ctaSecondary")}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-accent drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground mt-1 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
