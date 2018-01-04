/* @flow */

import { createAction } from 'redux-actions'

import { LOGIN_REQUESTED } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

export const loginRequested = createAction(LOGIN_REQUESTED)

// export const fetchVideo = (id: string) => (dispatch: Dispatch<*>) => {
//   paratii().then((lib) => {
//     lib.core.vids
//       .create({
//         id,
//         price: 0,
//         owner: '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'
//       })
//       .then(() => {
//         lib.core.vids
//           .get('999')
//           .then(res => {
//             dispatch(videoDataLoaded(res))
//           })
//           .catch(e => {
//             console.log('e: ', e)
//           })
//       })
//   })
// }
export const login = (email: string, password: string) => (dispatch: Dispatch<*>) => {
  dispatch(loginRequested())
}
