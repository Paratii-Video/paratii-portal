/* @flow */

import { createSelector } from 'reselect'
// import { List as ImmutableList } from 'immutable'

import { getVideos, getPlayerVideoId } from 'selectors/index'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'
import type VideoRecord from 'records/VideoRecords'

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

export const getChallenge: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const video: ?VideoRecord = videos.get(playerVideoId)
      if (video) {
        return video.getIn(['tcrStatus', 'data', 'challenge'])
      }
    }
    return null
  }
)

export const getTcrStatusRecord: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const video: ?VideoRecord = videos.get(playerVideoId)
      if (video) {
        return video.getIn(['tcrStatus'])
      }
    }
  }
)

export const getTcrState: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    const now = new Date() / 1000
    if (playerVideoId) {
      const video: ?VideoRecord = videos.get(playerVideoId)
      if (video) {
        // - notInTcr: the default state, we get from the redux state, in tcrStatus.name === notInTcr
        // - appWasMade: after the app was made, we get this fromt eh redux state stcrStatus.name === 'appWasMade', AND NONE OF THE OTHER STATES APPLY
        // - inChallenge:  a challange was made (tcrStatus.challenge != {}) and currentTime < commitEndDate
        // - inReveal:  a challange was made (tcrStatus.challange != {}) and currentTime > commitEndDate and currentTime < revealEndDate
        // - videoApproved: currentTime > revealEnddata and isWhitelisted
        // - videoRejected: currentTime > revealEnddata and !isWhitelisted
        const statusName = video.getIn(['tcrStatus', 'name'])
        if (statusName === 'notInTcr') {
          return statusName
        } else if (statusName === 'appWasMade') {
          // TODO: here we need to distinguish the other cases
          if (video.getIn(['tcrStatus', 'data', 'challenge', 'challenger'])) {
            const commitEndDate = video.getIn([
              'tcrStatus',
              'data',
              'challenge',
              'commitEndDate'
            ])
            const revealEndDate = video.getIn([
              'tcrStatus',
              'data',
              'challenge',
              'revealEndDate'
            ])
            const votesFor = video.getIn([
              'tcrStatus',
              'data',
              'challenge',
              'votesFor'
            ])
            const votesAgainst = video.getIn([
              'tcrStatus',
              'data',
              'challenge',
              'votesAgainst'
            ])

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

export const getVideoVote: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    if (playerVideoId) {
      const playerVideo: ?VideoRecord = videos.get(playerVideoId)
      if (playerVideo) {
        return playerVideo.vote
      }
    }

    return null
  }
)

export const getVoteStatusRecord: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    const voteStatus = videos.getIn([playerVideoId, 'voteStatus'])
    console.log(voteStatus)
    return voteStatus
  }
)

// return the state of the logged-in user's vote, value is either 'voteCommitted' or 'voteRevealed'
export const getVoteState: (state: RootState) => ?string = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    const voteStatus = videos.getIn([playerVideoId, 'voteStatus', 'name'])
    return voteStatus
  }
)
