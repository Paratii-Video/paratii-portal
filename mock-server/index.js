'use strict'

const express = require('express')
const fs = require('fs')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

app.get('*', (req, res) => {
  try {
    const fileContents = fs.readFileSync(
      path.resolve(__dirname, `./routes/${req.originalUrl}`),
      'utf8'
    )
    res.json(JSON.parse(fileContents))
  } catch (e) {
    res.json(null)
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Mock server for testing is listening on port ${PORT}!`)
})
