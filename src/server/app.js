const express = require('express')
const exphbs = require('express-handlebars')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const path = require('path')
const routeHelper = require('./routes/')
const oembedRoute = require('./routes/oembed')

const app = express()

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig)
  app.use(
    devMiddleware(compiler, {
      stats: { colors: true }
    })
  )
  app.use(hotMiddleware(compiler))
}

if (process.env.NODE_ENV === 'production-notugly') {
  const compiler = webpack(webpackConfig)
  app.use(
    devMiddleware(compiler, {
      stats: { colors: true }
    })
  )
}

app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    partialsDir: [
      //  path to your partials
      path.join(__dirname, '/views/partials')
    ]
  })
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.resolve(__dirname, '../../', 'build')))

app.get('/embed/:id', routeHelper.player)
app.get('/play/:id', routeHelper.player)

app.get('*', routeHelper.default)

app.get('/oembed', oembedRoute)

module.exports = app
