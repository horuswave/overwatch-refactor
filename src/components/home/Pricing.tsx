"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";
import { WHATSAPP_QUOTE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  badge?: string;
  price: string;
  currency: string;
  featured?: boolean;
  features: string[];
};

type Discount = {
  label: string;
  value: string;
  featured: boolean;
  badge?: string;
};

export default function Pricing() {
  const t = useTranslations("pricing");
  const plans = [
    t.raw("plans.four") as Plan,
    t.raw("plans.eight") as Plan,
    t.raw("plans.sixteen") as Plan,
  ];
  
  // State for each plan's upfront payment option
  const [planOptions, setPlanOptions] = useState([3, 3, 3]); // Default to 3 months upfront
  
  const updatePlanOption = (planIndex: number, months: number) => {
    setPlanOptions(prev => {
      const newOptions = [...prev];
      newOptions[planIndex] = months;
      return newOptions;
    });
  };
  
  const calculateDiscount = (planIndex: number) => {
    const months = planOptions[planIndex];
    
    // Upfront payment discounts from content
    if (months >= 12) return 12;
    if (months >= 6) return 7;
    if (months >= 3) return 2;
    
    return 0;
  };

  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader label={t("label")} title={t("title")} description={t("description")} />

        <div className="text-center mb-12">
          <div className="inline-block rounded-lg border border-accent/30 bg-accent/5 px-5 py-3 text-sm">
            <strong className="text-accent">{t("setup.label")}</strong>{" "}
            <span className="text-muted">{t("setup.value")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, i) => {
            const discount = calculateDiscount(i);
            const originalPrice = parseInt(plan.price.replace(/[^0-9]/g, ''));
            const discountedPrice = Math.round(originalPrice * (1 - discount / 100));
            const monthlySavings = originalPrice - discountedPrice;
            const annualSavings = monthlySavings * 12;
            
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-accent text-primary-dark text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded">
                    {plan.badge}
                  </span>
                )}
                <GlowCard
                  className={cn(
                    "h-full flex flex-col",
                    plan.featured && "border-accent/60 shadow-[0_0_40px_rgba(201,162,39,0.12)]"
                  )}
                  hover={!plan.featured}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                  
                  {/* Price Display */}
                  <div className="mb-4">
                    {discount > 0 ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl text-foreground/50 line-through">
                          {originalPrice.toLocaleString()}
                        </span>
                        <span className="text-4xl font-bold text-accent">
                          {discountedPrice.toLocaleString()}
                        </span>
                        <span className="text-foreground text-sm ml-1">{plan.currency}</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-foreground">
                          {plan.price}
                        </span>
                        <span className="text-foreground text-sm ml-1">{plan.currency}</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="text-sm text-accent font-semibold mt-1">
                        Save {annualSavings.toLocaleString()} {plan.currency}/year ({discount}% off)
                      </div>
                    )}
                  </div>
                  
                  {/* Discount Options */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-foreground mb-2">
                      Upfront Payment Period
                    </label>
                    <div className="flex gap-1">
                      {[3, 6, 12].map((months) => {
                        const discountPercent = months === 12 ? 12 : months === 6 ? 7 : 2;
                        return (
                          <button
                            key={months}
                            onClick={() => updatePlanOption(i, months)}
                            className={cn(
                              "flex-1 py-2 px-2 rounded border text-xs font-semibold transition-all",
                              planOptions[i] === months
                                ? "bg-accent text-primary-dark border-accent"
                                : "bg-primary-darker/50 text-foreground border-border hover:border-accent/50"
                            )}
                          >
                            {months}mo ({discountPercent}% off)
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-foreground">
                        <Check size={16} className="text-accent shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    href={WHATSAPP_QUOTE_URL}
                    variant={plan.featured ? "primary" : "secondary"}
                    className="w-full"
                    external
                  >
                    {t("cta")}
                  </Button>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
