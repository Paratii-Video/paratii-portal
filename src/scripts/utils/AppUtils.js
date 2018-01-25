/* @flow */

import devConfig from 'config/development.json'
import testConfig from 'config/test.json'
import prodConfig from 'config/production.json'

export const getRoot = (): Element => {
  let root: ?Element = document.getElementById('root')

  if (!root) {
    root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body && document.body.appendChild(root)
  }

  return root
}

export const getParatiiConfig = (env: ?string = 'development'): Object => {
  let config = {}

  switch (env) {
    case 'production':
      config = prodConfig
      break
    case 'test':
      config = testConfig
      break
    case 'development':
    default:
      config = devConfig
      break
  }

  const registryAddress = process.env.REGISTRY_ADDRESS

  if (registryAddress) {
    return {
      ...config,
      registryAddress
    }
  }

  return config
}
