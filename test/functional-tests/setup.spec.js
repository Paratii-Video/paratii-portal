/* @flow */

import { paratii } from './test-utils/helpers'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

declare var browser: Object

chai.use(chaiAsPromised)

before(async function (done) {
  await paratii.eth.deployContracts()
  let registryAddress = paratii.eth.getRegistryAddress()
  console.log(registryAddress)
  browser.execute(function () { window.paratii.setRegistryAddress(registryAddress) })

  browser.addCommand('waitForClickable', function (selector, timeout) {
    this.waitForVisible(selector, timeout)
    this.waitForEnabled(selector, timeout)
  })

  browser.addCommand('waitUntilVideoIsPlaying', () => {
    browser.waitUntil(() => (
      parseInt(browser.getAttribute('#video-player', 'currentTime'), 10) !== 0 &&
      browser.getAttribute('#video-player', 'paused') !== 'true' &&
      browser.getAttribute('#video-player', 'ended') !== 'true'
    ))
  })

  browser.addCommand('waitUntilBuffered', () => {
    browser.waitUntil(() => !!browser.execute(() => {
      const playerEl = document.querySelector('video')
      if (playerEl && playerEl.getAttribute('id') === 'video-player') {
        for (let i = 0; i < playerEl.buffered.length; i += 1) {
          if (playerEl.buffered.end(i) > 0) {
            return true
          }
        }
      }
      return false
    }).value)
  })
  //
  //   browser.addCommand('waitAndSetValue', function (selector, value, timeout) {
  //     this.waitForVisible(selector, timeout)
  //     this.waitForEnabled(selector, timeout)
  //     browser.waitUntil(function () {
  //       try {
  //         browser.setValue(selector, value)
  //         return true
  //       } catch (err) {
  //         if (err.seleniumStack.type === 'InvalidElementState') {
  //           // ignore and try again
  //           return false
  //         } else {
  //           throw err
  //         }
  //       }
  //     }, timeout, `Could not set value on ${selector} (timeout: ${timeout}s)`)
  //   })
  browser.addCommand('waitAndClick', function (selector, timeout) {
    this.waitForVisible(selector, timeout)
    this.waitForEnabled(selector, timeout)
    browser.waitUntil(function () {
      try {
        browser.click(selector)
        return true
      } catch (err) {
        if (err.seleniumStack.type === 'InvalidElementState') {
          // ignore and try again
          return false
        } else if (err.seleniumStack.type === 'UnknownError') {
          // 'another element would receive the click' is reported as an 'unknown error'
          // ignore and try again
          return false
        } else {
          console.log(err)
          throw err
        }
      }
    }, timeout, `Could not click on ${selector} (timeout: ${timeout}s)`)
  })
  //   browser.addCommand('waitUntilRequestHasStatus', function (url, status = 200, method = 'GET', timeout) {
  //     browser.waitUntil(() => {
  //       const request = new XMLHttpRequest()
  //       request.open(method, url, false)
  //       request.send(null)
  //       return request.status === status
  //     }, timeout, `The ${method} request to ${url} never achieved a ${status} status`)
  //   })
  //
  browser.addCommand('waitAndRemove', function (selector, timeout) {
    this.waitForVisible(selector)
    browser.execute((selectorToRemove) => {
      const element = document.querySelector(selectorToRemove)
      if (element) {
        element.remove()
      }
    }, selector)
  })
  //
  //   browser.addCommand('sendSomeETH', async function (beneficiary, amount, timeout) {
  //     // console.log(`send ${amount} to ${beneficiary}`)
  //     await sendSomeETH(beneficiary, amount)
  //     browser.waitUntil(function () {
  //       let result = browser.execute(function () {
  //         return Session.get('eth_balance')
  //       })
  //       return result.value && result.value > 0
  //     }, timeout, `the ETH did not arrive..`)
  //   })
  //
  //   browser.addCommand('sendSomePTI', async function (beneficiary, amount, timeout) {
  //     await sendSomePTI(beneficiary, amount)
  //     browser.waitUntil(function () {
  //       let result = browser.execute(function () {
  //         return Session.get('pti_balance')
  //       })
  //       // console.log(`PTI balance: ${result.value}`)
  //       return result.value && result.value > 0
  //     }, timeout, `the PTI did not arrive..`)
  //   })
  //   browser.url('http://localhost:3000')
  //   browser.contracts = await getOrDeployParatiiContracts(server, browser)
  done()
})
