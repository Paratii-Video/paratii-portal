/* @flow */

import User from 'records/UserRecords'

export const getEmail = (user: User): string => user.get('email')

export const getEmailIsVerified = (user: User): boolean =>
  user.get('emailIsVerified')

export const getName = (user: User): string => user.get('name')
