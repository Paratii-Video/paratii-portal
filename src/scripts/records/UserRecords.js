/* @flow */

import { Record as ImmutableRecord } from 'immutable'
import Cookies from 'js-cookie'

class User extends ImmutableRecord({
  email: null,
  name: 'John Doe', // TODO
  isLoggingIn: false
}) {
  email: string;
  name: string;
  isLoggingIn: boolean;

  constructor (email) {
    super({email: email, name: 'John Doe', isLoggingIn: false})
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
