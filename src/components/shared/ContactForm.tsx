"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, Globe, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contact");
  const tInfo = useTranslations("contact.info");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid lg:grid-cols-5 gap-10">
      <GlowCard className="lg:col-span-3">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle className="text-accent mb-4" size={48} />
            <p className="text-lg text-foreground">{t("form.success")}</p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => setStatus("idle")}
            >
              OK
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.name")} *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.email")} *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.phone")}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  {t("form.company")}
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-foreground mb-2">
                {t("form.type")}
              </label>
              <select
                id="type"
                name="type"
                className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
                defaultValue="business"
              >
                <option value="business">{t("form.typeOptions.business")}</option>
                <option value="home">{t("form.typeOptions.home")}</option>
                <option value="other">{t("form.typeOptions.other")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                {t("form.message")} *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-primary-dark border border-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-y"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={18} />
                {t("form.error")}
              </div>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto gap-2">
              <Send size={18} />
              {status === "submitting" ? t("form.submitting") : t("form.submit")}
            </Button>
          </form>
        )}
      </GlowCard>

      <div className="lg:col-span-2 space-y-6">
        <GlowCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">{tInfo("location")}</h3>
          <ul className="space-y-4">
            <li>
              <a
                href={`mailto:${tInfo("email")}`}
                className="flex items-start gap-3 text-muted hover:text-accent transition-colors group"
              >
                <Mail size={20} className="text-accent shrink-0 mt-0.5" />
                <span>{tInfo("email")}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${tInfo("phone").replace(/\s/g, "")}`}
                className="flex items-start gap-3 text-muted hover:text-accent transition-colors group"
              >
                <Phone size={20} className="text-accent shrink-0 mt-0.5" />
                <span>{tInfo("phone")}</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.overwatchmoz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted hover:text-accent transition-colors group"
              >
                <Globe size={20} className="text-accent shrink-0 mt-0.5" />
                <span>{tInfo("website")}</span>
              </a>
            </li>
            <li className="flex items-start gap-3 text-muted">
              <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
              <span>{tInfo("location")}</span>
            </li>
          </ul>
        </GlowCard>
      </div>
    </div>
  );
}
