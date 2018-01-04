/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class User extends ImmutableRecord({
  email: null,
  name: 'John Doe', // TODO
  isLoggingIn: false
}) {
  email: string;
  name: string;
  isLoggingIn: boolean;
}

export default User
