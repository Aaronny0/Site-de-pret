import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";

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
    default: "FinancePro — Prêts Personnels, Immobiliers & Professionnels",
    template: "%s | FinancePro",
  },
  description:
    "FinancePro vous accompagne dans tous vos projets de financement. Simulation gratuite en 2 minutes, réponse de principe en 24h. Prêt personnel, immobilier et professionnel.",
  keywords: [
    "prêt personnel",
    "crédit immobilier",
    "prêt professionnel",
    "simulation crédit",
    "TAEG",
    "rachat de crédit",
    "financement",
  ],
  authors: [{ name: "FinancePro SAS" }],
  creator: "FinancePro SAS",
  publisher: "FinancePro SAS",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.financepro.fr",
    siteName: "FinancePro",
    title: "FinancePro — Votre partenaire financement",
    description:
      "Simulation gratuite en 2 minutes. Prêts personnels, immobiliers et professionnels. Réponse de principe en 24h.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinancePro — Votre partenaire financement",
    description: "Simulation gratuite en 2 minutes. Réponse de principe en 24h.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
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
              description: "Intermédiaire en opérations de banque - Prêts personnels, immobiliers et professionnels",
              url: "https://www.financepro.fr",
              telephone: "+33-1-XX-XX-XX-XX",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1 rue de la Finance",
                addressLocality: "Paris",
                postalCode: "75001",
                addressCountry: "FR",
              },
              areaServed: "FR",
              priceRange: "Gratuit",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <ChatWidget />
      </body>
    </html>
  );
}
