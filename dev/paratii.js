const { Paratii } = require('paratii-js')
const readline = require('readline')
const config = require('../config/development.json')
const registryAddress = require('/tmp/registry.json').registryAddress
config.eth.registryAddress = registryAddress
const paratii = new Paratii(config)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = { paratii, rl }
