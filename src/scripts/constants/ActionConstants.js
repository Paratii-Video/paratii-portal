/* @flow */

const createActionConstant = constant => `@@PARATII_PORTAL_${constant}`

export const VIDEO_DATA_LOADED = createActionConstant('VIDEO_DATA_LOADED')

/* Login Actions */
export const LOGIN_REQUESTED = createActionConstant('LOGIN_REQUESTED')
export const LOGIN_SUCCESS = createActionConstant('LOGIN_SUCCESS')
export const LOGIN_FAILURE = createActionConstant('LOGIN_FAILURE')
export const LOGOUT = createActionConstant('LOGOUT')

/* Upload Actions */
export const UPLOAD_REQUESTED = createActionConstant('UPLOAD_REQUESTED')
export const UPLOAD_PROGRESS = createActionConstant('UPLOAD_PROGRESS')
export const UPLOAD_FAILURE = createActionConstant('UPLOAD_FAILURE')
export const UPLOAD_SUCCESS = createActionConstant('UPLOAD_SUCCESS')
export const UPDATE_UPLOAD_INFO = createActionConstant('UPDATE_UPLOAD_INFO')

/* Save to blockchain actions */
export const VIDEO_DATA_START = createActionConstant('VIDEO_DATA_START')
export const VIDEO_DATA_PROGRESS = createActionConstant('VIDEO_DATA_PROGRESS')
export const VIDEO_DATA_SAVED = createActionConstant('VIDEO_DATA_SAVED')

/* Player Actions */
export const PLAYER_TOGGLE_PLAYPAUSE = createActionConstant(
  'PLAYER_TOGGLE_PLAYPAUSE'
)
