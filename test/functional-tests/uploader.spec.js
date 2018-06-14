import { assert } from 'chai'
import {
  paratii,
  password,
  nukeLocalStorage,
  nukeSessionStorage
} from './test-utils/helpers'

describe('🦄 Uploader Tool @watch', function () {
  this.timeout(120000)

  const uploadFileInputSelector =
    'input[type="file"][data-test-id="upload-file-input"]'
  const modalCloseButtonSelector = '[data-test-id="modal-close-button"]'
  const forgotPasswordButtonSelector = '[data-test-id="forgot-password-button"]'

  before(function () {
    browser.addCommand('verifyUploadSucceeds', async video => {
      browser.waitAndClick('[data-test-id="uploader-item"]', 5000)

      // now we should see a form to fill in
      // the form should contain the id of our video
      browser.waitForVisible('[data-test-id="uploader-item"]')
      browser.waitAndClick('[data-test-id="uploader-item"]')
      browser.waitForExist('[data-test-id="video-id"]')
      const getVideoId = function () {
        var videoId = browser.getValue('[data-test-id="video-id"]')
        if (videoId) {
          return videoId
        } else {
          return false
        }
      }
      browser.waitUntil(getVideoId)
      const videoId = getVideoId()
      assert.isOk(videoId)
      assert.isOk(videoId.length > 8)
      // set title and video in the form
      browser.setValue('#input-video-title-' + videoId, video.title)
      browser.setValue('#input-video-description-' + videoId, video.description)
      browser.setValue(
        '#input-video-ownership-proof-' + videoId,
        video.ownershipProof
      )
      // submit the form
      browser.waitAndClick('[data-test-id="video-submit-save"]')
      // we now should be on the status screen

      // wait until the video is saved on the blockchain
      const getVideoInfoFromBlockchain = async function () {
        try {
          const videoInfoFromBlockchain = await paratii.eth.vids.get(videoId)
          return videoInfoFromBlockchain
        } catch (err) {
          throw err
          // console.log(err)
        }
      }
      browser.waitUntil(getVideoInfoFromBlockchain)
      // Check if video title has been saved
      browser.waitUntil(() => {
        return browser.getValue('#input-video-title-' + videoId) === video.title
      })
      const address = browser.execute(() => window.paratii.eth.getAccount())
        .value
      const videoInfoFromBlockchain = await getVideoInfoFromBlockchain()
      assert.isOk(videoInfoFromBlockchain)
      assert.equal(videoInfoFromBlockchain.owner, address)
      browser.waitUntil(
        () =>
          browser.execute(
            owner => window.paratii.getAccount() === owner,
            videoInfoFromBlockchain.owner
          ).value
      )

      // when the transcoder is done, we should be ready to publish the video
      browser.waitAndClick(`[data-test-id="video-submit-publish"]`)
      browser.pause(500)
      browser.waitAndClick(`[data-test-id="button-stake"]`)
      browser.waitAndClick(`a[href="/play/${videoId}"]`)
      browser.url('http://localhost:8080')
      browser.alertAccept()
    })
  })

  afterEach(function () {
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('should only allow mp4 files', () => {
    browser.url('http://localhost:8080/upload')
    browser.isVisible(uploadFileInputSelector)
    expect(browser.getAttribute(uploadFileInputSelector, 'accept')).to.equal(
      'video/mp4'
    )
  })

  it('should upload a video when the wallet is already secured', async function () {
    browser.createSecureWallet()

    // Get address from browser
    const newAddress = browser.execute(function () {
      return window.paratii.eth.getAccount()
    }).value

    // Send some PTI to new address
    const value = paratii.eth.web3.utils.toWei('20')
    paratii.eth.transfer(newAddress, value, 'PTI')

    const video = {
      title: 'Some title',
      description:
        'Description of the video which can be pretty long and may contain dïàcrítics',
      ownershipProof: 'this is my video'
    }

    browser.url('http://localhost:8080/upload')
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')

    // Upload file
    const fileToUpload = `${__dirname}/data/pti-logo.mp4`
    browser.waitUntil(
      () =>
        browser.execute(() => !!localStorage.getItem('keystore-secure')).value
    )
    browser.pause(1000)
    browser.chooseFile(uploadFileInputSelector, fileToUpload)

    browser.verifyUploadSucceeds(video)
  })

  it('should redirect to the homepage if there is a wallet but the secure flow is canceled on the "ask for password" modal', async function () {
    browser.createSecureWallet()

    browser.url('http://localhost:8080/upload')
    browser.waitAndClick(modalCloseButtonSelector)

    browser.waitUntil(
      () =>
        browser.execute(() => window.location.href === 'http://localhost:8080/')
          .value
    )
  })

  it('should redirect to the homepage if there is a wallet but the secure flow is canceled on the "account recovery" modal', async function () {
    browser.createSecureWallet()

    browser.url('http://localhost:8080/upload')
    browser.waitAndClick(forgotPasswordButtonSelector)
    browser.waitAndClick(modalCloseButtonSelector)

    browser.waitUntil(
      () =>
        browser.execute(() => window.location.href === 'http://localhost:8080/')
          .value
    )
  })

  it('should redirect to the homepage if the secure flow is canceled on the secure account modal and there is no wallet', async function () {
    browser.url('http://localhost:8080/upload')
    browser.waitAndClick(modalCloseButtonSelector)

    browser.waitUntil(
      () =>
        browser.execute(() => window.location.href === 'http://localhost:8080/')
          .value
    )
  })

  it.skip('cancel upload should work [but is not yet]', function () {
    // start uploading a file
    browser.url('http://localhost:8080/uploader/upload-file')
    const fileToUpload = `${__dirname}/data/data.txt`
    browser.chooseFile(uploadFileInputSelector, fileToUpload)
    browser.click('#upload-submit')
    // (the file is small so is immediately done uploading, but the cancel button should be avaiblabel in any case)
    browser.waitForExist('#cancel-upload')
  })
})
