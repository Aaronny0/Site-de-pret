/**
 * Route mapping system for FinancePro i18n
 * Maps internal route keys to localized slugs
 * Spanish (es) is the DEFAULT language
 */

export const locales = ['es', 'fr'] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = 'es';

// Internal route key → localized slug per locale
export const routeMap: Record<string, Record<AppLocale, string>> = {
  home:                    { es: '',                          fr: '' },
  simulator:               { es: 'simulador',                 fr: 'simulateur' },
  request:                 { es: 'solicitud',                 fr: 'demande' },
  login:                   { es: 'iniciar-sesion',            fr: 'connexion' },
  register:                { es: 'registro',                  fr: 'inscription' },
  client_area:             { es: 'area-cliente',              fr: 'espace-client' },
  about:                   { es: 'sobre-nosotros',            fr: 'a-propos' },
  contact:                 { es: 'contacto',                  fr: 'contact' },
  faq:                     { es: 'faq',                       fr: 'faq' },
  blog:                    { es: 'blog',                      fr: 'blog' },
  how_it_works:            { es: 'como-funciona',             fr: 'comment-ca-marche' },
  offers:                  { es: 'ofertas',                   fr: 'offres' },
  offers_personal:         { es: 'ofertas/personal',          fr: 'offres/personnel' },
  offers_realestate:       { es: 'ofertas/inmobiliario',      fr: 'offres/immobilier' },
  offers_professional:     { es: 'ofertas/profesional',       fr: 'offres/professionnel' },
  offers_consolidation:    { es: 'ofertas/reagrupacion',      fr: 'offres/rachat-credit' },
  offers_renovation:       { es: 'ofertas/obras',             fr: 'offres/travaux' },
  offers_auto:             { es: 'ofertas/auto',              fr: 'offres/auto' },
  privacy:                 { es: 'privacidad',                fr: 'confidentialite' },
  legal:                   { es: 'avisos-legales',            fr: 'mentions-legales' },
  terms:                   { es: 'condiciones-uso',           fr: 'cgu' },
  terms_sale:              { es: 'condiciones-venta',         fr: 'cgv' },
  cookies:                 { es: 'cookies',                   fr: 'cookies' },
  accessibility:           { es: 'accesibilidad',             fr: 'accessibilite' },
  warnings:                { es: 'avisos',                    fr: 'avertissements' },
  precontractual:          { es: 'informacion-precontractual',fr: 'informations-precontractuelles' },
  complaints:              { es: 'reclamaciones',             fr: 'reclamations' },
  orias:                   { es: 'orias',                     fr: 'orias' },
  acpr:                    { es: 'acpr',                      fr: 'acpr' },
  lcb_ft:                  { es: 'lcb-ft',                    fr: 'lcb-ft' },
  admin:                   { es: 'admin',                     fr: 'admin' },
  admin_requests:          { es: 'admin/solicitudes',         fr: 'admin/demandes' },
};

/**
 * Get a localized path for a given route key and locale
 */
export function getLocalizedPath(routeKey: string, locale: AppLocale): string {
  const slug = routeMap[routeKey]?.[locale];
  if (slug === undefined) {
    console.warn(`Route key "${routeKey}" not found in routeMap`);
    return `/${locale}`;
  }
  return slug === '' ? `/${locale}` : `/${locale}/${slug}`;
}

/**
 * Build rewrites array for next.config.ts
 * Maps Spanish route slugs to the existing French folder names in app/[locale]/
 */
export function buildRewrites() {
  const rewrites: { source: string; destination: string }[] = [];

  for (const [key, slugs] of Object.entries(routeMap)) {
    if (key === 'home') continue; // Skip home, it's just the locale root

    const esSlug = slugs.es;
    const frSlug = slugs.fr;

    // Spanish URLs → French folder names (the actual file system folders)
    if (esSlug !== frSlug) {
      rewrites.push({
        source: `/es/${esSlug}`,
        destination: `/es/${frSlug}`,
      });
      // Also handle sub-routes
      rewrites.push({
        source: `/es/${esSlug}/:path*`,
        destination: `/es/${frSlug}/:path*`,
      });
    }
  }

  return rewrites;
}
