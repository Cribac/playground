import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // List of supported locales
  locales: ['de', 'en'],

  // Default locale
  defaultLocale: 'de',
})
