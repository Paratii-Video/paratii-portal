const fs = require('fs')
const path = require('path')
const { Paratii } = require('paratii-js')

const env = process.env.NODE_ENV || 'development'
let configFilename

if (env === 'test') {
  configFilename = path.join(__dirname, `/../../config/test-server.json`)
} else {
  configFilename = path.join(__dirname, `/../../config/${env}.json`)
}

const registryFilename = '/tmp/registry.json'

const config = require(configFilename)

const paratii = new Paratii(config)

const address1 = '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'

async function deployContracts () {
  await paratii.eth.deployContracts()
  const registryAddress = await paratii.eth.getRegistryAddress()
  console.log(`Paratii registry address: ${registryAddress}`)
  const registryConfig = {
    registryAddress
  }
  fs.writeFileSync(
    registryFilename,
    JSON.stringify(registryConfig, null, 2),
    'utf-8'
  )
  const msg = `Registry address written to ${registryFilename}`
  console.log(msg)

  // const diagnosis = await paratii.diagnose()
  // console.log(diagnosis)
}

async function fundDistributor () {
  await paratii.eth.distributor
    .getPTIDistributeContract()
    .then(distributor => {
      paratii.eth.getContract('ParatiiToken').then(token => {
        console.log('approving distributor.... ', distributor.options.address)
        token.methods
          .transfer(
            distributor.options.address,
            paratii.eth.web3.utils.toWei('50')
          )
          .send((err, tx) => {
            if (err) throw err
            if (tx) {
              console.log('transfer : ', tx)
            }
          })
      })
    })
    .catch(e => {
      throw e
    })
}

async function seedVideos () {
  await paratii.vids.create({
    id: '999',
    owner: address1,
    title: 'Paratii Test Video',
    ipfsHash: 'QmQP5SJzEBKy1uAGASDfEPqeFJ3HUbEp4eZzxvTLdZZYwB'
  })
}

deployContracts()
  .then(seedVideos)
  .then(fundDistributor)
  .then(() => {
    process.exit(0)
  })
