const Fixtures = require('node-mongodb-fixtures')
const uri = 'mongodb://127.0.0.1:27017/test'

const fixtures = new Fixtures({
  dir: './test/functional-tests/data/fixtures'
})

fixtures
  .connect(uri)
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .catch(e => console.error(e))
  .finally(() => fixtures.disconnect())
