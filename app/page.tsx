"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Mail, Clock, Globe } from "lucide-react";
import NewsletterSignup from "@/components/newsletter-signup";

type Language = "ca" | "es";

const translations = {
  ca: {
    comingSoon: "Properament",
    heroTitle: "Una nova llibreria arriba a",
    heroSubtitle:
      "Estem preparant un espai únic on els llibres i la comunitat es troben. Molt aviat obrirem les nostres portes al cor de Gràcia.",
    locationTitle: "Barcelona, Gràcia",
    locationDescription:
      "Aviat anunciarem l'adreça exacta de la nostra nova llibreria. Serà un lloc acollidor on podràs descobrir la teva propera lectura favorita.",
    newsletterTitle: "Sigues el primer a saber-ho",
    newsletterDescription:
      "Deixa'ns el teu email i t'avisarem quan obrim, a més de mantenir-te al dia amb les nostres novetats i esdeveniments especials.",
    emailPlaceholder: "el-teu@email.com",
    namePlaceholder: "El teu nom",
    signUpButton: "Apunta'm",
    legalDisclaimer:
      "En enviar aquest formulari, acceptes que utilitzem la teva informació per enviar-te comunicacions sobre la nostra llibreria i esdeveniments.",
    loadingText: "Enviant...",
    successTitle: "Gràcies!",
    successMessage: "T'has subscrit correctament a la nostra newsletter.",
    feature1Title: "Selecció Acurada",
    feature1Description:
      "Llibres seleccionats amb amor per a tots els gustos i edats",
    feature2Title: "Ambient Acollidor",
    feature2Description: "Un espai càlid on relaxar-te i gaudir de la lectura",
    feature3Title: "Esdeveniments Culturals",
    feature3Description:
      "Presentacions, clubs de lectura i activitats per a la comunitat",
    footer: "© 2024 Página 128. Properament a Gràcia, Barcelona.",
  },
  es: {
    comingSoon: "Próximamente",
    heroTitle: "Una nueva librería llega a",
    heroSubtitle:
      "Estamos preparando un espacio único donde los libros y la comunidad se encuentran. Muy pronto abriremos nuestras puertas en el corazón de Gracia.",
    locationTitle: "Barcelona, Gracia",
    locationDescription:
      "En breve anunciaremos la dirección exacta de nuestra nueva librería. Será un lugar acogedor donde podrás descubrir tu próxima lectura favorita.",
    newsletterTitle: "Sé el primero en saberlo",
    newsletterDescription:
      "Déjanos tu email y te avisaremos cuando abramos, además de mantenerte al día con nuestras novedades y eventos especiales.",
    emailPlaceholder: "tu@email.com",
    namePlaceholder: "Tu nombre",
    signUpButton: "Apúntame",
    legalDisclaimer:
      "Al enviar este formulario, aceptas que utilicemos tu información para enviarte comunicaciones sobre nuestra librería y eventos.",
    loadingText: "Enviando...",
    successTitle: "¡Gracias!",
    successMessage: "Te has suscrito correctamente a nuestra newsletter.",
    feature1Title: "Selección Cuidada",
    feature1Description:
      "Libros seleccionados con amor para todos los gustos y edades",
    feature2Title: "Ambiente Acogedor",
    feature2Description:
      "Un espacio cálido donde relajarte y disfrutar de la lectura",
    feature3Title: "Eventos Culturales",
    feature3Description:
      "Presentaciones, clubs de lectura y actividades para la comunidad",
    footer: "© 2024 Página 128. Próximamente en Gracia, Barcelona.",
  },
};

export default function Component() {
  const [language, setLanguage] = useState<Language>("ca");
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex-1" />

          <div className="flex justify-center flex-1">
            <Image
              src="/logo.png"
              alt="Página 128"
              width={400}
              height={120}
              className="h-16 w-auto"
            />
          </div>

          {/* Language Selector */}
          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-sm border">
              <Globe className="w-4 h-4 text-slate-500 ml-2" />
              <button
                onClick={() => setLanguage("ca")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === "ca"
                    ? "bg-pink-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                CAT
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors mr-1 ${
                  language === "es"
                    ? "bg-pink-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ESP
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              {t.comingSoon}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
              {t.heroTitle}{" "}
              <span className="text-pink-600">
                {language === "ca" ? "Gràcia" : "Gracia"}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Location Card */}
          <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-pink-600" />
                <h2 className="text-2xl font-semibold text-slate-900">
                  {t.locationTitle}
                </h2>
              </div>
              <p className="text-slate-600 text-lg">{t.locationDescription}</p>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <NewsletterSignup
            translations={{
              newsletterTitle: t.newsletterTitle,
              newsletterDescription: t.newsletterDescription,
              namePlaceholder: t.namePlaceholder,
              emailPlaceholder: t.emailPlaceholder,
              signUpButton: t.signUpButton,
              legalDisclaimer: t.legalDisclaimer,
              loadingText: t.loadingText,
              successTitle: t.successTitle,
              successMessage: t.successMessage,
            }}
          />

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900">
                {t.feature1Title}
              </h4>
              <p className="text-slate-600">{t.feature1Description}</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">☕</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900">
                {t.feature2Title}
              </h4>
              <p className="text-slate-600">{t.feature2Description}</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎭</span>
              </div>
              <h4 className="text-xl font-semibold text-slate-900">
                {t.feature3Title}
              </h4>
              <p className="text-slate-600">{t.feature3Description}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}
