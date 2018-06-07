const mergeDeep = require('merge-deep')

const SUPPORTED_LOCALES = {
  EN: 'en'
}

const getTranslations = ({ locale }) => {
  const defaultTranslations = require('translations/en.json')
  let localeTranslations
  switch (locale) {
    case SUPPORTED_LOCALES.EN:
    default:
      localeTranslations = null
      break
  }

  const finalTranslations = localeTranslations
    ? mergeDeep(defaultTranslations, localeTranslations)
    : defaultTranslations

  return JSON.stringify(finalTranslations)
}

module.exports = getTranslations
