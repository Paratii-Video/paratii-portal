/* @flow */

import { createAction } from 'redux-actions'
import type { Dispatch } from 'redux'
import { VOTE_VIDEO, VOTE_STATUS } from 'constants/ActionConstants'
import { VOTE_STATE } from 'constants/TCRConstants'

export const voteVideo = createAction(VOTE_VIDEO)
export const voteStatus = createAction(VOTE_STATUS)

export const fetchChallenge = (videoId: string) => async (
  dispatch: Dispatch<*>
) => {
  // FIXME get challenge from DB
  try {
    // const challenge = await paratii.eth.tcr.challenge.get(videoId)
    // Fixture
    const challenge = {
      id: 0x1234,
      listingHash: 0x12345,
      rewardPool: 5e18,
      challenger: 0x12345,
      resolved: true,
      stake: 10e18,
      totalTokens: 14e18,
      voterCanClaimReward: false,
      commitStartDate: 1530741082,
      commitEndDate: 1530741182,
      // revealStartDate (aka commitEndDate)
      revealEndDate: 1530741282,
      voteQuorum: 30,
      votesFor: 3e18,
      votesAgainst: 4e18
    }
    console.log(challenge)

    // const userVote = await paratii.eth.tcr.votes.get(challenge.id, paratii.getAccount())
    const userVote = {
      total: 1,
      hasNext: false,
      results: [
        {
          id: 12354,
          voter: 0x12454,
          pollID: 0x12354,
          numTokens: 2e18,
          choice: 0, // choice is either 0 or 1, or null
          voteCommitted: 1245, // timestamp,
          voteRevealed: 12345
        }
      ]
    }

    const userVoteResult = userVote.results[0]
    let voteStatusValue = ''
    if (userVote && userVoteResult.voteCommitted) {
      voteStatusValue = VOTE_STATE.COMMITTED
    } else if (userVote && userVoteResult.voteRevealed) {
      voteStatusValue = VOTE_STATE.REVEALED
    }

    dispatch(voteVideo({ id: videoId, vote: userVoteResult.choice }))
    dispatch(voteStatus({ id: videoId, voteStatus: voteStatusValue }))
  } catch (e) {
    console.log(e.message)
  }
}
