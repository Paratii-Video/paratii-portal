const express = require('express')
const path = require('path')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')
const webpackConfig = require('../../webpack.config.js')
const videoRoute = require('./routes/embed')

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

app.use(express.static(path.resolve(__dirname, '../../', 'build')))
app.get('/embed/:id', videoRoute)
app.get('*', (req, res) => {
  console.log('test')
  res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'))
})

module.exports = app
