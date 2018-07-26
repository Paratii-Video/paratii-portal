/* @flow */

import { createSelector } from 'reselect'
// import { List as ImmutableList } from 'immutable'

import { getVideos, getPlayerVideoId } from 'selectors/index'

import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'
import type VideoRecord from 'records/VideoRecords'

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

export const getVoteStatus: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    const voteStatus = videos.getIn([playerVideoId, 'voteStatus'])
    return voteStatus
  }
)

// return the state of the logged-in user's vote, value is either 'voteCommitted' or 'voteRevealed'
export const getVoteState: (state: RootState) => ?VideoRecord = createSelector(
  [getVideos, getPlayerVideoId],
  (videos: VideoRecordMap, playerVideoId: string) => {
    const voteStatus = videos.getIn([playerVideoId, 'voteStatus'])
    if (voteStatus) {
      return 'voteCommitted'
    }
  }
)
