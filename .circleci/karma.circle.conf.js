const changes = function(config) {
  config.set({
    autoWatch: false,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    }
  })
}

const config = Object.assign(changes, require('../karma.conf.js'))

module.exports = config
