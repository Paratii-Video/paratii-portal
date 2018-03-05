const express = require('express')
const path = require('path')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const videoRoute = require('./routes/embed')
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

const staticHandler = express.static(path.resolve(__dirname, '../../', 'build'))

app.use(staticHandler)
app.use('/embed', staticHandler)
app.get('/embed/:id', videoRoute)
app.get('/oembed', oembedRoute)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'))
})

module.exports = app
