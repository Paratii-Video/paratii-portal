/* @flow */

const createActionConstant = constant => `@@PARATII_PORTAL_${constant}`

/* App Actions */
export const INITIALIZE = createActionConstant('INITIALIZE')

/* Video actions */
export const VIDEO_LOADED = createActionConstant('VIDEO_LOADED')
export const VIDEO_SELECT = createActionConstant('VIDEO_SELECT')
export const VIDEOFETCH_ERROR = createActionConstant('VIDEOFETCH_ERROR')
export const VIDEOFETCH_SUCCESS = createActionConstant('VIDEOFETCH_SUCCESS')

/* User Actions */
export const SET_WALLET_DATA = createActionConstant('SET_WALLET_DATA')
export const LOGIN_REQUESTED = createActionConstant('LOGIN_REQUESTED')
export const LOGIN_SUCCESS = createActionConstant('LOGIN_SUCCESS')
export const LOGIN_FAILURE = createActionConstant('LOGIN_FAILURE')
export const LOGOUT = createActionConstant('LOGOUT')
export const BALANCES_LOADED = createActionConstant('BALANCES_LOADED')

/* Upload Actions */
export const UPLOAD_REQUESTED = createActionConstant('UPLOAD_REQUESTED')
export const UPLOAD_PROGRESS = createActionConstant('UPLOAD_PROGRESS')
export const UPLOAD_FAILURE = createActionConstant('UPLOAD_FAILURE')
// local upload has finished
export const UPLOAD_LOCAL_SUCCESS = createActionConstant('UPLOAD_LOCAL_SUCCESS')
// upload to the "IPFS Cloud" is finished
export const UPLOAD_SUCCESS = createActionConstant('UPLOAD_SUCCESS')
export const UPDATE_VIDEO_INFO = createActionConstant('UPDATE_VIDEO_INFO')

/* Save to blockchain actions */
export const VIDEO_DATA_START = createActionConstant('VIDEO_DATA_START')
export const VIDEO_DATA_PROGRESS = createActionConstant('VIDEO_DATA_PROGRESS')
export const VIDEO_DATA_SAVED = createActionConstant('VIDEO_DATA_SAVED')

/* Player Actions */
export const PLAYER_TOGGLE_PLAYPAUSE = createActionConstant(
  'PLAYER_TOGGLE_PLAYPAUSE'
)
export const PLAYER_ATTEMPT_PLAY = createActionConstant('PLAYER_ATTEMPT_PLAY')

/* Transcoding actions */
export const TRANSCODING_REQUESTED = createActionConstant(
  'TRANSCODING_REQUESTED'
)
export const TRANSCODING_PROGRESS = createActionConstant('TRANSCODING_PROGRESS')
export const TRANSCODING_SUCCESS = createActionConstant('TRANSCODING_SUCCESS')
export const TRANSCODING_FAILURE = createActionConstant('TRANSCODING_FAILURE')
