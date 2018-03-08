const config = Object.assign({}, require('../chimp.config.js'), {
  webdriverio: {
    waitforTimeout: 70000,
    desiredCapabilities: {
      chromeOptions: {
        args: ['headless', 'disable-gpu']
      },
      isHeadless: true
    }
  }
})

module.exports = config
