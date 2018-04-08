module.exports = {
  path: './test/functional-tests',
  watchSource: './src',
  mocha: true,
  chai: true,
  webdriverio: {
    waitforTimeout: 20000,
    deprecationWarnings: false
  }
}
