import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://financepro.fr";

  // Pages principales avec priorité élevée
  const mainPages = [
    { url: `${baseUrl}/`, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/simulateur`, priority: 0.95, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/demande`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/offres`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/comment-ca-marche`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/a-propos`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${baseUrl}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
  ];

  // Pages offres produits
  const offerPages = [
    "personnel",
    "immobilier",
    "professionnel",
    "rachat-credit",
    "travaux",
    "auto",
  ].map((slug) => ({
    url: `${baseUrl}/offres/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  }));

  // Pages légales (priorité basse)
  const legalPages = [
    "mentions-legales",
    "cgu",
    "cgv",
    "confidentialite",
    "cookies",
    "accessibilite",
    "avertissements",
    "informations-precontractuelles",
    "reclamations",
    "orias",
    "acpr",
    "lcb-ft",
  ].map((slug) => ({
    url: `${baseUrl}/${slug}`,
    priority: 0.3,
    changeFrequency: "yearly" as const,
  }));

  // Auth pages (indexable mais basse priorité)
  const authPages = [
    { url: `${baseUrl}/connexion`, priority: 0.4, changeFrequency: "yearly" as const },
    { url: `${baseUrl}/inscription`, priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const now = new Date().toISOString();

  return [...mainPages, ...offerPages, ...legalPages, ...authPages].map((page) => ({
    ...page,
    lastModified: now,
  }));
}
