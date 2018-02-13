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

  // If a registry address is not given in the config file, we read it from the environment
  if (config.registryAddress === undefined) {
    const registryAddress = process.env.REGISTRY_ADDRESS

    if (registryAddress) {
      return {
        ...config,
        registryAddress
      }
    }
  }

  return config
}

export const prettyBytes = (num: ?number): number => {
  const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1)
  const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3))
  const unit = UNITS[exponent]

  return numStr + '' + unit
}
