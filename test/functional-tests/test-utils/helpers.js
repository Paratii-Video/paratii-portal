import { Paratii } from 'paratii-js'
import testConfig from '../../../config/test.json'

const fs = require('fs')
const path = require('path')
const pull = require('pull-stream')
const toPull = require('stream-to-pull-stream')

const registryConfigPath = '/tmp/registry.json'
let registryAddressConfig = {}

if (fs.existsSync(path.resolve(__dirname, registryConfigPath))) {
  const registryConfigPath = '/tmp/registry.json'
  registryAddressConfig = JSON.parse(
    fs.readFileSync(registryConfigPath, 'utf8')
  )
}

export const DEFAULT_PASSWORD = ''
export const WALLET_KEY_ANON = 'keystore-anon'
export const MNEMONIC_KEY_ANON = 'mnemonic-anon'
export const WALLET_KEY_SECURE = 'keystore-secure'
export const password = 'N3wpassword'

// this address will be used as the owner address for all paratii contracts in the tests
const address = '0xCbe4f07b343171ac37055B25a5266f48f6945b7d'
const privateKey =
  '0x399b141d0cc2b863b2f514ffe53edc6afc9416d5899da4d9bd2350074c38f1c6'

// some other addresses and keys used in testing
const address1 = '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'
const address99 = '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'
const address17 = '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
const privateKey17 =
  '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709'

// an address generated from a seed phrase
const mnemonic23 =
  'jelly better achieve collect unaware mountain thought cargo oxygen act hood bridge'
// this is the first HD address generated
const address23 = '0xCbe4f07b343171ac37055B25a5266f48f6945b7d'

export const restoreMnemonic =
  'design under day valve eagle exact night maid circle hammer polar ramp'
export const restoredAddress = '0x500B678cAC6BEB4092662437698Daa49c5d2E267'

export {
  address,
  address1,
  address99,
  privateKey,
  address17,
  privateKey17,
  mnemonic23,
  address23
}

export const SEED =
  'road inherit leave arm unlock estate option merge mechanic rate blade dumb'
export const USERADDRESS = '0xdef933d2d0203821af2a1579d77fb42b4f8dcf7b'

testConfig.eth.registryAddress = registryAddressConfig.registryAddress

export const paratii = new Paratii({
  ...testConfig
})

export const getPath = path => {
  return `http://localhost:8080/${path}`
}

export const clearCookies = () => {
  browser.deleteCookie('email')
}

// // The beforeEach function is run before each single test
// beforeEach(function () {
//   browser.execute(nukeLocalStorage)
//   browser.execute(nukeSessionStorage)
// })

export function nukeLocalStorage () {
  localStorage.clear()
}

export function nukeSessionStorage () {
  window.sessionStorage.clear()
}

export function add0x (input) {
  if (typeof input !== 'string') {
    return input
  } else if (input.length < 2 || input.slice(0, 2) !== '0x') {
    return `0x${input}`
  }
  return input
}

// a voucher code and an amount
export const voucherCode11 = 'ZJLUaMqLR1'
export const voucherAmount11 = 5 * 10 ** 18
export const voucherAmountInitial11 = 100 * 10 ** 18
export const hashedVoucherCode11 =
  '0x182b41b125c1c14efaf188d95b6a7e2074d8b746237fc47b48beb63551d742f9'

export async function getAccountFromBrowser () {
  const result = await browser.execute(function () {
    return paratii.getAccount()
  })
  return result.value
}

// TODO: This function does not reliably return the keystore
export function waitForKeystore (browser, key = 'keystore-anon') {
  browser.waitUntil(function () {
    return browser.execute(function (key) {
      return localStorage.getItem(key)
    }, key).value
  })
  return browser.execute(function (key) {
    return localStorage.getItem(key)
  }, key).value
}

export function createKeystore (userpassword = password) {
  browser.execute(function (userpassword) {
    window.paratii.eth.wallet.clear()
    window.paratii.eth.wallet
      .createFromMnemonic()
      .then(
        localStorage.setItem(
          'keystore-secure',
          JSON.stringify(window.paratii.eth.wallet.encrypt(userpassword))
        )
      )
  }, userpassword)
}
//
export function clearUserKeystoreFromLocalStorage () {
  localStorage.removeItem(`keystore-secure`)
}

// next line copied from old uploader as a quick workaround to get thetests workign
export function uploadFilesToIPFS (ipfs, files) {
  const meta = {} // holds File metadata.
  // let files = [file]

  const _chunkSize = 262144
  const node = ipfs
  ipfs.start(() => {
    pull(
      pull.values(files),
      pull.through(file => {
        meta.fileSize = file.size
        meta.total = 0
      }),
      pull.asyncMap((file, cb) =>
        pull(
          pull.values([
            {
              path: file.name,
              // content: pullFilereader(file)
              content: pull(
                toPull(fs.createReadStream(file)) // file here is a path to file.
                // pull.through((chunk) => console.log(chunk.length, Math.floor((meta.total + chunk.length) / meta.fileSize) * 100))
              )
            }
          ]),
          node.files.addPullStream({
            chunkerOptions: { maxChunkSize: _chunkSize }
          }), // default size 262144
          pull.collect((err, res) => {
            if (err) {
              console.log(err)
            }
            // const file = res[0]
            // console.log('Adding %s finished', file.name)
            setImmediate(() => {
              cb()
            })
          })
        )
      ),
      pull.collect((err, files) => {
        if (err) {
          console.log(err)
        }
      })
    )
  })
}
