"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
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
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Contact Form - Takes up 2 columns on large screens */}
      <div className="lg:col-span-2">
        <GlowCard techCorners={true} className="h-full">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
                <CheckCircle className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{t("form.success")}</h3>
              <p className="text-muted mb-6">We'll be in touch within 24 hours.</p>
              <Button
                variant="secondary"
                onClick={() => setStatus("idle")}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.name")} <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.email")} <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.phone")}
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+258 85 000 0000"
                    className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                    {t("form.company")}
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Company name"
                    className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-semibold text-foreground mb-2">
                  {t("form.type")}
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  defaultValue="business"
                >
                  <option value="business">{t("form.typeOptions.business")}</option>
                  <option value="home">{t("form.typeOptions.home")}</option>
                  <option value="other">{t("form.typeOptions.other")}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  {t("form.message")} <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your security needs..."
                  className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">{t("form.error")}</p>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={status === "submitting"} 
                size="lg"
                className="w-full sm:w-auto"
              >
                <Send size={18} />
                {status === "submitting" ? t("form.submitting") : t("form.submit")}
              </Button>
            </form>
          )}
        </GlowCard>
      </div>

      {/* Contact Info - Takes up 1 column on large screens */}
      <div className="lg:col-span-1 space-y-6">
        <GlowCard techCorners={true}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Mail size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Email</h3>
          </div>
          <a
            href={`mailto:${tInfo("email")}`}
            className="block text-accent hover:text-accent/80 transition-colors font-medium"
          >
            {tInfo("email")}
          </a>
        </GlowCard>

        <GlowCard techCorners={true}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Phone size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Phone</h3>
          </div>
          <a
            href={`tel:${tInfo("phone").replace(/\s/g, "")}`}
            className="block text-accent hover:text-accent/80 transition-colors font-medium"
          >
            {tInfo("phone")}
          </a>
        </GlowCard>

        <GlowCard techCorners={true}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <MapPin size={20} />
            </div>
            <h3 className="text-lg font-bold text-foreground">Location</h3>
          </div>
          <p className="text-foreground font-medium">{tInfo("location")}</p>
        </GlowCard>
      </div>
    </div>
  );
}