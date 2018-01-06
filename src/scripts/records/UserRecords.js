/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import Cookies from 'js-cookie'

class User extends ImmutableRecord({
  email: null,
  name: 'John Doe', // TODO
  isLoggingIn: false,
  keepUrl: true
}) {
  email: string;
  name: string;
  isLoggingIn: boolean;
  keepUrl: boolean;

  constructor (email?: string) {
    super({email: email})
  }

  static fromCookies () {
    const email = Cookies.get('email')
    if (email) {
      return new User(email)
    } else {
      return new User()
    }
  }
}

export default User
