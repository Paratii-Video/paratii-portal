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
  switch (env) {
    case 'production':
      return prodConfig
    case 'test':
      return testConfig
    case 'development':
    default:
      return devConfig
  }
}
