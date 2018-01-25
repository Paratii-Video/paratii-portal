const path = require('path')
const { Paratii } = require('paratii-lib')

const env = process.env.NODE_ENV || 'development'

const configFilename = path.join(__dirname, `/../../config/${env}.json`)

const config = require(configFilename)

const paratii = new Paratii(config)
function diagnose () {
  paratii.diagnose().then(diagnosis => {
    console.log(`Using configuration file ${configFilename}`)
    console.log(diagnosis)
    return diagnosis
  })
}
diagnose()
