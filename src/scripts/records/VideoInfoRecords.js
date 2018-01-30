/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class VideoInfo extends ImmutableRecord({
  id: null,
  title: null,
  description: null,
  ipfsHash: null,
  owner: null
}) {
  id: ?string;
  title: ?string;
  description: ?string;
  ipfsHash: ?string;
  owner: ?string;
}
export default VideoInfo
