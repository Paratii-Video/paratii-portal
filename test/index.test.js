var Enzyme = require('enzyme')
var Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

var testsContext = require.context('.', true, /.test.js$/)
testsContext.keys().forEach(testsContext)
