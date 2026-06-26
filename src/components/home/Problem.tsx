"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import { IMAGES } from "@/lib/constants";

export default function Problem() {
  const t = useTranslations("problem");
  const quietRisks = t.raw("quietRisks.items") as string[];
  const passiveCost = t.raw("passiveCost.items") as string[];

  return (
    <section id="about" className="py-20 md:py-28 bg-primary-darker/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader label={t("label")} title={t("title")} />

        {/* Split Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlowCard techCorners={true} accentColor="gold" className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 glow-text">
                  {t("quietRisks.title")}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {t("quietRisks.description")}
                </p>
                <ul className="space-y-2 mb-6">
                  {quietRisks.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-accent shrink-0 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <GlowCard techCorners={true} accentColor="red" className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 glow-text">
                  {t("passiveCost.title")}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  {t("passiveCost.description")}
                </p>
                <ul className="space-y-2 mb-6">
                  {passiveCost.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-red-500/80 shrink-0 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4 border-t border-border/40 text-sm text-accent font-medium uppercase tracking-wider">
                {t("passiveCost.outro")}
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Quote & Image Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="border-l-2 border-accent pl-5 text-foreground/90 font-medium text-lg leading-relaxed whitespace-pre-line">
              {t("quote")}
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border"
          >
            <Image
              src={IMAGES.commandCenter}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary-dark/30" />
            <div className="absolute top-[28%] left-[18%] w-[42%] h-[45%] detection-box rounded">
              <span className="absolute -top-7 left-0 text-xs text-accent font-mono bg-primary-dark/90 px-2 py-1 rounded border border-accent/30">
                THREAT · VERIFIED
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
