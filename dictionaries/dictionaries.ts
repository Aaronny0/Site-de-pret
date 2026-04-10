import 'server-only'

const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  fr: () => import('./fr.json').then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const defaultLocale: Locale = 'es'

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
