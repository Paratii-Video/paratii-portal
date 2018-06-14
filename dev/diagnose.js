const { paratii } = require('./paratii.js')

async function main () {
  const diagnosis = await paratii.diagnose()
  console.log(diagnosis)
  process.exit()
}

main().catch(console.error)
