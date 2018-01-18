const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");

const srcDir = path.resolve(__dirname, "src");
const scriptsDir = srcDir + "/scripts";
const embedDir = scriptsDir + "/embed";
const assetsDir = srcDir + "/assets";
const stylesDir = srcDir + "/styles";
const buildDir = path.resolve(__dirname, "build");
const testDir = path.resolve(__dirname, "test");
const unitTestsDir = testDir + "/unit-tests";
const functionalTestsDir = testDir + "/functional-tests";

const prod = process.env.NODE_ENV === "production";


const config = {
  entry: {
    bundle: prod
      ? [scriptsDir + "/index.js"]
      : [
          "react-hot-loader/patch",
          scriptsDir + "/index.js",
          "webpack-hot-middleware/client?quiet=true"
        ],
    'embed/bundle': embedDir + "/client/index.js"
  },
  output: {
    chunkFilename: "[name].bundle.js",
    filename: "[name].js",
    path: buildDir,
    publicPath: "/",
  },
  target: "web",
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
      types: scriptsDir + "/types",
      utils: scriptsDir + "/utils",
      "test-utils": testDir + "/test-utils",
      "unit-tests": unitTestsDir,
      "functional-tests": functionalTestsDir
    },
    aliasFields: ["browser"]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [srcDir, testDir],
        loader: "babel-loader",
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: assetsDir,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: stylesDir,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        include: embedDir + "/client/styles/embed.scss",
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  devtool: prod ? undefined : "eval-source-map",
  devServer: prod
    ? {}
    : {
        hot: true
      },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG)
    }),
    new ExtractTextPlugin('embed/embed.css'),
    prod
    ? new UglifyJsPlugin({
      uglifyOptions: {
        ecma: 6
      }
    })
    : new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
