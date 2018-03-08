import { Paratii } from 'paratii-lib/dist/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

const express = require('express')
const exphbs = require('express-handlebars')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const path = require('path')
const routeHelper = require('./routes/')
const oembedRoute = require('./routes/oembed')
const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
const paratii = new Paratii(paratiiConfig)
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

const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  extname: '.hbs',
  helpers: {
    foo: function () {
      return 'FOO!'
    },
    bar: function () {
      return 'BAR!'
    }
  }
})

app.engine('.hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'src/views')
app.use(express.static(path.resolve(__dirname, '../../', 'build')))

app.get('/embed/:id', async function (req, res, next) {
  const { id } = req.params
  const video = await paratii.core.vids.get(id)
  let meta = ''

  if (video !== null) {
    meta = '<link rel="stylesheet" type="text/css" href="/embed/index.css">'
    meta = routeHelper.openGraphHead(meta, video)
    meta = routeHelper.twitterCardHead(meta, video)
  } else {
    meta = routeHelper.notFoundVideo(meta)
  }
  res.render('index', {
    helpers: {
      meta: function () {
        return meta
      },
      script: function () {
        return '<script type="text/javascript" src="/embed/bundle.js"></script>'
      }
    }
  })
})

app.get('/play/:id', async function (req, res, next) {
  const { id } = req.params
  const video = await paratii.core.vids.get(id)
  let meta = ''

  if (video !== null) {
    meta = routeHelper.openGraphHead(meta, video)
    meta = routeHelper.twitterCardHead(meta, video)
  } else {
    meta = routeHelper.notFoundVideo(meta)
  }
  res.render('index', {
    helpers: {
      meta: function () {
        return meta
      },
      script: function () {
        return '<script type="text/javascript" src="/bundle.js"></script>'
      }
    }
  })
})

app.get('*', function (req, res, next) {
  const meta = routeHelper.basicHead('')
  res.render('index', {
    helpers: {
      meta: function () {
        return meta
      },
      script: function () {
        return '<script type="text/javascript" src="/bundle.js"></script>'
      }
    }
  })
})

app.get('/oembed', oembedRoute)

module.exports = app
