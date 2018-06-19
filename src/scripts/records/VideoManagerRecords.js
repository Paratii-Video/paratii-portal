/* @flow */

import { Record } from 'immutable'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'

import type { RequestStatus } from 'types/ApplicationTypes'

class VideoManager extends Record({
  videosRequestStatus: REQUEST_STATUS.NOT_STARTED
}) {
  videosRequestStatus: RequestStatus
}

export default VideoManager
