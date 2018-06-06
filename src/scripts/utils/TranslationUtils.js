/* @flow */

import Polyglot from 'node-polyglot'

const SUPPORTED_LOCALES: Object = {
  EN: 'en'
}

const DEFAULT_LOCALE = SUPPORTED_LOCALES.EN

const getTranslations = ({ locale }): Object => {
  switch (locale) {
    case SUPPORTED_LOCALES.EN:
    default:
      return require('translations/en.js')
  }
}

export const initializeTranslator = () => {
  const locale: string = window.paratiiPortal.locale || DEFAULT_LOCALE
  const translations = getTranslations({ locale })
  const polyglot = new Polyglot(translations)

  return polyglot
}
