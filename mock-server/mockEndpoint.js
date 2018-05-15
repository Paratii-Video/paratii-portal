const fs = require('fs')
const path = require('path')
const shell = require('shelljs')

const rootServerDir = path.resolve(__dirname, './routes')

const mockEndpoint = ({ endpoint = '', response = '' }) => {
  if (!endpoint) {
    return ''
  }

  const splitPath = endpoint.split('/').slice(1)

  const directories = splitPath.slice(0, splitPath.length - 1)
  const fileName = splitPath[splitPath.length - 1]
  const dirPath = `${rootServerDir}/${directories.join('/')}`
  shell.mkdir('-p', dirPath)

  const filePath = `${dirPath}/${fileName}`
  shell.touch(filePath)

  fs.writeFileSync(filePath, JSON.stringify(response))
}

module.exports = mockEndpoint
