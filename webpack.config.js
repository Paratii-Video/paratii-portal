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
  entry: [
    "react-hot-loader/patch",
    scriptsDir + "/index.js",
    "webpack-hot-middleware/client?quiet=true"
  ],
  output: {
    path: buildDir,
    publicPath: "/",
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
      reducers: scriptsDir + "/reducers",
      records: scriptsDir + "/records",
      containers: scriptsDir + "/containers",
      selectors: scriptsDir + "/selectors",
      apis: scriptsDir + "/apis",
      adapters: scriptsDir + "/adapters",
      "test-utils": testDir + "/test-utils"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: [srcDir, testDir],
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"],
          plugins: [
            "transform-flow-strip-types",
            "transform-object-rest-spread",
            "react-hot-loader/babel"
          ]
        }
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
  },
  devtool: "inline-source-map",
  devServer: {
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
