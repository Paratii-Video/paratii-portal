/* @flow */

import { createSelector } from 'reselect'

import { getIsLoggingIn, getUser } from 'selectors/index'

import type { RootState } from 'types/ApplicationTypes'

export const getIsLoggedIn: (state: RootState) => boolean = createSelector(
  [getUser, getIsLoggingIn],
  (user, isLoggingIn) => !!(user.get('email') && !isLoggingIn)
)
