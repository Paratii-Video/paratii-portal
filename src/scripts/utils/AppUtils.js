/* @flow */

import shortNumber from 'short-number'
import VideoRecord from 'records/VideoRecords'

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
      config = require('config/production.json')
      break
    case 'test':
      config = require('config/test.json')
      break
    case 'staging':
      config = require('config/staging.json')
      break
    case 'development':
    default:
      config = require('config/development.json')
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

export function add0x (input) {
  // const input = input.toUpperCase();
  if (typeof input !== 'string') {
    return input
  } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
    return `0x${input}`
  }
  return input
}
