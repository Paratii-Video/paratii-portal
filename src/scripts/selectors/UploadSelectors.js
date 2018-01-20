import { createSelector } from 'reselect'

import { getUpload } from 'selectors/index'

/* Upload */
export const getUploadProgress = createSelector(
  [getUpload], (upload) => {
    return upload.getIn(['uploadStatus', 'data', 'progress']) || 0
  }
)

export const getIsUploading = createSelector(
  [getUpload], (upload) => upload.getIn(['uploadStatus', 'name']) === 'running'
)

export const getHasVideoInfo = createSelector(
  [getUpload], (upload) => !!(upload.get('videoInfo').title)
)
