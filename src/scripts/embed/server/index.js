const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const videoRoute = require('./routes/video')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('build/embed'))
app.engine('handlebars', expressHandlebars({
  layoutsDir: 'server/views'
}))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.get('/video/:id', videoRoute)

module.exports = () => {
  app.listen(port, () => {
    console.log(`Paratii embed service is listening on http://localhost:${port}`)
  })
}
