import { assert } from 'chai'
import {
  paratii,
  address,
  password,
  getAccountFromBrowser
} from './test-utils/helpers'
import { ID, TITLE, IPFS_HASH } from './constants/VideoTestConstants'
// declare var browser: Object

describe('TCR:', function () {
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

  it('@watch check db integration of the TCR process', async function () {
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
    let updateTx = await paratii.eth.tcr.updateStatus(id)
    assert.isOk(updateTx)
    assert.isOk(updateTx.events._ApplicationWhitelisted)
    let isWhitelisted = await paratii.eth.tcr.isWhitelisted(id)
    assert.isOk(isWhitelisted)
    // the db should know about this
    dbRecord = await paratii.db.vids.get(id)
    assert.equal(dbRecord.tcrStatus.name, 'appWasMade')

    // now challenge the video
    const tx = await paratii.eth.tcr.approveAndStartChallenge(id)
    assert.isOk(tx)
    // challenge should be started
    const challengeId = await paratii.eth.tcr.getChallengeId(id)
    assert.isOk(challengeId)
    const challenge = await paratii.eth.tcr.getChallenge(challengeId)
    assert.isOk(challenge)
    console.log(challenge)
    // challenge should be in db
    dbRecord = await paratii.db.vids.get(id)
    assert.isOk(dbRecord.tcrStatus.data.challenge)
    console.log(dbRecord.tcrStatus.data.challenge)
    //

    const voteValue = 1
    const tx2 = await paratii.eth.tcr.approveAndGetRightsAndCommitVote(
      id,
      voteValue,
      Number(5e18)
    )
    const salt = tx2.salt

    console.log(tx2)
    console.log(`salt: ${salt}`)
    const revealStageLen = await paratii.eth.tcr.getRevealStageLen()
    console.log(`revealStageLen: ${revealStageLen}`)
    let revealPeriodActive = false
    const someAddress = '0xf53ebb252d09250652560db5a15ac22d95f48304'
    while (!revealPeriodActive) {
      await paratii.eth.transfer(someAddress, 1, 'PTI')
      revealPeriodActive = await paratii.eth.tcr.revealPeriodActive(challengeId)
    }
    // reveal the vote
    const tx3 = await paratii.eth.tcr.revealVote(challengeId, voteValue, salt)
    console.log(tx3)

    while (revealPeriodActive) {
      await paratii.eth.transfer(someAddress, 1, 'PTI')
      revealPeriodActive = await paratii.eth.tcr.revealPeriodActive(challengeId)
    }
    const isPassed = await paratii.eth.tcr.isPassed(challengeId)
    assert.isTrue(isPassed)

    // the video should enter the whitelist succesfully because there are 2 votes for and 1 against
    updateTx = await paratii.eth.tcr.updateStatus(id)
    // assert.isOk(updateTx)
    // console.log(updateTx)
    // assert.isOk(updateTx.events._ApplicationWhitelisted)
    // assert.isOk(updateTx.events._ChallengeFailed)

    // the video should be isWhitelisted
    isWhitelisted = await paratii.eth.tcr.isWhitelisted(id)
    assert.isTrue(isWhitelisted)
    // we should now find the votes in the db
    dbRecord = await paratii.db.vids.get(id)
    console.log(dbRecord)
    console.log(dbRecord.tcrStatus.data.challenge)
    const challengeRecord = await paratii.db.tcr.challenges.get(id)
    console.log(challengeRecord)
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
