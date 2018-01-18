import { assert } from 'chai'

describe('Uploader Tool', function () {
  it('should have basic flow in place @watch', function () {
    // see https://github.com/Paratii-Video/paratii-portal/issues/8
    browser.url('http://localhost:8080/uploader/upload-file')
    let fileToUpload = `${__dirname}/data/data.txt`
    console.log(fileToUpload)

    browser.chooseFile('input[type="file"]', fileToUpload)

    var val = browser.getValue('input[type="file"]')
    // val will be something liek 'C://fakepath/data.txt'
    assert.match(val, /data.txt$/)
    // open a file from the FS
    // click on submit
    // (write a separte test for errors on this screen)
    // assert that we are on a screen where we can add info about the file
    // fill in the form with title and description and stuff
    // submit the form
    // (write a separate test for error handling on this form)
    // assert that we are on a screen where we can see the status of the video upload and transcoding
  })

  it.skip('Upload file should have decent error handling', function () {
  })

  it.skip('Edit  video should have decent error handling', function () {
  })
})
