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
export const updateChallenge = createAction(UPDATE_CHALLENGE)

export const fetchVoteStatus = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  console.log('get vote status')
  console.log(videoId)
  // FIXME get voteStatus form DB
  const voteStatusValue = VOTE_STATE.COMMITTED
  console.log(voteStatusValue)
  if (voteStatusValue) {
    dispatch(voteStatus({ id: videoId, voteStatus: voteStatusValue }))
  }
}

export const fetchChallenge = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  console.log('get challenge')
  // FIXME get voteStatus form DB
  // const challenge = awai
  // dispatch(updateChallenge({ id: videoId, voteStatus: voteStatusValue }))
}
