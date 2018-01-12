/* @flow */

import { createAction } from 'redux-actions'
// import { paratii } from 'utils/ParatiiLib'

import { VIDEO_DATA_LOADED } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

export const videoDataLoaded = createAction(VIDEO_DATA_LOADED)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  // let videoInfo = await paratii.core.vids.get(id)
  // console.log(videoInfo)

  // paratii().then((lib) => {
  //   lib.core.vids
  //     .create({
  //       id,
  //       price: 0,
  //       owner: '0xa99dBd162ad5E1601E8d8B20703e5A3bA5c00Be7'
  //     })
  //     .then(() => {
  //       lib.core.vids
  //         .get('999')
  //         .then(res => {
  //           dispatch(videoDataLoaded(res))
  //         })
  //         .catch(e => {
  //           console.log('e: ', e)
  //         })
  //     })
  // })
}
