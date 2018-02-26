import type { $Request, $Response } from 'express'
import { Paratii } from 'paratii-lib/dist/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
const paratii = new Paratii(paratiiConfig)

module.exports = async (req: $Request, res: $Response) => {
  var oembedresponse = {}
  if (req.query.url === undefined) {
    oembedresponse.error = 'urlMissing'
    res.end(JSON.stringify(oembedresponse))
  }

  const baseUrl = 'https://portal.paratii.video'
  const parsedExternalUrl = parseUrl(req.query.url)
  const parsedInternalUrl = parseUrl('http://localhost:8080')
  console.log(parsedInternalUrl)
  console.log(parsedExternalUrl)
  res.setHeader('Content-Type', 'application/json')

  if (
    parsedExternalUrl.protocol === parsedInternalUrl.protocol &&
    parsedExternalUrl.host === parsedInternalUrl.host &&
    parsedExternalUrl.port === parsedInternalUrl.port
  ) {
    // url match

    // Get video id from the path
    const videoId = parsedExternalUrl.path.split('/')[2]
    const video = await paratii.core.vids.get(videoId)

    // console.log(video)
    // If video exist build response
    if (video) {
      const thumbUrl =
        'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png'
      var videoTitle = video.title
      var videoDescription = video.description
      var creatorName = video.author
      oembedresponse.success = 'true'
      oembedresponse.version = '1.0'
      oembedresponse.type = 'rich'
      oembedresponse.title = videoTitle
      oembedresponse.description = videoDescription
      oembedresponse.provider_name = creatorName
      oembedresponse.provider_url = baseUrl
      oembedresponse.author_name = creatorName
      // TODO: creatore page it's not defined
      // oembedresponse.author_url = 'Creator url, maybe the channel?'
      // TODO: get iframe code of the mini version
      oembedresponse.html =
        '<iframe src="' +
        baseUrl +
        '/embed/' +
        videoId +
        '?type=mini" width="490" height="280" frameborder="0"></iframe>'
      oembedresponse.width = 490
      oembedresponse.height = 280
      oembedresponse.thumbnail_url = thumbUrl
      oembedresponse.thumbnail_width = 490
      oembedresponse.thumbnail_height = 280
      oembedresponse.referrer = ''
      oembedresponse.cache_age = 3600
    } else {
      // if not video exist i return a not found response
      oembedresponse.error = 'videoNotFound'
    }
  } else {
    // url don't match, denied
    oembedresponse.error = 'denied'
  }

  res.end(JSON.stringify(oembedresponse))
}

function parseUrl (url) {
  var match = url.match(
    /^(http|https|ftp)?(?:[:/]*)([a-z0-9.-]*)(?::([0-9]+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i
  )
  var ret = {}

  ret['protocol'] = ''
  ret['host'] = match[2]
  ret['port'] = ''
  ret['path'] = ''
  ret['query'] = ''
  ret['fragment'] = ''

  if (match[1]) {
    ret['protocol'] = match[1]
  }

  if (match[3]) {
    ret['port'] = match[3]
  }

  if (match[4]) {
    ret['path'] = match[4]
  }

  if (match[5]) {
    ret['query'] = match[5]
  }

  if (match[6]) {
    ret['fragment'] = match[6]
  }

  return ret
}
