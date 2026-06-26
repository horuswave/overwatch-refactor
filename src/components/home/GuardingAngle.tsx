"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, HelpCircle, ShieldCheck } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";

export default function GuardingAngle() {
  const t = useTranslations("guardingAngle");

  return (
    <section className="py-20 md:py-28 border-t border-border bg-primary-darker/40 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 glow-text">
            {t("title")}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Transition Grid */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 md:gap-4 mb-12">
          {/* From State */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <GlowCard techCorners={true} accentColor="red" className="h-full border-red-500/10 bg-red-950/5 text-center p-8 flex flex-col items-center justify-center">
              <HelpCircle className="text-red-400 mb-4" size={40} />
              <span className="text-xs text-muted uppercase tracking-widest font-semibold mb-2 block">
                {t("fromLabel")}
              </span>
              <p className="text-2xl font-bold text-foreground/80 italic">
                {t("fromText")}
              </p>
            </GlowCard>
          </motion.div>

          {/* Arrow Connector */}
          <div className="flex items-center justify-center shrink-0">
            <div className="w-12 h-12 rounded-full border border-border bg-primary-dark/80 flex items-center justify-center text-accent rotate-90 md:rotate-0">
              <ArrowRight size={24} className="animate-pulse" />
            </div>
          </div>

          {/* To State */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1"
          >
            <GlowCard techCorners={true} accentColor="cyan" className="h-full border-accent/30 bg-accent/5 glow-accent text-center p-8 flex flex-col items-center justify-center">
              <ShieldCheck className="text-accent mb-4 animate-bounce" size={40} />
              <span className="text-xs text-accent uppercase tracking-widest font-semibold mb-2 block">
                {t("toLabel")}
              </span>
              <p className="text-2xl font-bold text-foreground glow-text">
                {t("toText")}
              </p>
            </GlowCard>
          </motion.div>
        </div>

        {/* Outro */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-accent font-semibold text-lg max-w-xl mx-auto leading-relaxed border-t border-border/20 pt-8"
        >
          {t("outro")}
        </motion.p>
      </div>
    </section>
  );
}
