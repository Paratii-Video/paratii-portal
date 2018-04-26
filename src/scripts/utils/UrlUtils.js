/* @flow */

import Video from 'records/VideoRecords'

const defaultThumbnailUrl: string =
  'https://paratii.video/public/images/paratii-src.png'

export const getVideoThumbnailUrl = (video: Video): string => {
  const thumbnails = video.get('thumbnails')
  const ipfsHash = video.get('ipfsHash')
  if (thumbnails && ipfsHash) {
    const firsThumbUrl = thumbnails.get(0)
    if (firsThumbUrl !== undefined) {
      return `https://gateway.paratii.video/ipfs/${ipfsHash}/${firsThumbUrl}`
    }
  }

  return defaultThumbnailUrl
}

export const getVideoPlayUrl = (video: Video): string =>
  `/play/${video.get('id')}`
