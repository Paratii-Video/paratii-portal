const { paratii } = require('./paratii.js')

async function main () {
  const diagnosis = await paratii.diagnose()
  console.log(diagnosis)
  const serviceStatus = await paratii.checkServices()
  console.log(serviceStatus)
  process.exit()
}

main().catch(console.error)
