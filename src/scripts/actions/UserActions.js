/* @flow */

import { createAction } from 'redux-actions'
import Promise from 'bluebird'
import Cookies from 'js-cookie'

import { LOGIN_REQUESTED, LOGIN_SUCCESS, LOGOUT } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

const loginRequested = createAction(LOGIN_REQUESTED)
const loginSuccess = createAction(LOGIN_SUCCESS)
const logoutAction = createAction(LOGOUT)

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const login = (email: string, password: string) => (dispatch: Dispatch<*>) => {
  dispatch(loginRequested())
  sleep(200).then(() => {
    Cookies.set('email', email)
    dispatch(loginSuccess({email}))
  })
}

export const logout = () => (dispatch: Dispatch<*>) => {
  dispatch(logoutAction())
  Cookies.remove('email')
}
