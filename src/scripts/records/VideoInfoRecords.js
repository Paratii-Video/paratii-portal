/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class VideoInfo extends ImmutableRecord({
  title: null,
  description: null
}) {
  title: ?string;
  description: ?string;
}
export default VideoInfo
