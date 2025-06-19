"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface NewsletterSignupProps {
  translations: {
    newsletterTitle: string;
    newsletterDescription: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    signUpButton: string;
    legalDisclaimer: string;
    loadingText: string;
    successTitle: string;
    successMessage: string;
  };
}

type SubmissionState = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup({
  translations: t,
}: NewsletterSignupProps) {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionState("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setSubmissionState("success");
        // Reset form
        // e.currentTarget.reset();
      } else {
        // Try to parse error response
        try {
          const data = await response.json();
          setSubmissionState("error");
          setErrorMessage(data.error || "Something went wrong");
        } catch (parseError) {
          setSubmissionState("error");
          setErrorMessage(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setSubmissionState("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-bold">
            {t.newsletterTitle}
          </h3>
          <p className="text-slate-300 text-lg">{t.newsletterDescription}</p>
        </div>

        {submissionState === "success" ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">{t.successTitle}</h4>
              <p className="text-slate-300">{t.successMessage}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                name="name"
                placeholder={t.namePlaceholder}
                required
                disabled={submissionState === "loading"}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 disabled:opacity-50"
              />
              <Input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                required
                disabled={submissionState === "loading"}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 disabled:opacity-50"
              />
            </div>

            {submissionState === "error" && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={submissionState === "loading"}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 w-full sm:w-auto disabled:opacity-50"
            >
              {submissionState === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.loadingText}
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  {t.signUpButton}
                </>
              )}
            </Button>
            <p className="text-slate-400 text-xs leading-relaxed">
              {t.legalDisclaimer}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
