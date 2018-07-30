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

  it('check db integration of the TCR process', async function () {
    // TODO: these tests should be in paratii-db
    let dbRecord
    const id = Math.random()
      .toString(36)
      .substring(3)
    const stakeAmount = 5
    const stakeAmountWei = paratii.eth.web3.utils.toWei(String(stakeAmount))
    await paratii.vids.create({ id, owner: paratii.getAccount() })
    while (!dbRecord) {
      dbRecord = await paratii.db.vids.get(id)
    }
    assert.equal(dbRecord.tcrStatus.name, 'notInTcr')

    const result = await paratii.eth.tcr.checkEligiblityAndApply(
      id,
      stakeAmountWei
    )
    assert.isTrue(result)

    dbRecord = await paratii.db.vids.get(id)
    assert.equal(dbRecord.tcrStatus.name, 'appWasMade')
    const appWasMade = await paratii.eth.tcr.appWasMade(id)
    assert.isTrue(appWasMade)
    let canBeWhitelisted = await paratii.eth.tcr.canBeWhitelisted(id)
    // the vid cannot be whitelisted immediately even if applystagelen is 0
    assert.isFalse(canBeWhitelisted)
    // we must add a transaction - the video is _not_ whitelisted immediately
    await paratii.eth.transfer(
      '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
      1,
      'PTI'
    )
    canBeWhitelisted = await paratii.eth.tcr.canBeWhitelisted(id)
    assert.isTrue(
      canBeWhitelisted,
      'expected that this video to be whitelisted!'
    )

    // the video should enter the whitelist succesfully
    const updateTx = await paratii.eth.tcr.updateStatus(id)
    assert.isOk(updateTx)
    assert.isOk(updateTx.events._ApplicationWhitelisted)
    const isWhitelisted = await paratii.eth.tcr.isWhitelisted(id)
    assert.isOk(isWhitelisted)
    // the db should know about this
    dbRecord = await paratii.db.vids.get(id)
    assert.equal(dbRecord.tcrStatus.name, 'appWasMade')
  })

  it('@watch you can challenge a published video', async function () {
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

    assert.equal(
      await paratii.eth.tcr.appWasMade(ID),
      true,
      `appWasMade was excpected to be true`
    )

    assert.equal(await paratii.eth.tcr.isWhitelisted(ID), true)
    await browser.url(`http://localhost:8080/play/${ID}`)

    // Login (trying to challenge asks the user to log in)
    await browser.waitAndClick('[data-test-id="button-challenge"]')
    await browser.waitAndSetValue('[name="wallet-password"]', password)
    await browser.waitAndClick('[data-test-id="continue"]')

    // get some PTI so we can do the challenge
    let userAddress
    await browser.waitUntil(async function () {
      userAddress = await getAccountFromBrowser()
      return userAddress !== address
    })

    const value = paratii.eth.web3.utils.toWei('100')
    await paratii.eth.transfer(userAddress, value, 'PTI')

    // now do the actual challenge
    await browser.waitAndClick('[data-test-id="button-challenge"]')
    // now click on 'challenge in the modal box:
    await browser.waitAndClick('[data-test-id="modal-button-challenge"]', 5000)

    // oppose the video [this one is hidden!]
    await browser.waitAndClick('[data-test-id="button-vote-2"]', 5000)
    // this shouldo open a confirmation modal, we click the button
    await browser.waitAndClick('[data-test-id="button-confirm-vote"]', 5000)
    // we should now be able to see
    console.log('Vote has been submitted')
    // we should now see the card where the user is told that his vote has been committed
    await browser.waitForVisible('[data-test-id="VoteCommitted.title"]')

    // we need to wait 10 seconds for the commit period to end and the reveal period to start
    // (this is changed in development.json)
    await browser.waitForVisible(
      '[data-test-id="RevealYourVote.button"]',
      10000
    )

    console.log('we now reveal the vote')
    // we add a dummy transaction
    // FIXME: this should be handled by paratii-js
    browser.pause(1000)
    await paratii.eth.transfer(userAddress, 1, 'PTI')
    await paratii.eth.transfer(userAddress, 1, 'PTI')
    await browser.waitAndClick('[data-test-id="RevealYourVote.button"]', 10000)

    console.log('success')
  })
})
