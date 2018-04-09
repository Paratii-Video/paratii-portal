/* @flow */

import type { $Request, $Response } from 'express'
import { Paratii } from 'paratii-js/dist/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)

const paratii = new Paratii(paratiiConfig)

module.exports = async (req: $Request, res: $Response) => {
  // $FlowFixMe
  const route = req.route.path

  if (process.env.NODE_ENV === 'development' && route === '/play/:id') {
    // FIXME: this a way just for passing test
    // this can be removed once we have paratii-db running on circleci
    res.send(
      `
      <!DOCTYPE html>
      <html>
        <head>

        </head>
        <body>
          <div id="root"></div>
          <script type="text/javascript" src="/bundle.js"></script>
        </body>
      </html>
    `
    )
  }
  const { id } = req.params
  const video = await paratii.core.vids.get(id)
  // TODO: reaise a 404 at this point

  if (!video) {
    throw new Error(`No video was found with this id: ${id}`)
  }

  console.log(video)
  // TODO: we need a way to get the ipfs hash of a thumbnail. These should be saved inparatii-db
  const ipfsHash = video.ipfsHash
  const thumbName = video.transcodingStatus.data.result.screenshots[0]
  const thumbnailUrl =
    'https://gateway.paratii.video/ipfs/' + ipfsHash + '/' + thumbName

  const url = `https://portal.paratii.video/play/${id}`
  const embedUrl = `https://portal.paratii.video/embed/${id}`
  const height = `1080`
  const width = `1920`
  // this needs to be the has of a video - just as the thumbnail, we need to save these data from paratii-db
  // FIXME: this must be ipfsHashOrig
  const ipfsSource = `https://gateway.paratii.video/ipfs/` + video.ipfsHashOrig
  let script = ''

  switch (route) {
    case '/embed/:id':
      script = '<script type="text/javascript" src="/embed/bundle.js"></script>'
      break
    case '/play/:id':
      script = '<script type="text/javascript" src="/bundle.js"></script>'
      break
  }

  res.send(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${video.title}</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/embed/index.css">
        <meta name="description" content="${video.description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta property="twitter:card" content="player" />
        <meta property="twitter:title" content="${video.title}" />
        <meta property="twitter:site" content="${url}">
        <meta property="twitter:player:width" content="490" />
        <meta property="twitter:player:height" content="280" />
        <meta property="twitter:image" content="${thumbnailUrl}" />
        <meta property="twitter:player:stream" content="${ipfsSource}" />
        <meta property="twitter:player" content="${embedUrl}" />
        <meta property="og:video:url" content="${embedUrl}">
        <meta property="og:video:secure_url" content="${embedUrl}">
        <meta property="og:video:type" content="text/html">
        <meta property="og:video:width" content="${width}" />
        <meta property="og:video:height" content="${height}" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="${embedUrl}" />
        <meta property="og:title" content="${video.title}" />
        <meta property="og:image" content="${thumbnailUrl}" />
        <meta property="og:description" content="${video.description}" />


        <style>
  
        </style>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
          <span class="main-loader"></span>
        </div>
        ${script}
      </body>
    </html>
  `
  )
}
