/* @flow */

import React from 'react'
import Polyglot from 'node-polyglot'

import type { Translator, TranslatorParams } from 'types/TranslationTypes'

const SUPPORTED_LOCALES: Object = {
  EN: 'en'
}

const DEFAULT_LOCALE = SUPPORTED_LOCALES.EN

const getTranslations = ({ locale }): Object => {
  switch (locale) {
    case SUPPORTED_LOCALES.EN:
    default:
      return require('translations/en.json')
  }
}

export const initializeTranslator = (): Translator => {
  const locale: string = window.paratiiPortal.locale || DEFAULT_LOCALE
  const translations = getTranslations({ locale })
  const polyglot = new Polyglot({ phrases: translations })

  return ({ key, options }: TranslatorParams): string =>
    polyglot.t(key, options) || ''
}

// $FlowFixMe
export const TranslationContext = React.createContext()
