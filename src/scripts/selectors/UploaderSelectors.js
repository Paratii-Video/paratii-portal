/* @flow */

import { createSelector } from 'reselect'

import { getSelectedUploaderVideoId, getVideos } from 'selectors/index'
import paratii from 'utils/ParatiiLib'

import VideoRecord from 'records/VideoRecords'
import type { RootState, VideoRecordMap } from 'types/ApplicationTypes'

export const getUploaderVideos: (
  state: RootState
) => VideoRecordMap = createSelector(
  [getVideos],
  (videos: VideoRecordMap): VideoRecordMap =>
    videos.filter(
      (video: VideoRecord): boolean =>
        video.get('owner') === paratii.config.account.address
    )
)

export const getUploaderBusyVideos: (
  state: RootState
) => VideoRecordMap = createSelector(
  [getVideos],
  (videos: VideoRecordMap): VideoRecordMap =>
    videos.filter(
      (video: VideoRecord): boolean =>
        video.get('owner') === paratii.config.account.address &&
        video.getIn(['uploadStatus', 'name']) === 'running'
    )
)

export const getSelectedUploaderVideo: (
  state: RootState
) => ?VideoRecord = createSelector(
  [getVideos, getSelectedUploaderVideoId],
  (videos: VideoRecordMap, selectedVideoId: string) => {
    if (selectedVideoId) {
      const uploaderVideo: ?VideoRecord = videos.get(selectedVideoId)
      if (uploaderVideo) {
        return uploaderVideo
      }
    }
    return null
  }
)

// export const getUploadProgress: (
//   state: RootState
// ) => ?Number = createSelector(
//   [getSelectedUploaderVideo],
//   video => {
//     return (
//       (video &&
//         parseInt(video.getIn(['uploadStatus', 'data', 'progress']))) ||
//       0
//     )
//   }
// )
//
// export const getTranscodingProgress: (
//   state: RootState
// ) => ?Number = createSelector(
//   [getSelectedUploaderVideo],
//   video => {
//     return (
//       (video &&
//         parseInt(video.getIn(['transcodingStatus', 'data', 'progress']))) ||
//       0
//     )
//   }
// )
//
export const getTotalProgress: (state: RootState) => ?Number = createSelector(
  [getSelectedUploaderVideo],
  video => {
    if (!video) {
      return 0
    }
    // const uploadProgress = parseInt(video.uploadStatus.data.progress)
    const uploadProgress = 0
    // const transcodingProgress = parseInt(video.transcoderStatus.data.progress)
    const transcodingProgress =
      parseInt(video.getIn(['transcodingStatus', 'data', 'progress'])) || 0
    return Math.floor((uploadProgress + transcodingProgress) / 2) || 0
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
