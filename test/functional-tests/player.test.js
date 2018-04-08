import { assert } from 'chai'

describe('🎥 Player:', function () {
  const videoId = '1mQRk9d7wgOJ'
  const videoTitle = 'Great title'
  const videoElementSelector = '[data-test-id="player"] video'
  const overlaySelector = '[data-test-id="video-overlay"]'
  const controlsSelector = '[data-test-id="player-controls"]'
  const playpauseButtonSelector = '[data-test-id="playpause-button"]'
  const fullscreenButtonSelector = '[data-test-id="fullscreen-button"]'
  const volumeButtonSelector = '[data-test-id="volume-button"]'
  const qualityButtonSelector = '[data-test-id="playback-levels-button"]'
  const qualityMenuSelector = '[data-test-id="playback-levels-popover"]'
  const qualityCloseButtonSelector =
    '[data-test-id="playback-levels-close-button"]'
  const levelSelector = '[data-test-id="playback-level"]'
  const walletButtonSelector = '[data-test-id="wallet-info-button"]'
  const walletPopoverSelector = '[data-test-id="wallet-info-popover"]'
  const walletInfoAddressSelector = '[data-test-id="wallet-info-address"]'
  const walletInfoCloseButtonSelector =
    '[data-test-id="wallet-info-close-button"]'
  const ptiBalanceSelector = '[data-test-id="pti-balance"]'
  const shareOverlaySelector = '[data-test-id="share-overlay"]'
  const shareButtonSelector = '[data-test-id="share-button"]'
  const shareCloseButtonSelector = '[data-test-id="share-close-button"]'
  const shareAnchorLinkSelector = '[data-test-id="share-anchor-link"]'
  const telegramShareLinkSelector = '[data-test-id="Telegram-share-link"]'
  const twitterShareLinkSelector = '[data-test-id="Twitter-share-link"]'
  const whatsAppShareLinkSelector = '[data-test-id="WhatsApp-share-link"]'

  const goToTestVideoUrl = ({ embed, overrideVideoId } = {}) => {
    browser.url(
      `http://localhost:8080/${embed ? 'embed' : 'play'}/${overrideVideoId ||
        videoId}`
    )
    browser.execute(() => {
      window.PLAYER_TEST_DATA = {
        playing: false,
        paused: false
      }
    })
    browser.waitUntil(
      () =>
        browser.execute(videoElementSelector => {
          const videoEl = window.document.querySelector(videoElementSelector)
          if (videoEl) {
            videoEl.addEventListener('playing', () => {
              window.PLAYER_TEST_DATA.playing = true
              window.PLAYER_TEST_DATA.paused = false
            })
            videoEl.addEventListener('pause', () => {
              window.PLAYER_TEST_DATA.paused = true
              window.PLAYER_TEST_DATA.playing = true
            })

            return true
          }

          return false
        }, videoElementSelector).value
    )
  }

  const assertControlsAre = ({ hidden } = { hidden: true }) => {
    browser.waitUntil(
      () =>
        browser.execute(
          (videoElementSelector, controlsSelector, hidden) => {
            const videoEl = document.querySelector(videoElementSelector)
            const controlsEl = document.querySelector(controlsSelector)
            if (videoEl && controlsEl) {
              const videoRect = videoEl.getBoundingClientRect()
              const controlsRect = controlsEl.getBoundingClientRect()
              return hidden
                ? controlsRect.y >= videoRect.y + videoRect.height
                : controlsRect.y < videoRect.y + videoRect.height
            }

            return false
          },
          videoElementSelector,
          controlsSelector,
          hidden
        ).value
    )
  }

  const assertControlsAreHidden = () => assertControlsAre({ hidden: true })
  const assertControlsAreVisible = () => assertControlsAre({ hidden: false })

  const assertVolumeIsMuted = () =>
    browser.waitUntil(
      () =>
        browser.execute(videoElementSelector => {
          const videoEl = document.querySelector(videoElementSelector)
          return !videoEl.getAttribute('volume')
        }, videoElementSelector).value,
      undefined,
      'Could not verify that volume is muted'
    )

  const assertVolumeIsNotMuted = () =>
    browser.waitUntil(
      () =>
        browser.execute(videoElementSelector => {
          const videoEl = document.querySelector(videoElementSelector)
          return videoEl.getAttribute('volume') >= 0
        }, videoElementSelector).value,
      undefined,
      'Could not verify that volume is not muted.'
    )

  const assertQualityPopoverIsNotVisible = () => {
    browser.waitUntil(
      () => !browser.isVisible(qualityMenuSelector),
      undefined,
      'Could not verify that quality popover is not visible.'
    )
  }

  const assertQualityPopoverIsVisible = () => {
    browser.waitUntil(
      () =>
        browser.execute(
          (qualityMenuSelector, controlsSelector, videoElementSelector) => {
            const videoEl = document.querySelector(videoElementSelector)
            const videoRect = videoEl.getBoundingClientRect()
            const controlsEl = document.querySelector(controlsSelector)
            const controlsRect = controlsEl.getBoundingClientRect()
            const qualityEl = document.querySelector(qualityMenuSelector)
            const qualityRect = qualityEl.getBoundingClientRect()

            const qualityIsVerticallyPositioned =
              controlsRect.y > qualityRect.y + qualityRect.height

            const qualityIsHorizontallyContained =
              videoRect.x < qualityRect.x &&
              videoRect.x + videoRect.width > qualityRect.x + qualityRect.width

            return (
              qualityIsVerticallyPositioned && qualityIsHorizontallyContained
            )
          },
          qualityMenuSelector,
          controlsSelector,
          videoElementSelector
        ).value,
      undefined,
      'Could not verify that the quality popover was visible'
    )
  }

  const assertWalletInfoIsNotVisible = () => {
    browser.waitUntil(() => !browser.isVisible(walletPopoverSelector))
  }

  const assertWalletInfoIsVisible = () => {
    browser.waitUntil(
      () =>
        browser.execute(
          (
            walletPopoverSelector,
            controlsSelector,
            videoElementSelector,
            ptiBalanceSelector,
            walletInfoAddressSelector
          ) => {
            const videoEl = document.querySelector(videoElementSelector)
            const videoRect = videoEl.getBoundingClientRect()
            const controlsEl = document.querySelector(controlsSelector)
            const controlsRect = controlsEl.getBoundingClientRect()
            const walletEl = document.querySelector(walletPopoverSelector)
            const walletRect = walletEl.getBoundingClientRect()

            const walletIsVerticallyContained =
              controlsRect.y > walletRect.y + walletRect.height &&
              videoRect.y < walletRect.y

            const walletIsHorizontallyContained =
              videoRect.x < walletRect.x &&
              videoRect.x + videoRect.width > walletRect.x + walletRect.width

            const balanceEl = walletEl.querySelector(ptiBalanceSelector)
            const balanceText = balanceEl.innerText
            const balanceTextIsExpected =
              balanceText.indexOf('PTI') === balanceText.length - 3 &&
              balanceText.length > 3

            const addressEl = walletEl.querySelector(walletInfoAddressSelector)
            const addressText = addressEl.innerText
            const addressTextIsExpected =
              addressText === window.paratii.config.account.address

            return (
              walletIsVerticallyContained &&
              walletIsHorizontallyContained &&
              balanceTextIsExpected &&
              addressTextIsExpected
            )
          },
          walletPopoverSelector,
          controlsSelector,
          videoElementSelector,
          ptiBalanceSelector,
          walletInfoAddressSelector
        ).value
    )
  }

  before(() => {
    browser.addCommand('waitUntilVideoIsPlaying', function (timeout = 20000) {
      this.waitUntil(
        () =>
          browser.execute(
            () => !!(window.PLAYER_TEST_DATA && window.PLAYER_TEST_DATA.playing)
          ).value,
        timeout,
        `Video did not play after ${timeout}ms`
      )
    })

    browser.addCommand('waitUntilVideoIsPaused', function (timeout = 5000) {
      this.waitUntil(
        () => browser.execute(() => !!window.PLAYER_TEST_DATA.paused).value,
        timeout,
        `Video did not pause after ${timeout}ms`
      )
    })
  })

  beforeEach(() => {
    browser.execute(() => {
      window.PLAYER_TEST_DATA = {
        playing: false,
        paused: false
      }
    })
  })

  const runPlayerExpectations = ({ embed } = {}) => {
    it('plays a video automatically', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
    })

    it('pauses a video when the video overlay is clicked', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      browser.waitAndClick(overlaySelector)
      browser.waitUntilVideoIsPaused()
    })

    it('does not show the controls by default', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      assertControlsAreHidden()
      browser.pause(3000)
      assertControlsAreHidden()
    })

    it('shows the controls on hover', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      assertControlsAreHidden()
      browser.moveToObject(overlaySelector)
      assertControlsAreVisible()
    })

    it('hides the controls after not moving the mouse for approximately 2 seconds', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      assertControlsAreHidden()
      browser.moveToObject(overlaySelector)
      assertControlsAreVisible()
      browser.pause(2500)
      assertControlsAreHidden()
    })

    it('pauses the video when the playpause button is clicked for the first time', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      browser.moveToObject(overlaySelector)
      browser.waitAndClick(playpauseButtonSelector)
      browser.waitUntilVideoIsPaused()
    })

    it('toggles between pause and play when repeatedly clicking the playpause button', () => {
      goToTestVideoUrl({ embed })
      browser.waitUntilVideoIsPlaying()
      browser.moveToObject(overlaySelector)
      browser.waitAndClick(playpauseButtonSelector)
      browser.waitUntilVideoIsPaused()
      browser.waitAndClick(playpauseButtonSelector)
      browser.waitUntilVideoIsPlaying()
      browser.waitAndClick(playpauseButtonSelector)
      browser.waitUntilVideoIsPaused()
      browser.waitAndClick(playpauseButtonSelector)
      browser.waitUntilVideoIsPlaying()
    })

    it('should bring the player fullscreen and back', () => {
      goToTestVideoUrl({ embed })
      browser.moveToObject(overlaySelector)
      browser.waitAndClick(fullscreenButtonSelector)
      browser.waitUntil(
        () =>
          browser.execute(videoElementSelector => {
            const videoEl = document.querySelector(videoElementSelector)
            const fullscreenElement =
              document.fullscreenElement ||
              document.webkitFullscreenElement ||
              document.mozFullScreenElement ||
              document.msFullscreenElement

            return fullscreenElement.contains(videoEl)
          }, videoElementSelector).value,
        undefined,
        'video did not enter fullscreen mode'
      )
      browser.moveToObject(overlaySelector)
      browser.waitAndClick(fullscreenButtonSelector)
      browser.waitUntil(
        () =>
          browser.execute(
            () =>
              !(
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
              )
          ).value,
        undefined,
        'video did not exit fullscreen mode'
      )
    })

    it('should default the volume to not be muted', () => {
      goToTestVideoUrl({ embed })
      assertVolumeIsNotMuted()
    })

    it('should mute the video when the volume button is clicked', () => {
      goToTestVideoUrl({ embed })
      assertVolumeIsNotMuted()
      browser.moveToObject(overlaySelector)
      browser.waitAndClick(volumeButtonSelector)
      assertVolumeIsMuted()
    })

    it('should show the playback levels menu when the quality button is clicked', () => {
      goToTestVideoUrl({ embed })
      browser.moveToObject(overlaySelector)
      assertQualityPopoverIsNotVisible()
      browser.waitAndClick(qualityButtonSelector)
      assertQualityPopoverIsVisible()
      browser.waitUntil(
        () =>
          browser.execute(
            (levelSelector, qualityMenuSelector) => {
              const qualityEl = document.querySelector(qualityMenuSelector)
              const levels = Array.prototype.slice.call(
                qualityEl.querySelectorAll(levelSelector)
              )
              const firstLevelTextIsAutomatic = (levels[0].innerText =
                'Automatic')

              return firstLevelTextIsAutomatic && levels.length > 1
            },
            levelSelector,
            qualityMenuSelector
          ).value,
        undefined,
        'playback levels menu did not render correctly'
      )
    })

    it('should not dismiss the controls as long as the quality menu is visible', () => {
      goToTestVideoUrl({ embed })
      browser.moveToObject(overlaySelector)
      assertQualityPopoverIsNotVisible()
      assertControlsAreVisible()
      browser.waitAndClick(qualityButtonSelector)
      assertQualityPopoverIsVisible()
      browser.pause(5000)
      assertControlsAreVisible()
    })

    it('should close the quality menu and hide the controls when the quality button is clicked again', () => {
      goToTestVideoUrl({ embed })
      browser.moveToObject(overlaySelector)
      assertQualityPopoverIsNotVisible()
      assertControlsAreVisible()
      browser.waitAndClick(qualityButtonSelector)
      assertQualityPopoverIsVisible()
      browser.waitAndClick(qualityButtonSelector)
      assertQualityPopoverIsNotVisible()
      assertControlsAreHidden()
    })

    it('should close the quality menu and hide the controls when the close button is clicked', () => {
      goToTestVideoUrl({ embed })
      browser.moveToObject(overlaySelector)
      assertQualityPopoverIsNotVisible()
      assertControlsAreVisible()
      browser.waitAndClick(qualityButtonSelector)
      assertQualityPopoverIsVisible()
      browser.waitAndClick(qualityCloseButtonSelector)
      assertQualityPopoverIsNotVisible()
      assertControlsAreHidden()
    })

    describe('wallet info', () => {
      if (embed) {
        it('should show the wallet info when the wallet button is clicked', () => {
          goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          assertWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          assertWalletInfoIsVisible()
        })

        it('should not dismiss the controls as long as the wallet info is being displayed', () => {
          goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          assertWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          assertWalletInfoIsVisible()
          assertControlsAreVisible()
          browser.pause(5000)
          assertControlsAreVisible()
        })

        it('should close the wallet info menu and hide the controls when the button is clicked again', () => {
          goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          assertWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          assertWalletInfoIsVisible()
          browser.waitAndClick(walletButtonSelector)
          assertWalletInfoIsNotVisible()
          assertControlsAreHidden()
        })

        it('should close the wallet info and hide the controls menu when the close button is clicked', () => {
          goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          assertWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          assertWalletInfoIsVisible()
          browser.waitAndClick(walletInfoCloseButtonSelector)
          assertWalletInfoIsNotVisible()
          assertControlsAreHidden()
        })
      } else {
        it('should not show the wallet info button', () => {
          goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          assertWalletInfoIsNotVisible()
          assert.equal(browser.isVisible(walletButtonSelector), false)
        })
      }
    })

    describe('share overlay', () => {
      const assertShareOverlayIsHidden = () =>
        browser.waitUntil(() => !browser.isVisible(shareOverlaySelector))
      const assertShareOverlayIsVisible = () =>
        browser.waitUntil(
          () =>
            browser.execute(
              (shareOverlaySelector, videoElementSelector) => {
                const videoEl = document.querySelector(videoElementSelector)
                const videoRect = videoEl.getBoundingClientRect()
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const shareOverlayRect = shareOverlayEl.getBoundingClientRect()

                const shareOverlayStyle = window.getComputedStyle(
                  shareOverlayEl
                )
                const overlayIsVisible =
                  parseInt(
                    shareOverlayStyle.getPropertyValue('opacity'),
                    10
                  ) === 1

                const overlayIsFullHeightAndWidth =
                  videoRect.x === shareOverlayRect.x &&
                  videoRect.y === shareOverlayRect.y &&
                  videoRect.width === shareOverlayRect.width &&
                  videoRect.height === shareOverlayRect.height

                return overlayIsVisible && overlayIsFullHeightAndWidth
              },
              shareOverlaySelector,
              videoElementSelector
            ).value
        )
      before(() => {
        goToTestVideoUrl({ embed })
      })
      it('should show the share overlay when the button is clicked', () => {
        assertShareOverlayIsHidden()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(shareButtonSelector)
        assertShareOverlayIsVisible()
      })

      it('should have the correct contents', () => {
        browser.waitUntil(
          () =>
            browser.execute(
              (shareOverlaySelector, shareAnchorLinkSelector, videoId) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const anchorLinkEl = shareOverlayEl.querySelector(
                  shareAnchorLinkSelector
                )
                return (
                  anchorLinkEl.getAttribute('href') ===
                  `https://portal.paratii.video/play/${videoId}`
                )
              },
              shareOverlaySelector,
              shareAnchorLinkSelector,
              videoId
            ).value,
          undefined,
          'video link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (
                shareOverlaySelector,
                telegramShareLinkSelector,
                videoId,
                videoTitle
              ) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const telegramEl = shareOverlayEl.querySelector(
                  telegramShareLinkSelector
                )
                return (
                  telegramEl.getAttribute('href') ===
                  `https://t.me/share/url?url=https://portal.paratii.video/play/${videoId}&text=🎬 Worth a watch: ${videoTitle}`
                )
              },
              shareOverlaySelector,
              telegramShareLinkSelector,
              videoId,
              videoTitle
            ).value,
          undefined,
          'telegram link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (
                shareOverlaySelector,
                twitterShareLinkSelector,
                videoId,
                videoTitle
              ) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )

                const twitterEl = shareOverlayEl.querySelector(
                  twitterShareLinkSelector
                )
                return (
                  twitterEl.getAttribute('href') ===
                  `https://twitter.com/intent/tweet?url=https://portal.paratii.video/play/${videoId}&text=🎬 Worth a watch: ${videoTitle}`
                )
              },
              shareOverlaySelector,
              twitterShareLinkSelector,
              videoId,
              videoTitle
            ).value,
          undefined,
          'twitter link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (
                shareOverlaySelector,
                whatsAppShareLinkSelector,
                videoId,
                videoTitle
              ) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const whatsAppEl = shareOverlayEl.querySelector(
                  whatsAppShareLinkSelector
                )
                return (
                  whatsAppEl.getAttribute('href') ===
                  `whatsapp://send?text=🎬 Worth a watch: ${videoTitle} https://portal.paratii.video/play/${videoId}`
                )
              },
              shareOverlaySelector,
              whatsAppShareLinkSelector,
              videoId,
              videoTitle
            ).value,
          undefined,
          'whatsapp link is incorrect'
        )
      })

      it('should dismiss the share overlay when the close button is clicked', () => {
        assertShareOverlayIsVisible()
        browser.waitAndClick(shareCloseButtonSelector)
        assertShareOverlayIsHidden()
      })
    })
  }

  describe('portal player', () => {
    runPlayerExpectations({ embed: false })
  })

  describe('embed player', () => {
    runPlayerExpectations({ embed: true })
  })
})
