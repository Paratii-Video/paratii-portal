/* @flow */

import { createAction } from "redux-actions";
import Paratii from "paratii-lib";

const paratii = new Paratii();

import { SET_VIDEO_ID } from "constants/ActionConstants";

export const setVideoId = createAction(SET_VIDEO_ID);

export const fetchVideo = (id: string) => (getState, dispatch) => {
  console.log(paratii.eth.vids.get(id));
};
