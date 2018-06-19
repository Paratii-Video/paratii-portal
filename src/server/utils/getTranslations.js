const fs = require('fs')
const path = require('path')

const SUPPORTED_LOCALES = {
  EN: 'en',
  PT_BR: 'pt'
}

const getTranslations = locale => {
  let fileName = 'en.json'
  switch (locale) {
    case SUPPORTED_LOCALES.PT_BR:
      fileName = 'pt-BR.json'
  }

  return fs.readFileSync(
    path.resolve(__dirname, `../../../build/translations/${fileName}`)
  )
}

module.exports = getTranslations
