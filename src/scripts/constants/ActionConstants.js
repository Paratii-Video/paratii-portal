/* @flow */

const createActionConstant = constant => `@@PARATII_PORTAL_${constant}`

export const VIDEO_DATA_LOADED = createActionConstant('VIDEO_DATA_LOADED')

/* Login Actions */
export const LOGIN_REQUESTED = createActionConstant('LOGIN_REQUESTED')
export const LOGIN_SUCCESS = createActionConstant('LOGIN_SUCCESS')
export const LOGIN_FAILURE = createActionConstant('LOGIN_FAILURE')
export const LOGOUT = createActionConstant('LOGOUT')
