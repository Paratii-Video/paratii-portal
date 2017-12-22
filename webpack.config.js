var webpack = require("webpack");
var path = require("path");

var srcDir = path.resolve(__dirname, "src");
var scriptsDir = srcDir + "/scripts";
var assetsDir = srcDir + "/assets";
var stylesDir = srcDir + "/styles";
var buildDir = path.resolve(__dirname, "build");
var testDir = path.resolve(__dirname, "test");

var prod = process.env.NODE_ENV === "production";

var config = {
  entry: scriptsDir + "/index.js",
  output: {
    path: buildDir,
    filename: "bundle.js"
  },
  resolve: {
    alias: {
      scripts: scriptsDir,
      styles: stylesDir,
      assets: assetsDir,
      components: scriptsDir + "/components",
      constants: scriptsDir + "/constants",
      actions: scriptsDir + "/actions",
      states: scriptsDir + "/states",
      containers: scriptsDir + "/containers",
      selectors: scriptsDir + "/selectors",
      apis: scriptsDir + "/apis",
      adapters: scriptsDir + "/adapters"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: [srcDir, testDir],
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: assetsDir,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        include: stylesDir,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  }
};

module.exports = config;
