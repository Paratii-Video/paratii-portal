exports.notFoundVideo = function notFoundVideo (meta) {
  meta += `<title>Video not found</title>`
  return meta
}
exports.openGraphHead = function openGraphHead (meta, video) {
  const ipfsHash = video.ipfsHash
  const thumbName = video.transcodingStatus.data.result.screenshots[0]
  const thumbnailUrl =
    'https://gateway.paratii.video/ipfs/' + ipfsHash + '/' + thumbName
  const embedUrl = `https://portal.paratii.video/embed/${video._id}`
  const height = `1080`
  const width = `1920`
  meta += `<meta property="og:video:url" content="${embedUrl}">`
  meta += `<meta property="og:video:secure_url" content="${embedUrl}">`
  meta += `<meta property="og:video:type" content="text/html">`
  meta += `<meta property="og:video:width" content="${width}" />`
  meta += `<meta property="og:video:height" content="${height}" />`
  meta += `<meta property="og:type" content="video.other" />`
  meta += `<meta property="og:url" content="${embedUrl}" />`
  meta += `<meta property="og:title" content="${video.title}" />`
  meta += `<meta property="og:image" content="${thumbnailUrl}" />`
  meta += `<meta property="og:description" content="${video.description}" />`

  return meta
}

exports.twitterCardHead = function twitterCardHead (meta, video) {
  const ipfsHash = video.ipfsHash
  const thumbName = video.transcodingStatus.data.result.screenshots[0]
  const thumbnailUrl =
    'https://gateway.paratii.video/ipfs/' + ipfsHash + '/' + thumbName
  const ipfsSource = `https://gateway.paratii.video/ipfs/` + video.ipfsHashOrig
  const url = `https://portal.paratii.video/play/${video._id}`
  const embedUrl = `https://portal.paratii.video/embed/${video._id}`

  meta += `<title>${video.title}</title>`
  meta += `<meta name="description" content="${video.description}">`
  meta += `<meta property="twitter:card" content="player" />`
  meta += `<meta property="twitter:title" content="${video.title}" />`
  meta += `<meta property="twitter:site" content="${url}">`
  meta += `<meta property="twitter:player:width" content="490" />`
  meta += `<meta property="twitter:player:height" content="280" />`
  meta += `<meta property="twitter:image" content="${thumbnailUrl}" />`
  meta += `<meta property="twitter:player:stream" content="${ipfsSource}" />`
  meta += `<meta property="twitter:player" content="${embedUrl}" />`

  return meta
}

exports.basicHead = function basicHead (meta) {
  meta += '<title>Paratii</title>'
  meta += '<meta charset="utf-8">'
  meta +=
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'
  meta +=
    '<meta name="description" content="Paratii project is developing a video player upon p2p streaming and decentralized service providers to put revenue 100% in control of producers.">'
  return meta
}
