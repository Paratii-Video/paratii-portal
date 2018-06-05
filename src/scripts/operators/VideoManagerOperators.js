/* @flow */

import VideoManager from 'records/VideoManagerRecords'

import type { RequestStatus } from 'types/ApplicationTypes'

const VIDEOS_REQUEST_STATUS_KEY: string = 'videosRequestStatus'
export const getVideoRequestStatus = (videoManager: VideoManager) =>
  videoManager.get(VIDEOS_REQUEST_STATUS_KEY)
export const setVideoRequestStatus = (
  status: RequestStatus,
  videoManager: VideoManager
) => videoManager.set(VIDEOS_REQUEST_STATUS_KEY, status)
