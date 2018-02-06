import { assert } from 'chai'
import { address1, paratii, uploadFilesToIPFS } from './test-utils/helpers.js'

const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')

describe('Player:', function () {
  const ipfsHash = 'QmQP5SJzEBKy1uAGASDfEPqeFJ3HUbEp4eZzxvTLdZZYwB'
  const videoId = 'foo'

  before(async function () {
    await paratii.core.vids.create({
      id: videoId,
      owner: address1,
      title: 'Test 1',
      ipfsHash: ipfsHash
    })

    const directory = `test/functional-tests/data/${ipfsHash}`

    let files = await Promise.promisify(fs.readdir)(directory)
    const ipfs = await paratii.ipfs.getIPFSInstance()
    files = files.map(function (f) {
      return path.join(directory, f)
    })

    await uploadFilesToIPFS(ipfs, files)
  })

  beforeEach(function () {
    // server.execute(createVideo, '12345', 'Test 1', '', '', [''], 0)
    // server.execute(createVideo, '23456', 'Test 2', '', '', [''], 0)
    // server.execute(createPlaylist, '98765', 'Playlist test', ['12345', '23456'])
  })

  describe('portal player', () => {
    it('plays a video', () => {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitAndClick('#video-overlay')

      browser.waitUntil(() => {
        return browser.execute(() => {
          const video = document.querySelector('video')
          return video.currentTime > 0
        }).value
      })
    })
    it('shows the video title on the overlay', function () {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitForText('#video-overlay', 'Test 1')
    })
    it('does not render a profile button', function () {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.pause(250)
      assert.equal(
        browser.isExisting('[data-test-id="overlay-profile-button"]'),
        false
      )
    })
  })

  describe('embedded player', () => {
    it('plays a video', () => {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitAndClick('#video-overlay')

      browser.waitUntil(() => {
        return browser.execute(() => {
          const video = document.querySelector('video')
          return video.currentTime > 0
        }).value
      })
    })
    it('shows the video title on the overlay', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitForText('#video-overlay', 'Test 1')
    })
    it('renders a profile button', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitForClickable('[data-test-id="overlay-profile-button"]')
    })
  })
})
