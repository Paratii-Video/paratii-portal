/* @flow */

import { Record as ImmutableRecord } from 'immutable'

export const _getSelectedUploaderVideoId = (state: Uploader): string =>
  state.get('selectedVideoId')

class Uploader extends ImmutableRecord({
  selectedVideoId: ''
}) {
  selectedVideoId: ?string
}

export default Uploader
