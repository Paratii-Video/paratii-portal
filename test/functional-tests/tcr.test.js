import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { paratii, address, password } from './test-utils/helpers'
import { ID, TITLE, IPFS_HASH } from './constants/VideoTestConstants'
// declare var browser: Object

chai.use(chaiAsPromised)

describe('TCR:', function () {
  beforeEach(async function () {
    // await paratii.eth.deployContracts()
    browser.url(`http://localhost:8080`)
    // browser.execute(nukeLocalStorage)
    // browser.execute(nukeSessionStorage)
  })

  it('TCR has Paratii-style settings', async function () {
    chai.assert.equal(await paratii.eth.tcr.getApplyStageLen(), 0)
  })

  it('you can challenge a publish video @watch', async function () {
    // Create a secure wallet
    browser.createSecureWallet()
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
    const contract = await paratii.eth.tcr.getTcrContract()
    const hash = await paratii.eth.tcr.getHash(ID)
    await contract.methods.updateStatus(hash).send()
    chai.assert.equal(
      await paratii.eth.tcr.appWasMade(ID),
      true,
      `appWasMade is false`
    )
    chai.assert.equal(await paratii.eth.tcr.getApplyStageLen(), 0)
    chai.assert.equal(await paratii.eth.tcr.isWhitelisted(ID), true)
    await browser.url(`http://localhost:8080/play/${ID}`)
    // Login
    // Click on login and insert the password
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')
  })
})
