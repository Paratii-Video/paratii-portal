/* @flow */

import { Map } from 'immutable'
import { expect } from 'chai'

import mockGetState from 'unit-tests/test-utils/mockGetState'

import Player from 'records/PlayerRecords'
import Video from 'records/VideoRecords'

import * as PlayerSelectors from 'selectors/PlayerSelectors'

const defaultVideosMap = Map({
  '987': new Video({
    duration: '10:22'
  }),
  '123': new Video({
    duration: '05:24'
  })
})

describe('PlayerSelectors', () => {
  describe('getFormattedCurrentTime', () => {
    it('should format the current time in the player correctly', () => {
      const getState = mockGetState({
        player: new Player({
          currentTimeSeconds: 120,
          selectedVideoId: '123'
        }),
        videos: defaultVideosMap
      })
      expect(PlayerSelectors.getFormattedCurrentTime(getState())).to.equal(
        '02:00'
      )
    })

    it('should return the formatted video duration if the current player time is great than the duration', () => {
      const getState = mockGetState({
        player: new Player({
          currentTimeSeconds: 9999999,
          selectedVideoId: '123'
        }),
        videos: defaultVideosMap
      })
      expect(PlayerSelectors.getFormattedCurrentTime(getState())).to.equal(
        '05:24'
      )
    })
  })
})
