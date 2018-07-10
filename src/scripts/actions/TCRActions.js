/* @flow */

import { createAction } from 'redux-actions'
import type { Dispatch } from 'redux'
import {
  VOTE_VIDEO,
  VOTE_STATUS,
  UPDATE_CHALLENGE
} from 'constants/ActionConstants'
import { VOTE_STATE } from 'constants/TCRConstants'

export const voteVideo = createAction(VOTE_VIDEO)
export const voteStatus = createAction(VOTE_STATUS)
export const fetchChallengeSuccess = createAction(UPDATE_CHALLENGE)

// export const fetchVoteStatus = (videoId: string) => async (
//   dispatch: Dispatch<*>
// ) => {
//   // FIXME get voteStatus from DB
//   const voteStatusValue = VOTE_STATE.COMMITTED
//   console.log(voteStatusValue)
//   if (voteStatusValue) {
//     dispatch(voteStatus({ id: videoId, voteStatus: voteStatusValue }))
//   }
// }

export const fetchChallenge = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  // FIXME get challenge from DB
  try {
    // const challenge = await paratii.eth.tcr.challenge.get(videoId)
    const voteStatusValue = VOTE_STATE.COMMITTED
    console.log(voteStatusValue)
    if (voteStatusValue) {
      dispatch(
        fetchChallengeSuccess({
          id: videoId,
          voteStatus: voteStatusValue
        })
      )
    }
  } catch (e) {}
}

export const fetchUserVote = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  try {
    // FIXME get user vote from DB
    // get vote value
    const voteValue = 1
    dispatch(voteVideo({ id: videoId, vote: voteValue }))
    // get vote status
    const voteStatusValue = VOTE_STATE.COMMITTED
    dispatch(voteStatus({ id: videoId, voteStatus: voteStatusValue }))
    // get total token staked for this video
  } catch (e) {}
}
