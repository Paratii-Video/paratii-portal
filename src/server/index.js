'use strict'

require('babel-register')({
  presets: ['es2015', 'react'],
  plugins: ['babel-plugin-webpack-alias']
})

const app = require('./app')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Paratii portal server is listening on port ${PORT}!`)
})
