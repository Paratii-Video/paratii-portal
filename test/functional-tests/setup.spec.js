/* @flow */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { password } from './test-utils/helpers'

declare var browser: Object

chai.use(chaiAsPromised)

before(async function (done) {
  browser.addCommand('createSecureWallet', () => {
    browser.url('http://localhost:8080')
    browser.execute(function (password) {
      window.paratii.eth.wallet.clear()
      window.paratii.eth.wallet
        .createFromMnemonic()
        .then(
          localStorage.setItem(
            'keystore-secure',
            JSON.stringify(window.paratii.eth.wallet.encrypt(password))
          )
        )
    }, password)
  })

  browser.addCommand('waitForClickable', function (selector, timeout) {
    this.waitForVisible(selector, timeout)
    this.waitForEnabled(selector, timeout)
  })

  browser.addCommand('waitUntilBuffered', () => {
    browser.waitUntil(
      () =>
        !!browser.execute(() => {
          const playerEl = document.querySelector('video')
          if (playerEl && playerEl.getAttribute('id') === 'video-player') {
            for (let i = 0; i < playerEl.buffered.length; i += 1) {
              if (playerEl.buffered.end(i) > 0) {
                return true
              }
            }
          }
          return false
        }).value
    )
  })
  //
  browser.addCommand('waitAndSetValue', function (selector, value, timeout) {
    this.waitForVisible(selector, timeout)
    this.waitForEnabled(selector, timeout)
    browser.waitUntil(
      function () {
        try {
          browser.setValue(selector, value)
          return true
        } catch (err) {
          if (err.seleniumStack.type === 'InvalidElementState') {
            // ignore and try again
            return false
          } else {
            throw err
          }
        }
      },
      timeout,
      `Could not set value on ${selector} (timeout: ${timeout}s)`
    )
  })

  browser.addCommand('waitAndClick', function (selector, timeout = 1000) {
    this.waitForVisible(selector, timeout, `${selector} was never visible`)
    this.waitForEnabled(selector, timeout, `${selector} was never enabled`)
    browser.waitUntil(
      function () {
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
      },
      timeout,
      `Could not click on ${selector} in ${timeout}ms`
    )
  })

  browser.addCommand('waitAndRemove', function (selector, timeout) {
    this.waitForVisible(selector)
    browser.execute(selectorToRemove => {
      const element = document.querySelector(selectorToRemove)
      if (element) {
        element.remove()
      }
    }, selector)
  })

  browser.addCommand('login', password => {
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.waitUntil(
      () => !browser.isVisible('[data-test-id="ask-password-modal"]')
    )
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')
    browser.waitUntil(
      () => !browser.isVisible('[data-test-id="ask-password-modal"]')
    )
  })

  done()
})

beforeEach(() => {
  browser.setViewportSize({
    width: 1400,
    height: 800
  })
})
