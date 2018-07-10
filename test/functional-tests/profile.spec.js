import {
  add0x,
  createUserAndLogin,
  nukeLocalStorage,
  nukeSessionStorage,
  waitForKeystore,
  createKeystore
} from './test-utils/helpers.js'
import { assert } from 'chai'

describe('👤 Profile:', function () {
  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('arriving on a fresh device should create a keystore in localstorage', async function () {
    // check localStorage
    browser.url(`http://localhost:8080`)
    let keystore = waitForKeystore(browser)
    assert.isOk(keystore)
    keystore = JSON.parse(keystore)
    assert.isOk(keystore[0].address)
    // the paratii object in the browser should also know of the address
    const paratiiConfigAddress = (await browser.execute(function () {
      return window.paratii.config.account.address
    })).value
    assert.isOk(paratiiConfigAddress)
    assert.equal(
      paratiiConfigAddress.toLowerCase(),
      add0x(keystore[0].address).toLowerCase()
    )
  })

  it('if there is anonymous wallet, in the header we have a signup button', function () {
    const loginText = browser.getText('[data-test-id="login-signup"]')
    assert.equal(loginText, 'Sign Up / Log In')
  })

  it('if there is secure wallet, in the header we have a login button', function () {
    createKeystore()
    browser.url(`http://localhost:8080`)
    const loginText = browser.getText('[data-test-id="login-signup"]')
    assert.equal(loginText, 'Sign Up / Log In')
  })

  // it.skip('send ether dialog works', function () {
  //   browser.execute(clearUserKeystoreFromLocalStorage)
  //   createUserAndLogin(browser)
  //   browser.execute(function () {
  //     utils = require('/imports/lib/utils.js') // eslint-disable-line no-undef
  //     utils.showModal('doTransaction', { type: 'Eth', label: 'Send Ether' }) // eslint-disable-line no-undef
  //   })
  //   browser.waitForExist('#form-doTransaction')
  // })

  describe('- edit profile', () => {
    it.skip("should render the current profile's information correctly", () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')
      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.click('.edit-profile-info')
      browser.waitForVisible('.modal-profile')

      assert.equal(
        browser.getAttribute('#new-username', 'placeholder'),
        'foobar baz'
      )
      assert.equal(
        browser.getAttribute('#new-email', 'placeholder'),
        'guildenstern@rosencrantz.com'
      )
      assert.equal(
        browser.getAttribute('.current-avatar', 'src'),
        'https://google.com/images/stock.jpg'
      )
    })

    it.skip('should not allow the user to save profile information if no new information is entered', () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')
      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.click('.edit-profile-info')
      browser.waitForVisible('.modal-profile')

      assert.equal(
        browser.getAttribute('#save-profile-info', 'disabled'),
        'true'
      )
    })

    it.skip('should not allow the user to save profile information if only whitespace is entered into the name or email fields', () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')
      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.click('.edit-profile-info')
      browser.waitForVisible('.modal-profile')
      browser.waitAndSetValue('#new-username', '        \n ')

      assert.equal(
        browser.getAttribute('#save-profile-info', 'disabled'),
        'true'
      )

      browser.waitForVisible('.modal-profile')
      browser.waitAndSetValue('#new-email', '       ')

      assert.equal(
        browser.getAttribute('#save-profile-info', 'disabled'),
        'true'
      )
    })

    it.skip('should allow the user to update their name', () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')

      assert.equal(browser.getText('.internals-header-title'), 'foobar baz')

      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.click('.edit-profile-info')
      browser.waitForVisible('.modal-profile')
      browser.waitAndSetValue('#new-username', 'my shiny new name')

      browser.waitForClickable('#save-profile-info')
      browser.click('#save-profile-info')

      browser.waitUntil(() => {
        return (
          browser.getText('.internals-header-title') === 'my shiny new name'
        )
      })
    })

    it.skip('should allow the user to update their email', () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')

      browser.waitForVisible('.profile-user-email')
      assert.equal(
        browser.getText('.profile-user-email'),
        'guildenstern@rosencrantz.com'
      )

      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.waitAndClick('.edit-profile-info')
      browser.waitForVisible('.modal-profile')

      browser.waitAndSetValue('#new-email', 'myGreatEmail@aol.com')

      browser.waitForClickable('#save-profile-info')
      browser.click('#save-profile-info')

      browser.waitUntil(() => {
        return browser.getText('.profile-user-email') === 'myGreatEmail@aol.com'
      })
    })

    it.skip('should not allow the user to update their email if they enter an invalid email', () => {
      createUserAndLogin(browser)
      browser.url('http://localhost:3000/profile')
      browser.waitForClickable('.button-settings')

      browser.waitForVisible('.profile-user-email')
      assert.equal(
        browser.getText('.profile-user-email'),
        'guildenstern@rosencrantz.com'
      )

      browser.click('.button-settings')
      browser.waitForClickable('.edit-profile-info')
      browser.waitAndClick('.edit-profile-info')
      browser.waitForVisible('.modal-profile')

      browser.waitAndSetValue('#new-email', 'fajwefnnnfnann')

      browser.waitForClickable('#save-profile-info')
      browser.click('#save-profile-info')

      browser.waitUntil(() => {
        return browser.getAttribute('#new-email', 'class').indexOf('error') >= 0
      })

      assert.equal(browser.isVisible('.modal-profile'), true)
      browser.waitForVisible('.profile-user-email')
      assert.equal(
        browser.getText('.profile-user-email'),
        'guildenstern@rosencrantz.com'
      )
    })
  })

  describe('- profile redirects', () => {
    // FIXME decide if you want to redirect the user
    it.skip('arriving on profile page without being logged should redirect to home', function () {
      browser.url('http://localhost:8080/profile')
      const url = browser.url()
      browser.pause(1000)
      assert.equal(url.value, 'http://localhost:8080/')
    })
  })
})
