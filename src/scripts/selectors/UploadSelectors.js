import { createSelector } from 'reselect'

import { getUpload } from 'selectors/index'

/* Upload */
export const getUploadProgress = createSelector([getUpload], upload => {
  return upload.getIn(['uploadStatus', 'data', 'progress']) || 0
})

export const getIsUploading = createSelector(
  [getUpload],
  upload => upload.getIn(['uploadStatus', 'name']) === 'running'
)

export const getHasVideoInfo = createSelector(
  [getUpload],
  upload => !!upload.getIn(['videoInfo', 'title'])
)

export const getShowUploadFile = createSelector([getUpload], upload => {
  return upload.getIn(['uploadStatus', 'name']) === 'idle'
})

export const getShowEditVideoInfo = createSelector(
  [getUpload, getHasVideoInfo],
  (upload, hasVideoInfo) => {
    const uploadStatus = upload.getIn(['uploadStatus', 'name'])
    return uploadStatus !== 'idle' && !hasVideoInfo
  }
)

export const getShowVideoInfo = createSelector(
  [getUpload, getHasVideoInfo],
  (upload, hasVideoInfo) => {
    const uploadStatus = upload.getIn(['uploadStatus', 'name'])
    return uploadStatus !== 'idle' && hasVideoInfo
  }
)

export const getIpfsHash = createSelector([getUpload], upload => {
  const uploadStatus = upload.getIn(['uploadStatus', 'name'])
  return uploadStatus === 'success'
    ? upload.getIn(['uploadStatus', 'data', 'ipfsHash'])
    : ''
})
