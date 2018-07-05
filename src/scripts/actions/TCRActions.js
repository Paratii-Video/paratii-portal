/* @flow */

import { createAction } from 'redux-actions'
import { VOTE_VIDEO } from 'constants/ActionConstants'

export const voteVideo = createAction(VOTE_VIDEO)
