const express = require('express')
const path = require('path')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const expressHandlebars = require('express-handlebars')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const videoRoute = require('./routes/video')

const compiler = webpack(webpackConfig)
const app = express()

app.use(
  devMiddleware(compiler, {
    stats: { colors: true }
  })
)
app.use(hotMiddleware(compiler))

app.use(express.static(path.resolve(__dirname, '../../', 'build')))
app.engine('handlebars', expressHandlebars())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.get('/video/:id', videoRoute)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'))
})

module.exports = app
