/* @flow */

const createActionConstant = constant => `@@PARATII_PORTAL_${constant}`

/* App Actions */
export const INITIALIZE = createActionConstant('INITIALIZE')

/* Global Actions */
export const SET_CONTEXT = createActionConstant('SET_CONTEXT')

/* Video actions */
export const PLAYER_VIDEO_SELECT = createActionConstant('PLAYER_VIDEO_SELECT')
export const VIDEOFETCH_ERROR = createActionConstant('VIDEOFETCH_ERROR')
export const VIDEO_FETCH_SUCCESS = createActionConstant('VIDEO_FETCH_SUCCESS')
export const VIDEOS_FETCH_REQUESTED = createActionConstant(
  'VIDEOS_FETCH_REQUESTED'
)
export const VIDEOS_FETCH_FAILED = createActionConstant('VIDEOS_FETCH_FAILED')
export const VIDEOS_FETCH_SUCCESS = createActionConstant('VIDEOS_FETCH_SUCCESS')

/* User Actions */
export const SET_WALLET_DATA = createActionConstant('SET_WALLET_DATA')
export const SET_WALLET_ADDRESS = createActionConstant('SET_WALLET_ADDRESS')
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
export const UPLOAD_REMOTE_SUCCESS = createActionConstant(
  'UPLOAD_REMOTE_SUCCESS'
)
export const UPDATE_VIDEO_INFO = createActionConstant('UPDATE_VIDEO_INFO')
export const UPLOAD_VIDEO_SELECT = createActionConstant('UPLOAD_VIDEO_SELECT')

/* Staking actions */
export const VIDEO_STAKED = createActionConstant('VIDEO_STAKED')

/* Save to blockchain actions */
export const VIDEO_DATA_START = createActionConstant('VIDEO_DATA_START')
export const VIDEO_DATA_PROGRESS = createActionConstant('VIDEO_DATA_PROGRESS')
export const VIDEO_DATA_SAVED = createActionConstant('VIDEO_DATA_SAVED')

/* Player Actions */
export const PLAYER_TOGGLE_PLAYPAUSE = createActionConstant(
  'PLAYER_TOGGLE_PLAYPAUSE'
)
export const PLAYER_SET_FULLSCREEN = createActionConstant(
  'PLAYER_SET_FULLSCREEN'
)
export const PLAYER_ATTEMPT_PLAY = createActionConstant('PLAYER_ATTEMPT_PLAY')
export const UPDATE_VIDEO_TIME = createActionConstant('UPDATE_VIDEO_TIME')
export const UPDATE_VIDEO_BUFFERED_TIME = createActionConstant(
  'UPDATE_VIDEO_BUFFERED_TIME'
)
export const PLAYER_UPDATE_VOLUME = createActionConstant('PLAYER_UPDATE_VOLUME')
export const PLAYBACK_LEVELS_LOADED = createActionConstant(
  'PLAYBACK_LEVELS_LOADED'
)
export const PLAYBACK_LEVEL_SET = createActionConstant('PLAYBACK_LEVEL_SET')
export const PLAYER_TOGGLE_ACTIVE_PLUGIN = createActionConstant(
  'PLAYER_TOGGLE_ACTIVE_PLUGIN'
)
export const PLAYER_RESET = createActionConstant('PLAYER_RESET')

/* Transcoding actions */
export const TRANSCODING_REQUESTED = createActionConstant(
  'TRANSCODING_REQUESTED'
)
export const TRANSCODING_PROGRESS = createActionConstant('TRANSCODING_PROGRESS')
export const TRANSCODING_SUCCESS = createActionConstant('TRANSCODING_SUCCESS')
export const TRANSCODING_FAILURE = createActionConstant('TRANSCODING_FAILURE')

export const OPEN_MODAL = createActionConstant('OPEN_MODAL')
export const CLOSE_MODAL = createActionConstant('CLOSE_MODAL')

/* Search actions */
export const SEARCH_INPUT_CHANGED = createActionConstant('SEARCH_INPUT_CHANGED')
export const SEARCH_STARTED = createActionConstant('SEARCH_STARTED')
export const SEARCH_RESULTS_LOADED = createActionConstant(
  'SEARCH_RESULTS_LOADED'
)
export const SEARCH_FAILED = createActionConstant('SEARCH_FAILED')
export const ADDITIONAL_SEARCH_STARTED = createActionConstant(
  'ADDITIONAL_SEARCH_STARTED'
)
export const ADDITIONAL_SEARCH_RESULTS_LOADED = createActionConstant(
  'ADDITIONAL_SEARCH_RESULTS_LOADED'
)
export const ADDITIONAL_SEARCH_FAILED = createActionConstant(
  'ADDITIONAL_SEARCH_FAILED'
)

/* Tipping actions */
export const TIP_VIDEO_COMPLETED: string = createActionConstant(
  'TIP_VIDEO_COMPLETED'
)
