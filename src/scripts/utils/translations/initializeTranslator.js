/* @flow */

import Polyglot from 'node-polyglot'

import type { Translator, TranslatorParams } from 'types/TranslationTypes'

const initializeTranslator = (): Translator => {
  const translations: Object = window.paratiiPortal.translations
  const polyglot = new Polyglot({ phrases: translations })

  return ({ key, options }: TranslatorParams): string =>
    polyglot.t(key, options) || ''
}

export default initializeTranslator
