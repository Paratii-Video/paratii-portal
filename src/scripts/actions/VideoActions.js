/* @flow */

import { createAction } from 'redux-actions'

import { VIDEO_DATA_LOADED } from 'constants/ActionConstants'

import type { Dispatch } from 'redux'

export const videoDataLoaded = createAction(VIDEO_DATA_LOADED)

export const fetchVideo = (id: string) => async (dispatch: Dispatch<*>) => {
  console.log('fetching video info for video with id: ' + id)
  let videoInfo = await window.paratii.eth.vids.get(id)
  // TODO: previous line should be replaced with next line once the db is updated
  // let videoInfo = await paratii.core.vids.get(id)
  console.log(`Received video info`)
  dispatch(videoDataLoaded(videoInfo))
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
