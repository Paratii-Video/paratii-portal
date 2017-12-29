/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class Video extends ImmutableRecord({
  id: '',
  ipfsData: '',
  ipfsHash: '',
  owner: '',
  price: ''
}) {
  id: string;
  ipfsData: string;
  ipfsHash: string;
  owner: string;
  price: string;
}

export default Video
