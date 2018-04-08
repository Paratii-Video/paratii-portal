import { assert } from 'chai'
import { paratii } from './test-utils/helpers'

describe('🦄 Uploader Tool', function () {
  it.skip('should have basic flow in place', async function () {
    // THIS TEST is SKiPPED BECAUSE IT EXPECTS TO FIND A PARATII-DB INSTANCE LISTENING ON LOCALHOST:348539b9cd58fe0344dfa029cbfd601bfd3d8745
    // AND THIS IS NOT THE CASE IN CIRCLECI

    // see https://github.com/Paratii-Video/paratii-portal/issues/8
    const video = {
      title: 'Some title',
      description:
        'Description of the video which can be pretty long and may contain dïàcrítics'
    }
    browser.url('http://localhost:8080/upload')

    const fileToUpload = `${__dirname}/data/pti-logo.mp4`
    browser.waitForExist('input[type="file"]')
    browser.chooseFile('input[type="file"]', fileToUpload)

    // now we should see a form to fill in
    // the form should contain the id of our video
    browser.waitForExist('input#video-id')

    const getVideoId = function () {
      var videoId = browser.getValue('input#video-id')
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
    browser.setValue('#input-video-title', video.title)
    browser.setValue('#input-video-description', video.description)
    // submit the form
    browser.waitAndClick('#video-submit')
    // we now should be on the status screen

    // wait until the video is saved on the blockchain
    const getVideoInfoFromBlockchain = async function () {
      try {
        const videoInfoFromBlockchain = await paratii.eth.vids.get(videoId)
        return videoInfoFromBlockchain
      } catch (err) {
        // console.log(err)
      }
    }
    browser.waitUntil(getVideoInfoFromBlockchain)
    // Check if video title has been saved
    browser.waitUntil(() => {
      return browser.getValue('#input-video-title') === video.title
    })
    const videoInfoFromBlockchain = await getVideoInfoFromBlockchain()
    assert.isOk(videoInfoFromBlockchain)
    assert.equal(videoInfoFromBlockchain.owner, paratii.config.account.address)

    // now wait until the transcoder is done - we should see a "play" link at this point
    // TODO: this often times out on circleci because it depends on the (external) response of the transcoder
    await browser.waitAndClick(`a[href="/play/${videoId}"]`)
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
  it.skip('Upload file should have decent error handling', function () {})

  it.skip('Edit  video should have decent error handling', function () {})
})
