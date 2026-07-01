"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ limit }: { limit?: number }) {
  const t = useTranslations("faq");
  const allItems = t.raw("items") as FAQItem[];
  const items = limit ? allItems.slice(0, limit) : allItems;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.question}
          className="relative rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden group hover:border-accent/30 transition-all duration-300"
        >
          {/* Tech corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <button
            type="button"
            className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-accent/5 transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-semibold text-foreground pr-4">{item.question}</span>
            <ChevronDown
              size={20}
              className={cn(
                "text-accent shrink-0 transition-transform duration-300",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted leading-relaxed border-t border-border/50 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
