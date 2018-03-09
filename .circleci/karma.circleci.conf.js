const shared = require('../karma.conf.js')

module.exports = function(karma) {
  shared(karma)
  karma.set({
    files: ['../test/unit-tests/index.test.js'],
    preprocessors: {
      '../test/unit-tests/index.test.js': ['webpack', 'sourcemap']
    },
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
