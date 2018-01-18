'use strict'

require('babel-register')({
  'presets': [
    'es2015',
    'react'
  ],
  plugins: [
    'syntax-dynamic-import'
  ]
})

const app = require('./app')

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Paratii portal dev server is listening on port ${PORT}!`)
})
