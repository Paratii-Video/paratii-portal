import { assert } from 'chai'
import queryString from 'query-string'

describe('🎥 Player:', function () {
  const videoId = '1mQRk9d7wgOJ'
  const videoTitle = 'Great title'
  const videoElementSelector = '[data-test-id="player"] video'
  const overlaySelector = '[data-test-id="video-overlay"]'
  const controlsSelector = '[data-test-id="player-controls"]'
  const playpauseButtonSelector = '[data-test-id="playpause-button"]'

  before(() => {
    browser.addCommand(
      'goToTestVideoUrl',
      ({ embed, overrideVideoId, queryParams }) => {
        const finalQueryParams = queryParams || { autoplay: true }
        const query = queryString.stringify(finalQueryParams)
        browser.url(
          `http://localhost:8080/${
            embed ? 'embed' : 'play'
          }/${overrideVideoId || videoId}?${query}`
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
              const videoEl = window.document.querySelector(
                videoElementSelector
              )
              if (videoEl) {
                videoEl.addEventListener('playing', () => {
                  window.PLAYER_TEST_DATA.playing = true
                  window.PLAYER_TEST_DATA.paused = false
                })
                videoEl.addEventListener('pause', () => {
                  window.PLAYER_TEST_DATA.paused = true
                  window.PLAYER_TEST_DATA.playing = true
                })

                window.PLAYER_TEST_DATA = {
                  playing: false,
                  paused: false
                }

                return true
              }

              return false
            }, videoElementSelector).value
        )
      }
    )

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

    browser.addCommand('assertVideoNeverPlayed', function (timeout = 20000) {
      this.waitUntil(
        () =>
          browser.execute(
            () =>
              !!(window.PLAYER_TEST_DATA && !window.PLAYER_TEST_DATA.playing)
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

    const waitUntilControlsAre = ({ hidden } = { hidden: true }) => {
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

    browser.addCommand(
      'waitUntilControlsAreHidden',
      () => {
        waitUntilControlsAre({ hidden: true })
      },
      true
    )

    browser.addCommand(
      'waitUntilControlsAreVisible',
      () => {
        waitUntilControlsAre({ hidden: false })
      },
      true
    )
  })

  beforeEach(() => {
    browser.execute(() => {})
  })

  const runPlayerExpectations = ({ embed } = {}) => {
    describe('video play/pause', () => {
      if (embed) {
        it('does not play a video automatically by default', () => {
          browser.goToTestVideoUrl({ embed })
          browser.pause(1000)
          browser.assertVideoNeverPlayed()
        })

        it('does not play a video automatically if autoplay is 0', () => {
          const queryParams = { autoplay: 0 }

          browser.goToTestVideoUrl({ embed, queryParams })
          browser.pause(10000)
          browser.assertVideoNeverPlayed()
        })

        it('does not play a video automatically if autoplay is false', () => {
          const queryParams = { autoplay: false }

          browser.goToTestVideoUrl({ embed, queryParams })
          browser.pause(10000)
          browser.assertVideoNeverPlayed()
        })
      } else {
        it('plays a video automatically by default', () => {
          browser.goToTestVideoUrl({ embed })
          browser.waitUntilVideoIsPlaying()
        })

        it('plays a video automatically even if autoplay is false', () => {
          const queryParams = { autoplay: false }
          browser.goToTestVideoUrl({ embed, queryParams })
          browser.waitUntilVideoIsPlaying()
        })

        it('plays a video automatically even if autoplay is 0', () => {
          const queryParams = { autoplay: 0 }

          browser.goToTestVideoUrl({ embed, queryParams })
          browser.waitUntilVideoIsPlaying()
        })
      }

      it('plays a video automatically if autoplay is true', () => {
        const queryParams = { autoplay: true }
        browser.goToTestVideoUrl({ embed, queryParams })
        browser.waitUntilVideoIsPlaying()
      })

      it('plays a video automatically if autoplay is 1', () => {
        const queryParams = { autoplay: 1 }

        browser.goToTestVideoUrl({ embed, queryParams })
        browser.waitUntilVideoIsPlaying()
      })

      it('plays a video automatically if autoplay is present with no explicit value', () => {
        const queryParams = { autoplay: '' }

        browser.goToTestVideoUrl({ embed, queryParams })
        browser.waitUntilVideoIsPlaying()
      })

      it('plays a video automatically if autoplay is some random value', () => {
        const queryParams = { autoplay: 'foobarbaz' }

        browser.goToTestVideoUrl({ embed, queryParams })
        browser.waitUntilVideoIsPlaying()
      })

      it('pauses a video when the video overlay is clicked', () => {
        browser.waitUntilVideoIsPlaying()
        browser.waitAndClick(overlaySelector)
        browser.waitUntilVideoIsPaused()
      })

      it('toggles between pause and play when repeatedly clicking the playpause button', () => {
        browser.goToTestVideoUrl({ embed })
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
    })

    describe('controls show/hide', () => {
      it('shows the controls until the video is playing', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitUntilControlsAreVisible()
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreHidden()
        browser.pause(3000)
        browser.waitUntilControlsAreHidden()
      })

      it('shows the controls on hover', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreHidden()
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
      })

      it('hides the controls after not moving the mouse for approximately 2 seconds', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreHidden()
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
        browser.pause(2500)
        browser.waitUntilControlsAreHidden()
      })

      it('pauses the video when the playpause button is clicked for the first time', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitUntilVideoIsPlaying()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(playpauseButtonSelector)
        browser.waitUntilVideoIsPaused()
      })
    })

    describe('fullscreen capabilities', () => {
      const fullscreenButtonSelector = '[data-test-id="fullscreen-button"]'

      before(() => {
        browser.addCommand(
          'waitUntilVideoIsFullscreen',
          () => {
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
          },
          true
        )

        browser.addCommand(
          'waitUntilVideoIsNotFullscreen',
          () => {
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
          },
          true
        )

        browser.goToTestVideoUrl({ embed })
      })
      it('should bring the player fullscreen and back', () => {
        browser.goToTestVideoUrl({ embed })
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(fullscreenButtonSelector)
        browser.waitUntilVideoIsFullscreen()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(fullscreenButtonSelector)
        browser.waitUntilVideoIsNotFullscreen()
      })
    })

    describe('volume', () => {
      const volumeButtonSelector = '[data-test-id="volume-button"]'

      before(() => {
        browser.addCommand(
          'waitUntilVolumeIsMuted',
          () => {
            browser.waitUntil(
              () =>
                browser.execute(videoElementSelector => {
                  const videoEl = document.querySelector(videoElementSelector)
                  return !videoEl.getAttribute('volume')
                }, videoElementSelector).value,
              undefined,
              'Could not verify that volume is muted'
            )
          },
          true
        )

        browser.addCommand(
          'waitUntilVolumeIsNotMuted',
          () => {
            browser.waitUntil(
              () =>
                browser.execute(videoElementSelector => {
                  const videoEl = document.querySelector(videoElementSelector)
                  return videoEl.getAttribute('volume') >= 0
                }, videoElementSelector).value,
              undefined,
              'Could not verify that volume is not muted.'
            )
          },
          true
        )

        browser.goToTestVideoUrl({ embed })
      })

      it('should default the volume to not be muted', () => {
        browser.waitUntilVolumeIsNotMuted()
      })

      it('should mute the video when the volume button is clicked', () => {
        browser.waitUntilVolumeIsNotMuted()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(volumeButtonSelector)
        browser.waitUntilVolumeIsMuted()
      })
    })

    describe('video quality', () => {
      const qualityButtonSelector = '[data-test-id="playback-levels-button"]'
      const qualityMenuSelector = '[data-test-id="playback-levels-popover"]'
      const qualityCloseButtonSelector =
        '[data-test-id="playback-levels-close-button"]'
      const levelSelector = '[data-test-id="playback-level"]'

      before(() => {
        browser.addCommand(
          'waitUntilQualityPopoverIsNotVisible',
          () => {
            browser.waitUntil(
              () => !browser.isVisible(qualityMenuSelector),
              undefined,
              'Could not verify that quality popover is not visible.'
            )
          },
          true
        )

        browser.addCommand(
          'waitUntilQualityPopoverIsVisible',
          () => {
            browser.waitUntil(
              () =>
                browser.execute(
                  (
                    qualityMenuSelector,
                    controlsSelector,
                    videoElementSelector
                  ) => {
                    const videoEl = document.querySelector(videoElementSelector)
                    const videoRect = videoEl.getBoundingClientRect()
                    const controlsEl = document.querySelector(controlsSelector)
                    const controlsRect = controlsEl.getBoundingClientRect()
                    const qualityEl = document.querySelector(
                      qualityMenuSelector
                    )
                    const qualityRect = qualityEl.getBoundingClientRect()

                    const qualityIsVerticallyPositioned =
                      controlsRect.y > qualityRect.y + qualityRect.height

                    const qualityIsHorizontallyContained =
                      videoRect.x < qualityRect.x &&
                      videoRect.x + videoRect.width >
                        qualityRect.x + qualityRect.width

                    return (
                      qualityIsVerticallyPositioned &&
                      qualityIsHorizontallyContained
                    )
                  },
                  qualityMenuSelector,
                  controlsSelector,
                  videoElementSelector
                ).value,
              undefined,
              'Could not verify that the quality popover was visible'
            )
          },
          true
        )

        browser.goToTestVideoUrl({ embed })
      })
      it('should show the playback levels menu when the quality button is clicked', () => {
        browser.moveToObject(overlaySelector)
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitAndClick(qualityButtonSelector)
        browser.waitUntilQualityPopoverIsVisible()
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
        browser.waitUntilQualityPopoverIsVisible()
        browser.waitUntilControlsAreVisible()
        browser.pause(5000)
        browser.waitUntilControlsAreVisible()
      })

      it('should close the quality menu and hide the controls when the quality button is clicked again', () => {
        browser.moveToObject(overlaySelector)
        browser.waitUntilQualityPopoverIsVisible()
        browser.waitAndClick(qualityButtonSelector)
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitUntilControlsAreHidden()
      })

      it('should close the quality menu and hide the controls when the close button is clicked', () => {
        browser.goToTestVideoUrl({ embed })
        browser.moveToObject(overlaySelector)
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitUntilControlsAreVisible()
        browser.waitAndClick(qualityButtonSelector)
        browser.waitUntilQualityPopoverIsVisible()
        browser.waitAndClick(qualityCloseButtonSelector)
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitUntilControlsAreHidden()
      })
    })

    describe('wallet info', () => {
      const walletButtonSelector = '[data-test-id="wallet-info-button"]'
      const walletPopoverSelector = '[data-test-id="wallet-info-popover"]'
      const walletInfoAddressSelector = '[data-test-id="wallet-info-address"]'
      const walletInfoCloseButtonSelector =
        '[data-test-id="wallet-info-close-button"]'
      const ptiBalanceSelector = '[data-test-id="pti-balance"]'

      before(() => {
        browser.addCommand(
          'waitUntilWalletInfoIsNotVisible',
          () => {
            browser.waitUntil(() => !browser.isVisible(walletPopoverSelector))
          },
          true
        )

        browser.addCommand(
          'waitUntilWalletInfoIsVisible',
          () => {
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
                    const walletEl = document.querySelector(
                      walletPopoverSelector
                    )
                    const walletRect = walletEl.getBoundingClientRect()

                    const walletIsVerticallyContained =
                      controlsRect.y > walletRect.y + walletRect.height &&
                      videoRect.y < walletRect.y

                    const walletIsHorizontallyContained =
                      videoRect.x < walletRect.x &&
                      videoRect.x + videoRect.width >
                        walletRect.x + walletRect.width

                    const balanceEl = walletEl.querySelector(ptiBalanceSelector)
                    const balanceText = balanceEl.innerText
                    const balanceTextIsExpected =
                      balanceText.indexOf('PTI') === balanceText.length - 3 &&
                      balanceText.length > 3

                    const addressEl = walletEl.querySelector(
                      walletInfoAddressSelector
                    )
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
          },
          true
        )
      })
      if (embed) {
        it('should show the wallet info when the wallet button is clicked', () => {
          browser.goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          browser.waitUntilWalletInfoIsVisible()
        })

        it('should not dismiss the controls as long as the wallet info is being displayed', () => {
          browser.waitUntilWalletInfoIsVisible()
          browser.waitUntilControlsAreVisible()
          browser.pause(5000)
          browser.waitUntilControlsAreVisible()
        })

        it('should close the wallet info menu and hide the controls when the button is clicked again', () => {
          browser.waitUntilWalletInfoIsVisible()
          browser.waitAndClick(walletButtonSelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitUntilControlsAreHidden()
        })

        it('should close the wallet info and hide the controls menu when the close button is clicked', () => {
          browser.goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          browser.waitUntilWalletInfoIsVisible()
          browser.waitAndClick(walletInfoCloseButtonSelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitUntilControlsAreHidden()
        })
      } else {
        it('should not show the wallet info button', () => {
          browser.goToTestVideoUrl({ embed })
          browser.moveToObject(overlaySelector)
          browser.waitUntilWalletInfoIsNotVisible()
          assert.equal(browser.isVisible(walletButtonSelector), false)
        })
      }
    })

    describe('share overlay', () => {
      const shareOverlaySelector = '[data-test-id="share-overlay"]'
      const shareButtonSelector = '[data-test-id="share-button"]'
      const shareCloseButtonSelector = '[data-test-id="share-close-button"]'
      const shareAnchorLinkSelector = '[data-test-id="share-anchor-link"]'
      const telegramShareLinkSelector = '[data-test-id="Telegram-share-link"]'
      const twitterShareLinkSelector = '[data-test-id="Twitter-share-link"]'
      const whatsAppShareLinkSelector = '[data-test-id="WhatsApp-share-link"]'

      before(() => {
        browser.addCommand(
          'waitUntilShareOverlayIsNotVisible',
          () => {
            browser.waitUntil(
              () => !browser.isVisible(shareOverlaySelector),
              undefined,
              'Could not verify that the share overlay is hidden.'
            )
          },
          true
        )

        browser.addCommand(
          'waitUntilShareOverlayIsVisible',
          () => {
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
                ).value,
              undefined,
              'Could not verify that the share overlay is visible.'
            )
          },
          true
        )

        browser.goToTestVideoUrl({ embed })
      })
      it('should show the share overlay when the button is clicked', () => {
        browser.waitUntilShareOverlayIsNotVisible()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(shareButtonSelector)
        browser.waitUntilShareOverlayIsVisible()
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
        browser.waitUntilShareOverlayIsVisible()
        browser.waitAndClick(shareCloseButtonSelector)
        browser.waitUntilShareOverlayIsNotVisible()
      })
    })
  }

  // describe('portal player', () => {
  //   runPlayerExpectations({ embed: false })
  // })

  describe('embed player', () => {
    runPlayerExpectations({ embed: true })
  })
})
