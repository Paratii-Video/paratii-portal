/* @flow */

import { createSelector } from 'reselect'

import { getVideos, getPlayerVideoId } from 'selectors/index'
import VideoRecord from 'records/VideoRecords'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'

export const isVideoWhiteListed: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const playerVideo: ?VideoRecord = videos.get(playerVideoId)
      if (playerVideo) {
        return (
          playerVideo.getIn(['tcrStatus', 'data', 'staked', 'deposit']) !== ''
        )
      }
    }
    return null
  }
)

export const getTcrState: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const video: ?VideoRecord = videos.get(playerVideoId)
      if (video) {
        // - notInTcr: the default state, we get from the redux state, in tcrStatus.name === notInTcr
        // - appWasMade: after the app was made, we get this fromt eh redux state stcrStatus.name === 'appWasMade', AND NONE OF THE OTHER STATES APPLY
        // - inChallenge:  a challange was made (tcrStatus.challenge != {}) and currentTime < commitEndDate
        // - inReveal:  a challange was made (tcrStatus.challange != {}) and currentTime > commitEndDate and currentTime < revealEndDate
        // - videoApproved: currentTime > revealEnddata and isWhitelisted
        // - videoRejected: currentTime > revealEnddata and !isWhitelisted
        console.log('---------------------')
        console.log(video)
        const statusName = video.getIn(['tcrStatus', 'name'])
        if (statusName === 'notInTcr') {
          return statusName
        } else if (statusName === 'appWasMade') {
          // TODO: here we need to distinguish the other cases
          if (video.getIn(['tcrStatus', 'challenge', 'blockNumber'])) {
            const commitEndDate = video.getIn([
              'tcrStatus',
              'challenge',
              'commitEndDate'
            ])
            const revealEndDate = video.getIn([
              'tcrStatus',
              'challenge',
              'revealEndDate'
            ])
            const votesFor = video.getIn(['tcrStatus', 'challenge', 'votesFor'])
            const votesAgainst = video.getIn([
              'tcrStatus',
              'challenge',
              'votesAgainst'
            ])
            const now = Date.now()
            if (now <= commitEndDate) {
              return 'inChallenge'
            } else if (now <= revealEndDate) {
              return 'inReveal'
            } else if (votesAgainst > votesFor) {
              return 'videoRejected'
            } else {
              return 'videoApproved'
            }
          } else {
            return 'appWasMade'
          }
        } else {
          // this should not happen
          throw Error(`Unknown tcrStatus name in redux state: ${statusName}`)
        }
      }
    }
    return null
  }
)
