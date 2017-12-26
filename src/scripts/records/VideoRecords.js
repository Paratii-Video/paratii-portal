/* @flow */

import { Record as ImmutableRecord } from "immutable";

class Video extends ImmutableRecord({
  id: null
}) {
  id: ?string;
}

export const _getVideoId = (state: Video): ?string => state.get("id");

export default Video;
