require('babel-register')({
  'presets': [
    'es2015',
    'react'
  ],
  'plugins': [
    'syntax-dynamic-import'
  ]
})

const server = require('./server/index')

server()
