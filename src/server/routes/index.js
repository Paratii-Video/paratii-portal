const { getParatiiConfig } = require('utils/AppUtils')
const { Paratii } = require('paratii-lib')
const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
const paratii = new Paratii(paratiiConfig)

exports.default = function (req, res, next) {
  res.render('index', {
    helpers: {
      title: function () {
        return 'Paratii'
      },
      script: function () {
        return '<script type="text/javascript" src="/bundle.js"></script>'
      }
    }
  })
}
exports.player = async function player (req, res, next) {
  const { id } = req.params
  const path = req.route.path
  const video = await paratii.core.vids.get(id)
  const meta = ''

  res.render('index', {
    player: true,
    video: video,
    helpers: {
      title: function () {
        if (video !== null) {
          return video.title
        } else {
          return 'Video not found'
        }
      },
      width: function () {
        return 1920
      },
      height: function () {
        return 1080
      },
      thumbnailUrl: function () {
        const ipfsHash = video.ipfsHash
        const thumbName = video.transcodingStatus.data.result.screenshots[0]
        return (
          'https://gateway.paratii.video/ipfs/' + ipfsHash + '/' + thumbName
        )
      },
      videoUrl: function () {
        return 'https://portal.paratii.video/play/' + video._id
      },
      ipfsSource: function () {
        return `https://gateway.paratii.video/ipfs/` + video.ipfsHashOrig
      },
      embedUrl: function () {
        return 'https://portal.paratii.video/embed/' + video._id
      },
      meta: function () {
        return meta
      },
      embed: function () {
        return path === '/embed/:id'
      },
      script: function () {
        if (path === '/embed/:id') {
          return '<script type="text/javascript" src="/embed/bundle.js"></script>'
        } else if (path === '/video/:id') {
          return '<script type="text/javascript" src="/bundle.js"></script>'
        }
      }
    }
  })
}

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
