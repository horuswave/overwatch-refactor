"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Clock, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import TechGrid from "@/components/ui/TechGrid";
import { IMAGES, WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");

  const stats = [
    { value: tStats("monitoring.value"), label: tStats("monitoring.label") },
    { value: tStats("response.value"), label: tStats("response.label") },
    { value: tStats("compliance.value"), label: tStats("compliance.label") },
  ];

  const benefits = [
    {
      icon: Shield,
      title: "24/7 Active Monitoring",
      description: "AI-powered surveillance with real-time threat detection",
    },
    {
      icon: Clock,
      title: "Instant Response",
      description: "Under 30-second average response time to alerts",
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "98% threat detection accuracy with zero false alarms",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      <TechGrid className="absolute inset-0" />

      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/92 via-primary-dark/95 to-primary-dark" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20">
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
            <span className="text-foreground block drop-shadow-xl">{t("headline")}</span>
            {t("headlineAccent") && (
              <span className="text-accent glow-text block">{t("headlineAccent")}</span>
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

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-accent drop-shadow-sm">{stat.value}</div>
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
