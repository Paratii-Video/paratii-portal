const { getParatiiConfig, getAppRootUrl } = require('utils/AppUtils')
const { APP_TITLE } = require('constants/ApplicationConstants')
const { Paratii } = require('paratii-js')
const paratiiConfig = getParatiiConfig(process.env.NODE_ENV, 'server')
const paratii = new Paratii(paratiiConfig)

exports.default = function (req, res, next) {
  res.render('index', {
    translations: req.translations,
    helpers: {
      title: function () {
        return APP_TITLE
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
  const video = await paratii.vids.get(id)
  const appRootUrl = getAppRootUrl(process.env.NODE_ENV)
  const translations = req.translations

  res.render('index', {
    player: true,
    video: video,
    embed: path === '/embed/:id',
    translations,
    helpers: {
      title: function () {
        if (video !== null) {
          if (video.title === '') {
            return video.filename
          } else {
            return video.title
          }
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
        let thumbName = ''
        if (video.thumbnails && video.thumbnails.length > 0) {
          thumbName = video.thumbnails[0]
        }
        return (
          'https://gateway.paratii.video/ipfs/' + ipfsHash + '/' + thumbName
        )
      },
      videoUrl: function () {
        return `${appRootUrl}/${video.id}`
      },
      ipfsSource: function () {
        return `https://gateway.paratii.video/ipfs/` + video.ipfsHashOrig
      },
      embedUrl: function () {
        return `https://portal.paratii.video/embed/${video.id}`
      },
      oembedUrl: function () {
        return `https://portal.paratii.video/oembed?url=`
      }
    }
  })
}
