/* @flow */

import { createSelector } from 'reselect'

import { getSelectedUploaderVideoId, getVideos } from 'selectors/index'

import type VideoRecord from 'records/VideoRecords'
import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'

/* Upload */
export const getSelectedUploaderVideo: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getSelectedUploaderVideoId],
  (videos: VideoRecordMap, selectedVideoId: string) => {
    if (selectedVideoId) {
      const playerVideo: ?VideoRecord = videos.get(selectedVideoId)
      if (playerVideo) {
        return playerVideo
      }
    }

    return null
  }
)

export const getUploadProgress = createSelector(
  [getSelectedUploaderVideo],
  upload => {
    return (upload && upload.getIn(['uploadStatus', 'data', 'progress'])) || 0
  }
)

export const getIsUploading = createSelector(
  [getSelectedUploaderVideo],
  upload => upload && upload.getIn(['uploadStatus', 'name']) === 'running'
)

export const getHasVideoInfo = createSelector(
  [getSelectedUploaderVideo],
  upload => upload && !!upload.getIn(['videoInfo', 'title'])
)

export const getShowUploadFile = createSelector(
  [getSelectedUploaderVideo],
  upload => {
    return upload && upload.getIn(['uploadStatus', 'name']) === 'idle'
  }
)

export const getShowEditVideoInfo = createSelector(
  [getSelectedUploaderVideo, getHasVideoInfo],
  (upload, hasVideoInfo) => {
    const uploadStatus = upload && upload.getIn(['uploadStatus', 'name'])
    return uploadStatus !== 'idle' && !hasVideoInfo
  }
)

export const getShowVideoInfo = createSelector(
  [getSelectedUploaderVideo, getHasVideoInfo],
  (upload, hasVideoInfo) => {
    const uploadStatus = upload && upload.getIn(['uploadStatus', 'name'])
    return uploadStatus !== 'idle' && hasVideoInfo
  }
)

export const getIpfsHash = createSelector(
  [getSelectedUploaderVideo],
  upload => {
    const uploadStatus = upload && upload.getIn(['transcodingStatus', 'name'])
    return uploadStatus === 'success'
      ? upload.getIn(['transcodingStatus', 'data', 'ipfsHash'])
      : ''
  }
)
