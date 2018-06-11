const express = require('express')
const compression = require('compression')
const exphbs = require('express-handlebars')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const path = require('path')
const routeHelper = require('./routes/')
const mailRoute = require('./routes/mailer')
const oembedRoute = require('./routes/oembed')
const cors = require('cors')
const createLocaleMiddleware = require('express-locale')
const createTranslationsMiddleware = require('./middleware/TranslationsMiddleware')

const app = express()

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  const compiler = webpack(webpackConfig)
  app.use(
    devMiddleware(compiler, {
      stats: { colors: true }
    })
  )
  app.use(hotMiddleware(compiler))
}

app.engine(
  '.hbs',
  exphbs({
    extname: '.hbs',
    partialsDir: [path.join(__dirname, '/views/partials')]
  })
)

app.use(compression())
app.use(createLocaleMiddleware())
app.use(createTranslationsMiddleware())
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.resolve(__dirname, '../../', 'build')))
app.get('/embed/:id', routeHelper.player)
app.get('/play/:id', routeHelper.player)
app.get('/oembed', cors(), oembedRoute)
app.get('/mail/send', mailRoute.sendVerificationEmail)
app.get('/mail/verify', mailRoute.handleVerifyLink)
app.get('*', routeHelper.default)

module.exports = app
