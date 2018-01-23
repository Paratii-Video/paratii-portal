/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class VideoInfo extends ImmutableRecord({
  id: null,
  title: null,
  description: null
}) {
  id: ?string;
  title: ?string;
  description: ?string;
}
export default VideoInfo
