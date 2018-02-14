const http = require('http')

const pingServer = () => {
  const req = http.request(
    {
      hostname: 'localhost',
      port: 8080,
      path: '/',
      method: 'GET'
    },
    res => {
      if (res.statusCode === 200) {
        process.exit(0)
      } else {
        console.error(
          `ERROR: Dev server returned status code of ${res.statusCode}`
        )
        process.exit(1)
      }
    }
  )

  req.on('error', pingServer)
  req.end()
}

pingServer()
