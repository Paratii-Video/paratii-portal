// VideoOperators.js

export const isVideoUploaded = video =>
  video && video.getIn(['uploadStatus', 'name']) === 'success'

export const isVideoPublished = video =>
  video && video.getIn(['staked', 'deposit']) !== ''

export const isVideoPublishable = video =>
  video &&
  video.getIn(['transcodingStatus', 'name']) === 'success' &&
  video.isPublished !== true

export const videoDuration = video => (video && video.get('duration')) || ''

export const videoProgress = video => {
  const uploadProgress = video.getIn(['uploadStatus', 'data', 'progress'])
  const transcodingStatus = video.getIn([
    'transcodingStatus',
    'data',
    'progress'
  ])
  const progress = Math.ceil((uploadProgress + transcodingStatus) / 2)
  return progress
}
