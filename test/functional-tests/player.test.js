import { assert } from 'chai'

describe('🎥 Player:', function () {
  const videoId = 'foo'

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
    // browser.waitForExist('#loginModal')
    // browser.click('#btn-editprofile-close')
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
  describe('portal player', () => {
    it.skip('plays a video automatically', () => {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitUntilVideoIsPlaying()
    })
    it.skip('video not found', () => {
      // This test is not passing for reasons unknown
      browser.url(`http://localhost:8080/play/xxx`)
      browser.waitForText('main h1', 'Oooooops, page not found')
    })

    it.skip('shows the video title on the overlay', function () {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitAndClick('[data-test-id="video-overlay"]')
      browser.waitForText('[data-test-id="video-overlay"]', 'Test 1')
    })
    it.skip('does not render a profile button', function () {
      browser.url(`http://localhost:8080/play/${videoId}`)
      browser.waitUntilVideoIsPlaying()
      browser.waitAndClick('[data-test-id="video-overlay"]')
      assert.equal(
        browser.isExisting('[data-test-id="overlay-profile-button"]'),
        false
      )
    })
  })

  describe('embedded player', () => {
    it.skip('plays a video automatically', () => {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitUntilVideoIsPlaying()
    })
    it.skip('shows the video title on the overlay', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitUntilVideoIsPlaying()
      browser.waitAndClick('[data-test-id="video-overlay"]')
      browser.moveToObject('#video')
      browser.waitForText('[data-test-id="video-overlay"]', 'Test 1')
    })
    it.skip('renders a profile button', function () {
      browser.url(`http://localhost:8080/embed/${videoId}`)
      browser.waitUntilVideoIsPlaying()
      browser.waitAndClick('[data-test-id="video-overlay"]')
      browser.moveToObject('#video')
      browser.waitForClickable('[data-test-id="overlay-profile-button"]')
    })
  })
})
