/* @flow */

import { createAction } from "redux-actions";
import { ParatiiEth } from "paratii-lib/dist/bundle";

import { SET_VIDEO_ID } from "constants/ActionConstants";

const eth = new ParatiiEth({
  provider: "http://localhost:8545",
  registryAddress: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
  address: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
  privateKey:
    "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
});

export const setVideoId = createAction(SET_VIDEO_ID);

export const fetchVideo = (id: string) => (getState, dispatch) => {
  eth.vids
    .create({
      id: "0x90f8bf6a479",
      ipfsHash: "QmNZS5J3LS1tMEVEP3tz3jyd2LXUEjkYJHyWSuwUvHDaRJ",
      owner: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"
    })
    .then(() => {
      eth.vids
        .get("0x90f8bf6a479")
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log("e: ", e);
        });
    });
};
