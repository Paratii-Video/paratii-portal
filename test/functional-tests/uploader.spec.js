import { assert } from 'chai'
import { paratii } from './test-utils/helpers'

describe('Uploader Tool', function () {
  it('should have basic flow in place', async function () {
    // see https://github.com/Paratii-Video/paratii-portal/issues/8
    let video = {
      title: 'Some title',
      description:
        'Description of the video which can be pretty long and may contain dïàcrítics'
    }
    browser.url('http://localhost:8080/upload')

    // let fileToUpload = `${__dirname}/data/data.txt`
    let fileToUpload = `${__dirname}/data/pti-logo.mp4`
    browser.chooseFile('input[type="file"]', fileToUpload)

    // this will immediately submit (and upload) the file, so the next lines will fail
    // var val = browser.getValue('input[type="file"]')
    // // val will be something like 'C://fakepath/data.txt'
    // assert.match(val, /data.txt$/)
    // submit the file
    // browser.click('#upload-submit')

    // now we should see a form to fill in
    browser.waitForExist('#video-title')
    // the form should contain the id of our video
    var videoId = browser.getValue('input#video-id')
    assert.isOk(videoId)
    assert.isOk(videoId.length > 8)
    browser.setValue('#video-title', video.title)
    browser.setValue('#video-description', video.description)
    // submit the form
    browser.click('#video-submit')
    // // we now should be on the status screen

    // wait untilt he video is saved on the blockchain
    let getVideoInfoFromBlockchain = async function () {
      try {
        let videoInfoFromBlockchain = await paratii.eth.vids.get(videoId)
        return videoInfoFromBlockchain
      } catch (err) {
        // console.log(err)
      }
    }
    browser.waitUntil(getVideoInfoFromBlockchain)
    let videoInfoFromBlockchain = await getVideoInfoFromBlockchain()
    assert.isOk(videoInfoFromBlockchain)
    assert.equal(videoInfoFromBlockchain.owner, paratii.config.account.address)
    // let videoId
    // // wait until the videoId is returned back from paratii-lib (meaning that the object has been saved)
    // browser.waitUntil(function () {
    //   videoId = browser.getText('#videoId')
    //   return videoId
    // })
    // console.log(videoId)
    assert.isOk(true)

    // TODO: we now should find a video record on the blockchain
  })

  it.skip('cancel upload should work [but is not yet]', function () {
    // start uploading a file
    browser.url('http://localhost:8080/uploader/upload-file')
    let fileToUpload = `${__dirname}/data/data.txt`
    browser.chooseFile('input[type="file"]', fileToUpload)
    browser.click('#upload-submit')
    // (the file is small so is immediately done uploading, but the cancel button should be avaiblabel in any case)
    browser.waitForExist('#cancel-upload')
  })
  it.skip('Upload file should have decent error handling', function () {})

  it.skip('Edit  video should have decent error handling', function () {})
})
