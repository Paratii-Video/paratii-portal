import {
  paratii,
  web3,
  nukeLocalStorage,
  nukeSessionStorage,
  restoreMnemonic,
  restoredAddress,
  password,
  voucherAmount11,
  voucherAmountInitial11,
  createKeystore,
  getAccountFromBrowser
} from './test-utils/helpers.js'
import { assert } from 'chai'

describe('💰 Wallet:', function () {
  let userAccount

  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('If we have a secured wallet in localStorage, we open it with a password', function () {
    createKeystore()
    // Click on login and insert the password
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')
    const balance = browser.getText('[data-test-id="pti-balance"]')
    // We have a new account so the balance should be zero
    assert.equal(balance, '0')
  })

  it('do not open the secure wallet if wrong password', function () {
    const wrongPassword = 'Wrong-p4ssword'
    createKeystore()
    // Click on login and insert the password
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', wrongPassword)
    browser.waitAndClick('[data-test-id="continue"]')
    // Display error message
    browser.waitForExist('[data-test-id="error-password"]')
  })

  it('restore your wallet using a seed', async function () {
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.pause(500)
    browser.waitAndClick('[data-test-id="restore-account"]')
    // Insert the seed
    browser.waitForClickable('[name="mnemonic-restore"]')
    browser.setValue('[name="mnemonic-restore"]', restoreMnemonic)
    browser.waitAndClick('[data-test-id="restore-wallet"]')
    // Insert the password
    browser.waitAndClick('[name="input-new-password"]')
    browser.setValue('[name="input-new-password"]', password)
    browser.waitAndClick('[name="input-confirm-password"]')
    browser.setValue('[name="input-confirm-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')

    // Get address from browser
    const newAddress = browser.execute(function () {
      return window.paratii.eth.getAccount()
    }).value

    browser.waitForClickable('[data-test-id="pti-balance"]')
    const balance = browser.getText('[data-test-id="pti-balance"]')
    // Check the if the address is the restored one
    assert.equal(newAddress, restoredAddress)
    // We have a new account so the balance should be zero
    assert.equal(balance, '0')
  })

  it('do not create a new secure wallet if the password is weak', function () {
    const weakPassword = 'password'
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.pause(500)
    browser.waitAndClick('[data-test-id="restore-account"]')
    // Insert the seed
    browser.waitAndSetValue('[name="mnemonic-restore"]', restoreMnemonic)
    browser.waitAndClick('[data-test-id="restore-wallet"]')
    // Insert the password
    browser.waitAndSetValue('[name="input-new-password"]', weakPassword)
    browser.waitAndSetValue('[name="input-confirm-password"]', weakPassword)
    browser.waitForEnabled('[data-test-id="continue"]')
    browser.waitAndClick('[data-test-id="continue"]')
    // Display error message
    browser.waitForExist('[data-test-id="error-password"]')
  })

  it('secure your wallet, transfer data to a new address @watch', async function (done) {
    const username = 'newuser'
    const email = 'newuser@mail.com'

    browser.url(`http://localhost:8080`)
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })

    const anonAddress = await getAccountFromBrowser()
    // send some money here to test with
    await paratii.eth.transfer(3.14e18, 'PTI')
    const balanceOfAnon = await paratii.eth.balanceOf(anonAddress, 'PTI')
    // const expectedBalance = new BigNumber('3.14e18')
    // assert.equal(balanceOfAnon.toString(), expectedBalance.toString())

    await browser.waitAndClick('[data-test-id="login-signup"]')
    // Click on - new here
    await browser.waitForClickable('[data-test-id="new-here"]')
    await browser.waitAndClick('[data-test-id="new-here"]')
    // Insert the password
    await browser.waitAndSetValue('[name="input-new-password"]', password)
    await browser.waitAndSetValue('[name="input-confirm-password"]', password)
    await browser.waitAndClick('[data-test-id="continue"]')
    // Show seed and click the checkbox
    await browser.waitAndClick('[data-test-id="check-seed"]')
    await browser.waitAndClick('[data-test-id="continue"]')
    // Insert username and email
    await browser.waitAndSetValue('[name="username"]', username)
    await browser.waitAndSetValue('[name="email"]', email)
    // Waiting for the secure keystore
    await browser.waitAndClick('[data-test-id="continue"]', 10000)

    // we have a new account now
    const newAddress = await getAccountFromBrowser()
    // FIXME this newAddress is null!!!!!
    console.log(newAddress)

    assert.notEqual(anonAddress, newAddress)
    assert.equal(
      (await paratii.eth.balanceOf(newAddress, 'PTI')).toString(),
      balanceOfAnon.toString()
    )
    assert.equal(
      (await paratii.eth.balanceOf(anonAddress, 'PTI')).toString(),
      '0'
    )

    // the data of the user should be saved
    const accountInfo = await paratii.users.get(newAddress)
    console.log(accountInfo)
    assert.equal(accountInfo.username, username)
    // send the money back to the original account
    // FIXME: this should be done also if the test fails!
    await browser.execute(function () {
      return paratii.eth.transfer(anonAddress, balanceOfAnon, 'PTI')
    })
    done()
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
    browser.waitAndClick('a[href="#pti"]')
    browser.waitForClickable('#send-pti')
    browser.waitAndClick('#send-pti')
    browser.waitForClickable('[name="wallet_friend_number"]')
    browser.setValue('[name="wallet_friend_number"]', toAddress)
    browser.setValue('[name="wallet_amount"]', '5')
    browser.setValue('[name="tx_description"]', description)
    browser.setValue('[name="user_password"]', 'password')
    browser.waitAndClick('#send_trans_btn')

    // now check if the amount is updated correctly
    browser.waitForExist('#pti_amount')
    // this is the result of 3 - 1.234 ETH - transaction costs
    const expectedAmount = '1407'
    browser.waitUntil(function () {
      return browser.getText('#pti_amount').substr(0, 4) === expectedAmount
    })

    // we should see our transaction description in the transaction history
    browser.waitAndClick('#transaction-history')

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
    browser.waitAndClick('#send-eth')
    browser.waitForClickable('[name="wallet_amount"]')
    browser.setValue('[name="wallet_friend_number"]', web3.eth.accounts[1])
    browser.setValue('[name="wallet_amount"]', '1.234')
    browser.setValue('[name="tx_description"]', description)
    browser.setValue('[name="user_password"]', 'password')
    browser.waitAndClick('#send_trans_btn')

    // now check if the amount is updated correctly
    browser.waitForExist('#eth_amount')
    // this is the result of 3 - 1.234 ETH - transaction costs
    const expectedAmount = '1.76'
    browser.waitUntil(function () {
      return browser.getText('#eth_amount').substr(0, 4) === expectedAmount
    }, 10000)

    // we should see our transaction description in the transaction history
    browser.waitAndClick('#transaction-history')
    browser.waitForExist('.transaction-description')
    assert.equal(browser.getText('.transaction-description'), description)

    done()
  })
})

describe('Voucher:', function () {
  it.skip('redeem a voucher', async function (done) {
    // Generate a random voucher
    const voucherCode11 = Math.random()
      .toString(36)
      .substring(3)
    browser.url(`http://localhost:8080`)
    createKeystore()
    browser.url(`http://localhost:8080/voucher`)
    let vouchers = ''
    let token = ''
    paratii.eth
      .getContract('Vouchers')
      .then(function (results) {
        vouchers = results
      })
      .then(
        paratii.eth
          .getContract('ParatiiToken')
          .then(function (results) {
            token = results
            token.methods
              .transfer(vouchers.options.address, voucherAmountInitial11)
              .send()
          })
          .then(
            paratii.eth.vouchers.create({
              voucherCode: voucherCode11,
              amount: voucherAmount11
            })
          )
      )

    browser.waitForExist('[name="voucher-code"]')
    browser.setValue('[name="voucher-code"]', voucherCode11)
    // Insert the password
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')
    // Reinsert the voucher
    browser.setValue('[name="voucher-code"]', voucherCode11)
    browser.waitAndClick('[data-test-id="redeem-voucher"]')
    // We need to wait the voucher be redeem
    browser.pause(2000)
    // Then we check the balance
    const balance = browser.getText('[data-test-id="pti-balance"]')
    assert.equal(paratii.eth.web3.utils.toWei(balance), voucherAmount11)
    done()
  })
})
