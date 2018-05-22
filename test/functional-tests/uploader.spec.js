import { assert } from 'chai'
import {
  paratii,
  password,
  nukeLocalStorage,
  nukeSessionStorage
} from './test-utils/helpers'

describe('🦄 Uploader Tool @watch', function () {
  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('should have basic flow in place', async function () {
    // Create a secure wallet
    browser.url(`http://localhost:8080`)
    browser.execute(function (password) {
      window.paratii.eth.wallet.clear()
      window.paratii.eth.wallet
        .create()
        .then(
          localStorage.setItem(
            'keystore-secure',
            JSON.stringify(window.paratii.eth.wallet.encrypt(password))
          )
        )
    }, password)

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
        'Description of the video which can be pretty long and may contain dïàcrítics'
    }

    browser.url('http://localhost:8080/upload')
    // Login
    browser.waitAndClick('[data-test-id="login-signup"]')
    browser.waitAndClick('[name="wallet-password"]')
    browser.setValue('[name="wallet-password"]', password)
    browser.waitAndClick('[data-test-id="continue"]')

    // Upload file
    const fileToUpload = `${__dirname}/data/pti-logo.mp4`
    browser.waitForExist('input[type="file"]')
    browser.chooseFile('input[type="file"]', fileToUpload)

    // now we should see a form to fill in
    // the form should contain the id of our video
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
    const videoInfoFromBlockchain = await getVideoInfoFromBlockchain()
    assert.isOk(videoInfoFromBlockchain)
    assert.equal(videoInfoFromBlockchain.owner, newAddress)
    // when the transcoder is done, we should be ready to publish the video
    browser.waitAndClick(`[data-test-id="video-submit-publish"]`)
    browser.pause(500)
    browser.waitAndClick(`[data-test-id="button-stake"]`)
    browser.waitAndClick(`a[href="/play/${videoId}"]`)
    browser.url('http://localhost:8080')
    browser.alertAccept()
  })

  it.skip('cancel upload should work [but is not yet]', function () {
    // start uploading a file
    browser.url('http://localhost:8080/uploader/upload-file')
    const fileToUpload = `${__dirname}/data/data.txt`
    browser.chooseFile('input[type="file"]', fileToUpload)
    browser.click('#upload-submit')
    // (the file is small so is immediately done uploading, but the cancel button should be avaiblabel in any case)
    browser.waitForExist('#cancel-upload')
  })
})
