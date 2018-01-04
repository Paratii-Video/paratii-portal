/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'

import { LOGIN_REQUESTED, LOGIN_SUCCESS } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

export const loginRequested = createAction(LOGIN_REQUESTED)
export const loginSuccess = createAction(LOGIN_SUCCESS)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const login = (email: string, password: string) => (dispatch: Dispatch<*>) => {
  dispatch(loginRequested())
  sleep(2000).then(() => {
    dispatch(loginSuccess({email}))
    // TODO: redirect to profile
  })
}
