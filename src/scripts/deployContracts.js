const fs = require('fs')
const { Paratii } = require('paratii-lib')

const env = process.env.NODE_ENV || 'development'

const configFilename = `../../config/${env}.json`

const config = require(configFilename)

const paratii = new Paratii(config)
paratii.eth.deployContracts()
  .then(
    () => paratii.eth.getRegistryAddress()
  )
  .then(
    registryAddress => {
      const newConfig = {
        ...config,
        registryAddress
      }
      fs.writeFileSync(configFilename, JSON.stringify(newConfig, null, 2), 'utf-8')
    }
  )
