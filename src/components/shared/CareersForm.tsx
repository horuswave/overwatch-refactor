"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle, Upload } from "lucide-react";
import Button from "@/components/ui/Button";
import GlowCard from "@/components/ui/GlowCard";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function CareersForm() {
  const t = useTranslations("careers");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [fileName, setFileName] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add position field if it exists
    const positionSelect = form.querySelector('#position') as HTMLSelectElement;
    if (positionSelect) {
      formData.set('position', positionSelect.value);
    }

    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
      setFileName("");
    } catch {
      setStatus("error");
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <GlowCard techCorners={true} className="h-full">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-4">
            <CheckCircle className="text-accent" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t("form.success")}
          </h3>
          <p className="text-muted mb-6">
            We'll review your application and get back to you soon.
          </p>
          <Button
            variant="secondary"
            onClick={() => {
              setStatus("idle");
              setFileName("");
            }}
          >
            Submit Another Application
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Full Name <span className="text-accent">*</span>
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
                Email Address <span className="text-accent">*</span>
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
                Phone Number
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
              <label htmlFor="position" className="block text-sm font-semibold text-foreground mb-2">
                Position Applied For
              </label>
              <select
                id="position"
                name="position"
                className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              >
                <option value="">Select a position</option>
                <option value="AI Monitoring Operator">AI Monitoring Operator</option>
                <option value="Security Operations Manager">Security Operations Manager</option>
                <option value="Technical Support Specialist">Technical Support Specialist</option>
                <option value="Sales & Business Development">Sales & Business Development</option>
                <option value="General Application">General Application</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cv" className="block text-sm font-semibold text-foreground mb-2">
              Upload CV <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="flex items-center justify-center gap-3 w-full px-4 py-8 rounded-lg bg-primary-dark/50 border-2 border-dashed border-border hover:border-accent/50 cursor-pointer transition-all"
              >
                <Upload className="text-accent" size={24} />
                <div className="text-center">
                  {fileName ? (
                    <p className="text-foreground font-medium">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-foreground font-medium">Click to upload your CV</p>
                      <p className="text-muted text-sm mt-1">PDF, DOC, or DOCX (max 5MB)</p>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
              Cover Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us about yourself and why you'd like to join Overwatch..."
              className="w-full px-4 py-3 rounded-lg bg-primary-dark/50 border border-border text-foreground placeholder:text-muted/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all resize-y"
            />
          </div>

          {status === "error" && (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">
                {t("form.error") || "Something went wrong. Please try again or email us directly."}
              </p>
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
  );
}