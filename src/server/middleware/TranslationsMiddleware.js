const getTranslations = require('../utils/getTranslations')
const memoize = require('memoizee')

const getTranslationsForLocale =
  process.env.NODE_ENV === 'development'
    ? getTranslations
    : memoize(getTranslations)

module.exports = () => (req, res, next) => {
  const locale = req.locale.language

  const translations = getTranslationsForLocale(locale)

  req.translations = translations

  next()
}
