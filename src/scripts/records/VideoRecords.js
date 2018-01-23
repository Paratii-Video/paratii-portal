/* @flow */

import { Record as ImmutableRecord } from 'immutable'

class Video extends ImmutableRecord({
  description: '',
  id: '',
  ipfsData: '',
  ipfsHash: '',
  owner: '',
  price: '',
  thumbnailUrl: '',
  title: '',
  url: ''
}) {
  description: string;
  id: string;
  ipfsData: string;
  ipfsHash: string;
  owner: string;
  price: string;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export default Video
