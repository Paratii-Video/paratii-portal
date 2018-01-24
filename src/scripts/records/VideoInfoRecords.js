/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class VideoInfo extends ImmutableRecord({
  id: null,
  title: null,
  description: null,
  ipfsHash: null
}) {
  id: ?string;
  title: ?string;
  description: ?string;
  ipfsHash: ?string;
}
export default VideoInfo
