const SUPPORTED_LOCALES = {
  EN: 'en'
}

const getTranslations = ({ locale }) => {
  let translations
  switch (locale) {
    case SUPPORTED_LOCALES.EN:
    default:
      translations = require('translations/en.json')
      break
  }

  return JSON.stringify(translations)
}

module.exports = getTranslations
