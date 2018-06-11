const getTranslations = require('../utils/getTranslations')

module.exports = () => (req, res, next) => {
  const locale = req.locale.language

  const translations = getTranslations(locale)

  req.translations = translations

  next()
}
