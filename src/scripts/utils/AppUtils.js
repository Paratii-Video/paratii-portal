/* @flow */

import shortNumber from 'short-number'
import VideoRecord from 'records/VideoRecords'

export const getPasswordValidationErrors = (
  password: ?string
): Array<string> => {
  const longRegex = new RegExp('^(?=.{8,})')
  const numberRegex = new RegExp('^(?=.*[0-9])')
  const uppercaseRegex = new RegExp('^(?=.*[A-Z])')
  const errors = []
  if (password) {
    if (!longRegex.test(password)) {
      errors.push('The password must be eight characters or longer')
    }
    if (!numberRegex.test(password)) {
      errors.push('The password must contain at least 1 numeric character')
    }
    if (!uppercaseRegex.test(password)) {
      errors.push(
        'The password must contain at least 1 uppercase alphabetical character'
      )
    }
  }
  return errors
}

export const getRoot = (): Element => {
  let root: ?Element = document.getElementById('root')

  if (!root) {
    root = document.createElement('div')
    root.setAttribute('id', 'root')
    document.body && document.body.appendChild(root)
  }

  return root
}

export const getAppRootUrl = (env: ?string = 'development'): string => {
  switch (env) {
    case 'production':
      return 'https://portal.paratii.video'
    case 'test':
      return 'https://staging.paratii.video'
    case 'staging':
      return 'https://staging.paratii.video'
    case 'development':
    default:
      return 'http://localhost:8080'
  }
}

export const getParatiiConfig = (env: ?string, scope: ?string): Object => {
  let config = {}

  function needsScope (scope: ?string) {
    if (scope !== 'client' && scope !== 'server') {
      throw Error(
        `"scope" should be either "client" or "server" (not ${scope})`
      )
    }
  }
  const configlocation = '../../../config'
  let filename
  switch (env) {
    case 'production':
      needsScope(scope)
      filename = `${configlocation}/production-${scope}.json`
      config = require(filename)
      break
    case 'test':
      filename = `${configlocation}/test.json`
      config = require(filename)
      break
    case 'staging':
      needsScope(scope)
      filename = `${configlocation}/staging-${scope}.json`
      config = require(filename)
      break
    case 'development':
    default:
      filename = `${configlocation}/development.json`
      config = require(filename)
      break
  }

  // If a registry address is not given in the config file, we read it from the environment
  if (config.eth.registryAddress === undefined) {
    const registryAddress = process.env.REGISTRY_ADDRESS
    if (registryAddress) {
      config.eth.registryAddress = registryAddress
      return config
    }
  }

  return config
}

export const prettyBytes = (num: ?number): string => {
  if (num === null || num === undefined || num === 0 || isNaN(num)) {
    return ''
  }
  const UNITS = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const exponent = Math.min(Math.floor(Math.log10(num) / 3), UNITS.length - 1)
  const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3))
  const unit = UNITS[exponent]

  return numStr + '' + unit
}

export function humanReadableStatus (video: VideoRecord, type: string) {
  let statusMessage
  switch (type) {
    case 'main':
      if (video.storageStatus.name !== 'success') {
        statusMessage = 'Please provide a title and description'
      } else if (video.transcodingStatus.name === 'success') {
        statusMessage = 'Your video is ready to play'
      } else if (video.transcodingStatus.name === 'failed') {
        statusMessage = 'Your video could not be transcoded'
      } else if (!video.filename) {
        statusMessage = 'No file was uploaded (this is an error)'
      }
      break
    case 'transcoding':
      break
    case 'upload':
      break
    case 'storage':
      break
    default:
      break
  }
  return statusMessage
}

export const formatBalance = (rawBalance: number): string => {
  if (rawBalance < 1e19) {
    return shortNumber(rawBalance)
  }

  return `${rawBalance.toExponential(2)}`
}

export const requestCancelFullscreen = (): void => {
  if (document.exitFullscreen) {
    // $FlowFixMe
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    // $FlowFixMe
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    // $FlowFixMe
    document.webkitExitFullscreen()
  }
}

export const requestFullscreen = (element: HTMLElement): void => {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    // $FlowFixMe
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    // $FlowFixMe
    element.webkitRequestFullscreen()
  }
}

export function add0x (input: string) {
  // const input = input.toUpperCase();
  if (typeof input !== 'string') {
    return input
  } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
    return `0x${input}`
  }
  return input
}

export const getFullscreenEnabled = () =>
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  // $FlowFixMe
  document.msFullscreenEnabled

export const copyTextToClipboard = (element: HTMLElement): void => {
  const { body } = document

  if (body) {
    const dummyInput: HTMLInputElement = document.createElement('input')
    dummyInput.setAttribute('style', 'height: 0;')
    dummyInput.setAttribute('value', element.innerText)

    body.appendChild(dummyInput)

    dummyInput.select()

    document.execCommand('copy')

    body.removeChild(dummyInput)
  }
}
