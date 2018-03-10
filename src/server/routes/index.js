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
