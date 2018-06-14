const CopyWebpackPlugin = require('copy-webpack-plugin')
const mergeDeep = require('merge-deep')

const defaultTranslations = require('../src/translations/en.json')

module.exports = () =>
  new CopyWebpackPlugin([
    {
      from: './src/translations/**/*.json',
      to: './translations/[name].json',
      transform: content =>
        JSON.stringify(mergeDeep(defaultTranslations, JSON.parse(content)))
    }
  ])
