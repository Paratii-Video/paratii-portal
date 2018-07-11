/* @flow */

export const MIN_VOTE_PTI: number = 10

export const VOTE_STATE: Object = {
  COMMITTED: 'voteCommited', // vote is committed, we are in the reveal period
  REVEALED: 'voteSent', // uyser has  revealed his vote
  APPROVED: 'videoApproved' // TODO: probably better to handle this just as the "whileListed", "videoIsChallenged" constants
}
