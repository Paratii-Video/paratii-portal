var webpackConfig = require("./webpack.config.js");

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["test/index.test.js"],
    exclude: [],
    preprocessors: {
      "test/index.test.js": ["webpack", "sourcemap"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "errors-only"
    },
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: true,
    concurrency: Infinity
  });
};
