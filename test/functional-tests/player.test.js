import { assert } from 'chai'
import { address1, paratii, uploadFilesToIPFS } from './test-utils/helpers.js'

const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')

describe('🎥 Player: @watch ', function () {
  const ipfsHash = 'QmQP5SJzEBKy1uAGASDfEPqeFJ3HUbEp4eZzxvTLdZZYwB'
  const videoId = 'foo'

  before(async function () {
    paratii.vids
      .create({
        id: videoId,
        owner: address1,
        title: 'Test 1',
        ipfsHash: ipfsHash
      })
      .then(function () {
        const directory = `test/functional-tests/data/${ipfsHash}`
        let files = ''
        Promise.promisify(fs.readdir)(directory).then(function (results) {
          files = results
          files = files.map(function (f) {
            return path.join(directory, f)
          })
        })
        let ipfs = ''
        paratii.ipfs.getIPFSInstance().then(function (results) {
          ipfs = results
          uploadFilesToIPFS(ipfs, files)
        })
      })
  })

  beforeEach(function () {
    // server.execute(createVideo, '12345', 'Test 1', '', '', [''], 0)
    // server.execute(createVideo, '23456', 'Test 2', '', '', [''], 0)
    // server.execute(createPlaylist, '98765', 'Playlist test', ['12345', '23456'])
  })

  it.skip('click on next video', () => {
    browser.url('http://localhost:3000/play/12345?playlist=98765')
    browser.waitForExist('.player-overlay')
    assert.equal(browser.getText('.player-title'), 'Test 1')
    // Close modal
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

  it.skip('like and dislike a video as an anonymous user', () => {
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
  describe('Portal player', () => {
    it.skip('plays a video automatically', () => {
      browser.url(`http://localhost:8080`)
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitUntilVideoIsPlaying()
    })

    it('video not found', () => {
      browser.url(`http://localhost:8080/play/xxx`)
      browser.waitForText('main h1', 'Oooooops, page not found')
    })

    it.skip('does not render a profile button', function () {
      browser.url(`http://localhost:8080/play/${videoId}`)
      // browser.waitUntilVideoIsPlaying()
      browser.waitAndClick('[data-test-id="video-overlay"]')
      // FIXME all the button on the player has the same data-test.id
      assert.equal(
        browser.isExisting('[data-test-id="overlay-profile-button"]'),
        false
      )
    })
  })

  describe('Embedded player', () => {
    it.skip('plays a video automatically', () => {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitUntilVideoIsPlaying()
    })

    it('shows the video title on the overlay', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitForText('[data-test-id="video-overlay"]', 'Test 1')
    })

    it('renders a profile button', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitForClickable('[data-test-id="overlay-profile-button"]')
    })
  })
})
