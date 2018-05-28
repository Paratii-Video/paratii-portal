import { assert } from 'chai'
import queryString from 'query-string'

import { ID, TITLE, IPFS_HASH } from './constants/VideoTestConstants'

import mockEndpoint from '../../mock-server/mockEndpoint'

describe('🎥 Player:', function () {
  const videoElementSelector = '#player video'
  const playerWrapperSelector = '[data-test-id="player-wrapper"]'
  const overlaySelector = '[data-test-id="video-overlay"]'
  const startScreenIconSelector = '[data-test-id="start-screen-icon"]'
  const controlsSelector = '[data-test-id="player-controls"]'
  const playpauseButtonSelector = '[data-test-id="playpause-button"]'

  before(() => {
    mockEndpoint({
      endpoint: `/api/v1/videos/${ID}`,
      response: {
        author: '',
        blockNumber: 1167,
        createBlockNumber: 1166,
        description: '',
        duration: '00:00:05.31',
        filename: 'city.mp4',
        filesize: '2989735',
        id: ID,
        ipfsData: 'QmZeRT7KNid9UAWhpncFPgiungZYtvzdnRodqtE66AuFR7',
        ipfsHash: IPFS_HASH,
        ipfsHashOrig: 'Qmd6t5arM98ShdmHXvYzjT7ku4Z8xtKbM8AY3oN5Cs7oSi',
        owner: '0x7d1Cbbd813b1a865CDf1476d112a21dC5d643B8b',
        price: 0,
        published: '',
        stats: { likers: [], dislikers: [] },
        thumbnails: [
          'thumbnail-1920x1080_1.png',
          'thumbnail-1920x1080_2.png',
          'thumbnail-1920x1080_3.png'
        ],
        title: TITLE,
        uploader: { address: '0x7d1Cbbd813b1a865CDf1476d112a21dC5d643B8b' }
      }
    })

    browser.addCommand(
      'goToTestVideoUrl',
      ({ embed, overrideID, queryParams }) => {
        const finalQueryParams = queryParams || { autoplay: false }
        const query = queryString.stringify(finalQueryParams)
        browser.url(
          `http://localhost:8080/${embed ? 'embed' : 'play'}/${overrideID ||
            ID}?${query}`
        )
        browser.execute(playerWrapperSelector => {
          window.PLAYER_TEST_DATA = {
            playing: false,
            paused: false
          }

          window.PLAYER_IS_FULLSCREEN = false

          const mockRequestFullscreen = function () {
            window.PLAYER_IS_FULLSCREEN = true
            document.fullscreenElement = this

            const fullscreenEvent = new Event('fullscreenchange')
            document.dispatchEvent(fullscreenEvent)
          }

          const mockExitFullscreen = () => {
            window.PLAYER_IS_FULLSCREEN = false
            document.fullscreenElement = undefined

            const fullscreenEvent = new Event('fullscreenchange')
            document.dispatchEvent(fullscreenEvent)
          }

          const playerWrapper = document.querySelector(playerWrapperSelector)
          if (playerWrapper.requestFullscreen) {
            playerWrapper.requestFullscreen = mockRequestFullscreen
          } else if (playerWrapper.mozRequestFullScreen) {
            playerWrapper.mozRequestFullScreen = mockRequestFullscreen
          } else if (playerWrapper.webkitRequestFullscreen) {
            playerWrapper.webkitRequestFullscreen = mockRequestFullscreen
          }

          if (document.exitFullscreen) {
            document.exitFullscreen = mockExitFullscreen
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen = mockExitFullscreen
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen = mockExitFullscreen
          }
        }, playerWrapperSelector)
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
            }, videoElementSelector).value,
          undefined,
          'Could not attach handlers to video element.'
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
        `Video played when it should not have`
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

    browser.addCommand('waitUntilStartButtonIsVisible', () =>
      browser.isVisible(startScreenIconSelector)
    )
  })

  const runPlayerExpectations = ({ embed } = {}) => {
    describe('video play/pause', () => {
      it('plays a video when the video overlay is clicked', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilVideoIsPlaying()
      })

      it('pauses a video when the video overlay is clicked', () => {
        browser.waitUntilVideoIsPlaying()
        browser.waitAndClick(overlaySelector)
        browser.waitUntilVideoIsPaused()
      })

      it('toggles between pause and play when repeatedly clicking the playpause button', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilControlsAreVisible()
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
      if (embed) {
        it('hides the controls and shows the start button until the video is playing', () => {
          browser.goToTestVideoUrl({ embed })
          browser.waitUntilStartButtonIsVisible()
          browser.waitUntilControlsAreHidden()
          browser.waitAndClick(overlaySelector)
          browser.waitUntilVideoIsPlaying()
          browser.waitUntilControlsAreHidden()
          browser.pause(3000)
          browser.waitUntilControlsAreHidden()
        })
      } else {
        it('shows the controls until the video is playing', () => {
          browser.goToTestVideoUrl({ embed })
          browser.waitAndClick(startScreenIconSelector)
          browser.waitAndClick(overlaySelector)
          browser.waitUntilVideoIsPlaying()
          browser.waitUntilControlsAreHidden()
          browser.pause(3000)
          browser.waitUntilControlsAreHidden()
        })
      }

      it('shows the controls on hover', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreHidden()
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
      })

      it('hides the controls after not moving the mouse for approximately 2 seconds', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreHidden()
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
        browser.pause(2500)
        browser.waitUntilControlsAreHidden()
      })

      it('pauses the video when the playpause button is clicked for the first time', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilControlsAreVisible()
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
                browser.execute(() => {
                  return window.PLAYER_IS_FULLSCREEN === true
                }).value,
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
                browser.execute(() => window.PLAYER_IS_FULLSCREEN === false)
                  .value,
              undefined,
              'video did not exit fullscreen mode'
            )
          },
          true
        )
      })
      it('should bring the player fullscreen and back', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilVideoIsPlaying()
        browser.waitUntilControlsAreVisible()
        browser.moveToObject(overlaySelector)
        browser.waitAndClick(fullscreenButtonSelector)
        browser.waitUntilVideoIsFullscreen()
        browser.waitAndClick(overlaySelector)
        browser.waitUntilControlsAreVisible()
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
      })

      it('should default the volume to not be muted', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitUntilVolumeIsNotMuted()
      })

      it('should mute the video when the volume button is clicked', () => {
        browser.waitUntilVolumeIsNotMuted()
        browser.waitAndClick(startScreenIconSelector)
        browser.waitUntilVideoIsPlaying()
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
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
                    if (!videoEl) {
                      return false
                    }
                    const videoRect = videoEl.getBoundingClientRect()
                    const controlsEl = document.querySelector(controlsSelector)
                    if (!controlsEl) {
                      return false
                    }
                    const controlsRect = controlsEl.getBoundingClientRect()
                    const qualityEl = document.querySelector(
                      qualityMenuSelector
                    )
                    if (!qualityEl) {
                      return false
                    }
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

        browser.goToTestVideoUrl({
          embed,
          queryParams: {
            autoplay: false
          }
        })
      })

      it('should show the playback levels menu when the quality button is clicked', () => {
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitAndClick(overlaySelector)
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
        browser.waitAndClick(overlaySelector)
        browser.moveToObject(overlaySelector)
        browser.waitUntilQualityPopoverIsVisible()
        browser.waitAndClick(qualityButtonSelector)
        browser.waitUntilQualityPopoverIsNotVisible()
        browser.waitUntilControlsAreHidden()
      })

      it('should close the quality menu and hide the controls when the close button is clicked', () => {
        browser.goToTestVideoUrl({ embed })
        browser.waitAndClick(overlaySelector)
        browser.moveToObject(overlaySelector)
        browser.waitUntilControlsAreVisible()
        browser.waitUntilQualityPopoverIsNotVisible()
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
      const ptiBalanceSelector = '[data-test-id="pti-balance-wrapper"]'

      before(() => {
        browser.addCommand(
          'waitUntilWalletInfoIsNotVisible',
          () => {
            browser.waitUntil(() => !browser.isVisible(walletPopoverSelector))
          },
          true,
          'Could not verify that wallet info is not visible'
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
          true,
          'Could not verify that wallet info is visible'
        )
      })
      if (embed) {
        it('should show the wallet info when the wallet button is clicked', () => {
          browser.goToTestVideoUrl({ embed })
          browser.waitAndClick(overlaySelector)
          browser.waitUntilVideoIsPlaying()
          browser.waitAndClick(overlaySelector)
          browser.moveToObject(overlaySelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitAndClick(walletButtonSelector)
          browser.waitUntilWalletInfoIsVisible()
        })

        it('should not dismiss the controls as long as the wallet info is being displayed', () => {
          browser.waitUntilVideoIsPlaying()
          browser.waitUntilWalletInfoIsVisible()
          browser.waitUntilControlsAreVisible()
          browser.pause(5000)
          browser.waitUntilControlsAreVisible()
        })

        it('should close the wallet info menu and hide the controls when the button is clicked again', () => {
          browser.waitUntilVideoIsPlaying()
          browser.waitUntilWalletInfoIsVisible()
          browser.waitAndClick(walletButtonSelector)
          browser.waitUntilWalletInfoIsNotVisible()
          browser.waitUntilControlsAreHidden()
        })

        it('should close the wallet info and hide the controls menu when the close button is clicked', () => {
          browser.goToTestVideoUrl({ embed })
          browser.waitAndClick(overlaySelector)
          browser.waitUntilVideoIsPlaying()
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
              (shareOverlaySelector, shareAnchorLinkSelector, ID) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const anchorLinkEl = shareOverlayEl.querySelector(
                  shareAnchorLinkSelector
                )
                return (
                  anchorLinkEl.getAttribute('href') ===
                  `${window.location.origin}/play/${ID}`
                )
              },
              shareOverlaySelector,
              shareAnchorLinkSelector,
              ID
            ).value,
          undefined,
          'video link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (shareOverlaySelector, telegramShareLinkSelector, ID, TITLE) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const telegramEl = shareOverlayEl.querySelector(
                  telegramShareLinkSelector
                )
                return (
                  telegramEl.getAttribute('href') ===
                  `https://t.me/share/url?url=${
                    window.location.origin
                  }/play/${ID}&text=🎬 Worth a watch: ${TITLE}`
                )
              },
              shareOverlaySelector,
              telegramShareLinkSelector,
              ID,
              TITLE
            ).value,
          undefined,
          'telegram link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (shareOverlaySelector, twitterShareLinkSelector, ID, TITLE) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )

                const twitterEl = shareOverlayEl.querySelector(
                  twitterShareLinkSelector
                )
                return (
                  twitterEl.getAttribute('href') ===
                  `https://twitter.com/intent/tweet?url=${
                    window.location.origin
                  }/play/${ID}&text=🎬 Worth a watch: ${TITLE}`
                )
              },
              shareOverlaySelector,
              twitterShareLinkSelector,
              ID,
              TITLE
            ).value,
          undefined,
          'twitter link is incorrect'
        )

        browser.waitUntil(
          () =>
            browser.execute(
              (shareOverlaySelector, whatsAppShareLinkSelector, ID, TITLE) => {
                const shareOverlayEl = document.querySelector(
                  shareOverlaySelector
                )
                const whatsAppEl = shareOverlayEl.querySelector(
                  whatsAppShareLinkSelector
                )
                return (
                  whatsAppEl.getAttribute('href') ===
                  `whatsapp://send?text=🎬 Worth a watch: ${TITLE} ${
                    window.location.origin
                  }/play/${ID}`
                )
              },
              shareOverlaySelector,
              whatsAppShareLinkSelector,
              ID,
              TITLE
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

  describe('portal player', () => {
    runPlayerExpectations({ embed: false })
  })

  describe('embed player', () => {
    runPlayerExpectations({ embed: true })
  })
})
