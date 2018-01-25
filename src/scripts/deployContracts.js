const fs = require('fs')
const path = require('path')
const { Paratii } = require('paratii-lib')

const env = process.env.NODE_ENV || 'development'

const configFilename = path.join(__dirname, `/../../config/${env}.json`)

const registryFilename = path.join(__dirname, '/../../config/registry.json')

const config = require(configFilename)

const paratii = new Paratii(config)

function deployContracts () {
  paratii.eth.deployContracts()
    .then(
      () => paratii.eth.getRegistryAddress()
    )
    .then(
      registryAddress => {
        console.log(`new registry address: ${registryAddress}`)
        const registryConfig = {
          registryAddress
        }
        fs.writeFileSync(registryFilename, JSON.stringify(registryConfig, null, 2), 'utf-8')
        const msg = `Registry address written to ${registryFilename}`
        console.log(msg)

        return msg
      }
    )
    .then(
      () => paratii.diagnose()
    )
    .then(
      (diagnosis) => console.log(diagnosis)
    )
}
deployContracts()
