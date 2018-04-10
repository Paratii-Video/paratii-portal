import {
  paratii,
  web3,
  nukeLocalStorage,
  nukeSessionStorage,
  restoreMnemonic,
  restoredAddress
} from './test-utils/helpers.js'
import { assert } from 'chai'

describe('wallet:', function () {
  let userAccount

  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('If we have a secured wallet in localStorage, we open it with a Pin', function () {
    browser.url(`http://localhost:8080`)
    browser.execute(function () {
      const password = '1234'
      window.paratii.eth.wallet.clear()
      window.paratii.eth.wallet
        .create()
        .then(
          localStorage.setItem(
            'keystore-secure',
            JSON.stringify(window.paratii.eth.wallet.encrypt(password))
          )
        )
    })
    browser.url(`http://localhost:8080/wallet`)
    // Set pin number: 1234
    browser.waitAndClick('[data-test-id="button-1"]')
    browser.waitAndClick('[data-test-id="button-2"]')
    browser.waitAndClick('[data-test-id="button-3"]')
    browser.waitAndClick('[data-test-id="button-4"]')
    browser.waitAndClick('[data-test-id="pin-continue"]')
    const balance = browser.getText('[data-test-id="pti-balance"]')
    // We have a new account so the balance should be zero
    assert.equal(balance, '0')
  })

  // it('If there is an anonymous wallet in localStorage we open it', function () {
  //   const balance = browser.getText('[data-test-id="pti-balance"]')
  //   // We check the default address balance
  //   assert.equal(balance, '21M')
  // })

  // FIXME: temporarily disabled in production
  it.skip('restore your wallet using a seed', async function () {
    browser.url(`http://localhost:8080/wallet`)
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })
    browser.waitForClickable('[data-test-id="pti-balance"]')
    browser.waitAndClick('[data-test-id="secure-wallet"]')
    browser.pause(500)
    browser.waitAndClick('[data-test-id="restore-account"]')
    // Insert the seed
    browser.waitForClickable('[name="mnemonic-restore"]')
    browser.setValue('[name="mnemonic-restore"]', restoreMnemonic)
    browser.waitAndClick('[data-test-id="restore-wallet"]')
    // Set pin number: 1234
    browser.waitAndClick('[data-test-id="button-1"]')
    browser.waitAndClick('[data-test-id="button-2"]')
    browser.waitAndClick('[data-test-id="button-3"]')
    browser.waitAndClick('[data-test-id="button-4"]')
    browser.waitAndClick('[data-test-id="pin-continue"]')
    // Re-enter the same pin number: 1234
    browser.waitAndClick('[data-test-id="button-1"]')
    browser.waitAndClick('[data-test-id="button-2"]')
    browser.waitAndClick('[data-test-id="button-3"]')
    browser.waitAndClick('[data-test-id="button-4"]')
    browser.waitAndClick('[data-test-id="pin-continue"]')
    browser.waitForClickable('[data-test-id="user-address"]')
    const newAddress = browser.getText('[data-test-id="user-address"]')
    browser.waitForClickable('[data-test-id="pti-balance"]')
    const balance = browser.getText('[data-test-id="pti-balance"]')
    // Check the if the address is the restored one
    assert.equal(newAddress, restoredAddress)
    // We have a new account so the balance should be zero
    assert.equal(balance, '0')
  })

  // FIXME: temporarily disabled in production
  it.skip('secure your wallet, transfer data to a new address', async function () {
    browser.url(`http://localhost:8080/wallet`)
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })
    browser.waitForClickable('[data-test-id="user-address"]')
    const anonAddress = browser.getText('[data-test-id="user-address"]')
    browser.waitForClickable('[data-test-id="pti-balance"]')
    const balance = browser.getText('[data-test-id="pti-balance"]')
    browser.waitAndClick('[data-test-id="secure-wallet"]')
    browser.pause(500)
    browser.waitAndClick('[data-test-id="new-here"]')
    browser.waitForClickable('[data-test-id="new-mnemonic"]')
    const newMnemonic = browser.getText('[data-test-id="new-mnemonic"]')
    browser.waitAndClick('[data-test-id="rewrite-seed"]')
    browser.waitForClickable('[name="rewrite-mnemonic"]')
    browser.setValue('[name="rewrite-mnemonic"]', newMnemonic)
    browser.waitAndClick('[data-test-id="check-seed"]')
    // // Set pin number: 1234
    browser.waitAndClick('[data-test-id="button-1"]')
    browser.waitAndClick('[data-test-id="button-2"]')
    browser.waitAndClick('[data-test-id="button-3"]')
    browser.waitAndClick('[data-test-id="button-4"]')
    browser.waitAndClick('[data-test-id="pin-continue"]')
    // Re-enter the same pin number: 1234
    browser.waitAndClick('[data-test-id="button-1"]')
    browser.waitAndClick('[data-test-id="button-2"]')
    browser.waitAndClick('[data-test-id="button-3"]')
    browser.waitAndClick('[data-test-id="button-4"]')
    browser.waitAndClick('[data-test-id="pin-continue"]')
    const newBalance = browser.getText('[data-test-id="pti-balance"]')
    // Check the if the restoredAddress is different than the anonAddress
    assert.notEqual(anonAddress, restoredAddress)
    // We have a new account so the balance should be zero
    assert.equal(balance, newBalance)
    // After the test we resend the money back to the default address
    // await paratii.eth.transfer(anonAddress, 21000000000000000000000000, 'PTI')
    await paratii.core.migrateAccount(anonAddress)
  })

  it.skip('should show ETH balance', function () {
    browser.sendSomeETH(userAccount, 3.1)
    browser.waitForVisible(
      '.profile-wallet-item:last-child .profile-wallet-item-balance'
    )
    browser.waitUntil(() => {
      const amount = browser.getText(
        '.profile-wallet-item:last-child .profile-wallet-item-balance'
      )
      return ['3.10 ETH', '3,10 ETH'].indexOf(amount) > -1
    })
  })

  it.skip('should show PTI balance', function () {
    browser.sendSomePTI(userAccount, 1412.9599)
    browser.waitForVisible(
      '.profile-wallet-item:first-child .profile-wallet-item-balance'
    )
    browser.waitUntil(() => {
      const amount = browser.getText(
        '.profile-wallet-item:first-child .profile-wallet-item-balance'
      )
      return ['1,412.96 PTI', '1.412,96 PTI'].indexOf(amount) > -1
    })
  })

  it.skip('should be able to send some PTI, update the balance and transaction history', function (done) {
    browser.sendSomeETH(userAccount, 1)
    const description = 'Here is some PTI for you'
    const toAddress = web3.eth.accounts[2]
    browser.sendSomePTI(userAccount, 1412)
    // open the send PTI dialog
    browser.click('a[href="#pti"]')
    browser.waitForClickable('#send-pti')
    browser.click('#send-pti')
    browser.waitForClickable('[name="wallet_friend_number"]')
    browser.setValue('[name="wallet_friend_number"]', toAddress)
    browser.setValue('[name="wallet_amount"]', '5')
    browser.setValue('[name="tx_description"]', description)
    browser.setValue('[name="user_password"]', 'password')
    browser.click('#send_trans_btn')

    // now check if the amount is updated correctly
    browser.waitForExist('#pti_amount')
    // this is the result of 3 - 1.234 ETH - transaction costs
    const expectedAmount = '1407'
    browser.waitUntil(function () {
      return browser.getText('#pti_amount').substr(0, 4) === expectedAmount
    })

    // we should see our transaction description in the transaction history
    browser.click('#transaction-history')

    browser.waitForClickable('.transaction-to')
    browser.waitUntil(function () {
      return browser.getText('.transaction-to')[0] === toAddress
    })

    // TODO: do the PTI transactions via a custom contact that logs the description, so we can get the description from there
    // browser.waitForExist('.transaction-description', 5000)
    // assert.equal(browser.getText('.transaction-description'), description)

    done()
  })

  it.skip('should be able to send some ETH, update the balance and transaction history', function (done) {
    const description = 'Here is some ETH for you'
    browser.waitForExist('#public_address')
    browser.sendSomeEth(userAccount, 3)
    browser.waitForExist('#eth_amount')
    // open the send ETH dialog
    browser.waitForClickable('#send-eth')
    browser.click('#send-eth')
    browser.waitForClickable('[name="wallet_amount"]')
    browser.setValue('[name="wallet_friend_number"]', web3.eth.accounts[1])
    browser.setValue('[name="wallet_amount"]', '1.234')
    browser.setValue('[name="tx_description"]', description)
    browser.setValue('[name="user_password"]', 'password')
    browser.click('#send_trans_btn')

    // now check if the amount is updated correctly
    browser.waitForExist('#eth_amount')
    // this is the result of 3 - 1.234 ETH - transaction costs
    const expectedAmount = '1.76'
    browser.waitUntil(function () {
      return browser.getText('#eth_amount').substr(0, 4) === expectedAmount
    }, 10000)

    // we should see our transaction description in the transaction history
    browser.click('#transaction-history')
    browser.waitForExist('.transaction-description')
    assert.equal(browser.getText('.transaction-description'), description)

    done()
  })
})
