/* @flow */

import { handleActions } from "redux-actions";

import { SET_VIDEO_ID } from "constants/ActionConstants";
import VideoRecord from "records/VideoRecords";

import type { Action } from "types/ApplicationTypes";

const reducer = {
  [SET_VIDEO_ID]: (
    state: VideoRecord,
    { payload }: Action<string>
  ): VideoRecord => state.set("id", payload)
};

export default handleActions(reducer, new VideoRecord());
