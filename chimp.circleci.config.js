module.exports = {
  path: './test/functional-tests',
  watchSource: './src',
  mocha: true,
  chai: true,
  webdriverio: {
    waitforTimeout: 70000,
    desiredCapabilities: {
      chromeOptions: {
        args: ['headless', 'disable-gpu']
      },
      isHeadless: true
    }
  }
}
