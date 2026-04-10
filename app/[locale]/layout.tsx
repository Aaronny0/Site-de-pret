import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import LayoutShell from "@/components/LayoutShell";
import { DictionaryProvider } from "@/components/DictionaryProvider";
import { getDictionary, type Locale } from "@/dictionaries/dictionaries";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FinancePro — Préstamos Personales, Hipotecarios y Profesionales",
    template: "%s | FinancePro",
  },
  description:
    "FinancePro le acompaña en todos sus proyectos de financiación. Simulación gratuita en 2 minutos, respuesta en 24h. Préstamo personal, hipotecario y profesional.",
  keywords: [
    "préstamo personal",
    "crédito hipotecario",
    "préstamo profesional",
    "simulación crédito",
    "TAE",
    "reagrupación de créditos",
    "financiación",
  ],
  authors: [{ name: "FinancePro SL" }],
  creator: "FinancePro SL",
  publisher: "FinancePro SL",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.financepro.es",
    siteName: "FinancePro",
    title: "FinancePro — Su socio de financiación",
    description:
      "Simulación gratuita en 2 minutos. Préstamos personales, hipotecarios y profesionales. Respuesta en 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinancePro — Su socio de financiación",
    description: "Simulación gratuita en 2 minutos. Respuesta en 24h.",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "FinancePro",
              description: "Intermediario en operaciones bancarias - Préstamos personales, hipotecarios y profesionales",
              url: "https://www.financepro.es",
              telephone: "+34-900-000-000",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Calle Gran Vía 42",
                addressLocality: "Madrid",
                postalCode: "28013",
                addressCountry: "ES",
              },
              areaServed: "ES",
              priceRange: "Gratuito",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <DictionaryProvider dict={dict} lang={locale}>
          <a href="#main-content" className="skip-link">
            Ir al contenido principal
          </a>
          <LayoutShell>
            {children}
          </LayoutShell>
        </DictionaryProvider>
      </body>
    </html>
  );
}
