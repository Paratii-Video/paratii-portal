import { createSelector } from 'reselect'

import { getIsLoggingIn, getUser } from 'selectors/index'

export const getIsLoggedIn = createSelector(
  [getUser, getIsLoggingIn], (user, isLoggingIn) => !!(user && user.get('email') && !isLoggingIn)
)
