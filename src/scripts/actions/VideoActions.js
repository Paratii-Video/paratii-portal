/* @flow */

import { createAction } from 'redux-actions'
import paratii from 'util/ParatiiLib'

import { SET_VIDEO_ID } from 'constants/ActionConstants'

paratii().core.vids
  .create({
    id: '0x90f8bf6a479',
    // ipfsHash: "QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ",
    owner: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1'
  })
  .then(() => {
    paratii().core.vids
      .get('0x90f8bf6a479')
      .then(res => {
        console.log(res)
      })
      .catch(e => {
        console.log('e: ', e)
      })
  })

export const setVideoId = createAction(SET_VIDEO_ID)

export const fetchVideo = (id: string) => (getState, dispatch) => {
  // paratii.core.vids
  //   .create({
  //     id: "0x90f8bf6a479",
  //     // ipfsHash: "QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ",
  //     owner: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"
  //   })
  //   .then(() => {
  //     paratii.core.vids
  //       .get("0x90f8bf6a479")
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(e => {
  //         console.log("e: ", e);
  //       });
  //   });
}
