import { assert } from 'chai'

describe('Uploader Tool', function () {
  it('should have basic flow in place @watch', function () {
    // see https://github.com/Paratii-Video/paratii-portal/issues/8
    let video = {
      title: 'Some title',
      description: 'Description of the video which can be pretty long and may contain dïàcrítics'
    }
    browser.url('http://localhost:8080/uploader/upload-file')
    let fileToUpload = `${__dirname}/data/data.txt`
    console.log(fileToUpload)

    browser.chooseFile('input[type="file"]', fileToUpload)

    var val = browser.getValue('input[type="file"]')
    // val will be something like 'C://fakepath/data.txt'
    assert.match(val, /data.txt$/)

    // submit the file
    browser.click('#upload-submit')

    // now we should see a form to fill in
    browser.setValue('#video-title', video.title)
    browser.setValue('#video-description', video.description)
    // submit the form
    browser.click('#video-submit')

    // (write a separate test for error handling on this form)
    // assert that we are on a screen where we can see the status of the video upload and transcoding
    browser.pause(4000)
  })

  it.skip('Upload file should have decent error handling', function () {
  })

  it.skip('Edit  video should have decent error handling', function () {
  })
})
