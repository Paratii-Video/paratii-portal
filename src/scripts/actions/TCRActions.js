/* @flow */
import paratii from 'utils/ParatiiLib'
import { createAction } from 'redux-actions'
import type { Dispatch } from 'redux'
import {
  VOTE_VIDEO,
  VOTE_STATUS,
  VIDEO_CHALLENGED,
  TCR_RERENDER_COMPONENTS
} from 'constants/ActionConstants'
import { VOTE_STATE } from 'constants/TCRConstants'

export const voteVideo = createAction(VOTE_VIDEO)
export const setVoteStatus = createAction(VOTE_STATUS)
export const tcrRerenderComponents = createAction(TCR_RERENDER_COMPONENTS)
export const videoChallenged = createAction(VIDEO_CHALLENGED)

export const fetchChallenge = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  try {
    // TODO: this can be optimized: challenge info should already be aviabble
    // in the videoRecord in the redux state
    const challenge = await paratii.db.tcr.challenges.get(videoId)

    const userVote = await paratii.db.tcr.votes.get(
      challenge.id,
      paratii.getAccount()
    )
    const userVoteResult = userVote.results[0]
    let voteStatusValue = ''
    if (userVote && userVoteResult.voteCommitted) {
      voteStatusValue = VOTE_STATE.COMMITTED
    } else if (userVote && userVoteResult.voteRevealed) {
      voteStatusValue = VOTE_STATE.REVEALED
    }

    dispatch(voteVideo({ id: videoId, vote: userVoteResult.choice }))
    dispatch(setVoteStatus({ id: videoId, voteStatus: voteStatusValue }))
  } catch (e) {
    console.log(e.message)
    throw e
  }
}

export const fetchVoteStatus = (pollID: string) => async (
  dispatch: Dispatch<*>
) => {
  // FIXME get challenge from DB
  try {
    const userVote = await paratii.db.tcr.votes.get(
      pollID,
      paratii.getAccount()
    )
    return userVote
  } catch (e) {
    console.log(e.message)
    throw e
  }
}

export const revealYourVote = (pollID: string) => async (
  dispatch: Dispatch<*>
) => {
  console.log(`Revealing the vote for pollID ${pollID}`)
  const key = `vote=${pollID}`
  const serializedVote = localStorage.getItem(key)
  console.log(serializedVote)
  if (!serializedVote) {
    throw Error(`No vote found (looked for ${key})`)
  } else {
    const voteInfo = JSON.parse(serializedVote)
    console.log(voteInfo)
    const revealTx = await paratii.eth.tcr.revealVote(
      voteInfo.pollID,
      voteInfo.vote,
      voteInfo.salt
    )
    console.log(revealTx)
  }
}

export const storeVote = (voteInfo: Object) => async (
  dispatch: Dispatch<*>
) => {
  if (!voteInfo.videoId) {
    throw Error(`You must provide a videoId`)
  }
  localStorage.setItem(
    `vote-${voteInfo.videoId}`,
    JSON.stringify({
      salt: voteInfo.salt,
      vote: voteInfo.vote,
      pollID: voteInfo.pollID
    })
  )
}
