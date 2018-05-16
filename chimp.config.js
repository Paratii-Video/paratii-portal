module.exports = {
  path: './test/functional-tests',
  watchSource: './src',
  mocha: true,
  chai: true,
  webdriverio: {
    deprecationWarnings: false,
    waitforTimeout: 20000
  }
}
