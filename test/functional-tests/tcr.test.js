import { assert } from 'chai'
import {
  paratii,
  address,
  password,
  getAccountFromBrowser
} from './test-utils/helpers'
import { ID, TITLE, IPFS_HASH } from './constants/VideoTestConstants'
// declare var browser: Object

describe('TCR: @watch', function () {
  beforeEach(async function () {
    // await paratii.eth.deployContracts()
    // browser.url(`http://localhost:8080`)
    // const registryAddress = await paratii.eth.getRegistryAddress()
    // browser.execute(function (registryAddress) {
    //   paratii.eth.setRegistryAddresss(registryAddress)
    // }, registryAddress)
    // browser.execute(nukeLocalStorage)
    // browser.execute(nukeSessionStorage)
  })

  it('TCR has Paratii-style settings', async function () {
    assert.equal(await paratii.eth.tcr.getApplyStageLen(), 0)
  })

  it('you can challenge a published video', async function () {
    // Create a secure wallet
    await browser.createSecureWallet()

    // Create a publish video
    await paratii.vids.create({
      id: ID,
      owner: address,
      title: TITLE,
      ipfsHash: IPFS_HASH
    })

    const stakeAmount = 5
    const stakeAmountWei = paratii.eth.web3.utils.toWei(String(stakeAmount))
    // Publish the video
    await paratii.eth.tcr.checkEligiblityAndApply(ID, stakeAmountWei)

    // FIXME this must be move inside checkEligiblityAndApply
    const contract = await paratii.eth.tcr.getTcrContract()
    const hash = await paratii.eth.tcr.getHash(ID)
    await contract.methods.updateStatus(hash).send()
    //

    assert.equal(
      await paratii.eth.tcr.appWasMade(ID),
      true,
      `appWasMade is false`
    )
    assert.equal(await paratii.eth.tcr.getApplyStageLen(), 0)
    assert.equal(await paratii.eth.tcr.isWhitelisted(ID), true)
    await browser.url(`http://localhost:8080/play/${ID}`)
    // Login
    // Click on login and insert the password
    await browser.waitAndClick('[data-test-id="login-signup"]', 5000)
    await browser.waitAndClick('[name="wallet-password"]', 5000)
    await browser.setValue('[name="wallet-password"]', password)
    await browser.waitAndClick('[data-test-id="continue"]')

    let userAddress
    await browser.waitUntil(async function () {
      userAddress = await getAccountFromBrowser()
      return userAddress !== address
    })

    const value = paratii.eth.web3.utils.toWei('100')
    await paratii.eth.transfer(userAddress, value, 'PTI')
  })
})