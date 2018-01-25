//
// Note for devs: WORK IN PROGRESS
// Check https://github.com/Paratii-Video/paratii-portal/issues/25 for progress
//
//
// MIGRATING FROM paratii-player/tests/
//
//
// Notes:
//    Some of these functions are already tested in paratii-mediaplayer.
//    Those tests do not need to be migrated and can be removed..
//
//
//
//
//
//
//
import { assert } from 'chai'
import {
  address1,
  assertUserIsLoggedIn,
  assertUserIsNotLoggedIn,
  createUserAndLogin,
  // createPlaylist,
  // createVideo,
  paratii,
  uploadFilesToIPFS
} from './test-utils/helpers.js'

const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')

describe('Player: ', function () {
  let ipfsHash = 'QmQP5SJzEBKy1uAGASDfEPqeFJ3HUbEp4eZzxvTLdZZYwB'
  let videoId = 'foo'

  before(async function () {
    await paratii.core.vids.create({
      id: videoId,
      owner: address1,
      title: 'Test 1',
      ipfsHash: ipfsHash
    })

    let directory = `test/functional-tests/data/${ipfsHash}`
    // the next function should now be available

    let files = await Promise.promisify(fs.readdir)(directory)
    let ipfs = await paratii.ipfs.getIPFSInstance()
    files = files.map(function (f) {
      return path.join(directory, f)
    })

    await uploadFilesToIPFS(ipfs, files)
    // for (let i = 0; i < files.length; i++) {
    //   console.log(filepath)
    //   let file = await Promise.promisify(fs.createReadStream)(filepath)
    //   console.log(file)
    //   let result = await ipfs.files.add(file)
    //   console.log(result)
    // }
    // browser.addCommand('waitUntilVideoIsPlaying', () => {
    //   browser.waitUntil(() => (
    //     parseInt(browser.getAttribute('#video-player', 'currentTime'), 10) !== 0 &&
    //     browser.getAttribute('#video-player', 'paused') !== 'true' &&
    //     browser.getAttribute('#video-player', 'ended') !== 'true'
    //   ))
    // })
    // browser.addCommand('waitUntilBuffered', () => {
    //   browser.waitUntil(() => !!browser.execute(() => {
    //     const playerEl = document.querySelector('#video-player')
    //     for (let i = 0; i < playerEl.buffered.length; i += 1) {
    //       if (playerEl.buffered.end(i) > 0) {
    //         return true
    //       }
    //     }
    //     return false
    //   }).value)
    // })
  })

  beforeEach(function () {
    // server.execute(createVideo, '12345', 'Test 1', '', '', [''], 0)
    // server.execute(createVideo, '23456', 'Test 2', '', '', [''], 0)
    // server.execute(createPlaylist, '98765', 'Playlist test', ['12345', '23456'])
  })

  it('play a video', async function () {
    // check sanity - the video should be available now
    assert.isOk(await paratii.core.vids.get(videoId))

    browser.url(`http://localhost:8080/play/${videoId}`)
    // expect('#player').to.exist
    browser.waitAndClick('#player')
    browser.waitForExist('.media-control')
  })

  it('the video has overlay informations', function () {
    // This tests should just be very much reduced
    browser.url(`http://localhost:8080/play/${videoId}`)
    browser.waitAndClick('#player')
    browser.waitForExist('#video-overlay')
    // assert.equal(browser.getText('.player-title'), 'Test 1')
    // browser.waitForExist('.player-controls')
    // assert.isTrue(browser.getAttribute('.player-container', 'class').includes('play'))

    // browser.waitForExist('.player-overlay')
    // assert.isTrue(browser.getAttribute('#nav', 'class').includes('closed'))
    // assert.isTrue(browser.getAttribute('.player-container', 'class').includes('pause'))
    // assert.isTrue(browser.getAttribute('.player-container', 'class').includes('pause'))
  })

  it.skip('click on next video', () => {
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.waitForExist('.player-overlay')
    assert.equal(browser.getText('.player-title'), 'Test 1')
    // Close modal
    // browser.waitForExist('#loginModal')
    // browser.click('#btn-editprofile-close')
    // browser.pause(2000)
    browser.waitAndClick('#next-video-button')
    browser.waitForExist('.player-overlay')
    assert.equal(browser.getText('.player-title'), 'Test 2')
  })

  it.skip('click on previous video', () => {
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.waitForExist('.player-overlay')
    assert.equal(browser.getText('.player-title'), 'Test 1')
    browser.waitAndClick('#previous-video-button')
    browser.waitForExist('.player-overlay')
    assert.equal(browser.getText('.player-title'), 'Test 2')
  })

  it.skip("if a player is within a playlist and it ended related videos don't show up [TODO]", () => {})

  it.skip('if a player is not within a playlist and it ended related videos show up [TODO]', () => {})

  it.skip('like and dislike a video as an anonymous user', () => {
    assertUserIsNotLoggedIn(browser)
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.waitForClickable('#button-like')
    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '0' &&
        browser.getText('#button-dislike') === '0'
    )

    browser.click('#button-like')
    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '1' &&
        browser.getText('#button-dislike') === '0'
    )

    browser.click('#button-dislike')

    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '0' &&
        browser.getText('#button-dislike') === '1'
    )
  })
  it.skip('like and dislike a video as a logged-in user', () => {
    createUserAndLogin(browser)
    assertUserIsLoggedIn(browser)
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.waitForClickable('#button-like')
    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '0' &&
        browser.getText('#button-dislike') === '0'
    )

    browser.click('#button-like')
    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '1' &&
        browser.getText('#button-dislike') === '0'
    )

    browser.click('#button-dislike')

    browser.waitUntil(
      () =>
        browser.getText('#button-like') === '0' &&
        browser.getText('#button-dislike') === '1'
    )
  })
})
