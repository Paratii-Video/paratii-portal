/* @flow */

import type { $Request, $Response } from 'express'

import { Paratii } from 'paratii-lib/dist/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)

const paratii = new Paratii(paratiiConfig)

export default paratii

module.exports = (req: $Request, res: $Response) => {
  const { id } = req.params
  const video = paratii.core.vids.get(id)
  // TODO: reaise a 404 at this point
  if (!video) {
    throw new Error(`No video was found with this id: ${id}`)
  }
  // TODO: we need a way to get the ipfs hash of a thumbnail. These should be saved inparatii-db
  const thumbnailUrl =
    'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png'
  const url = `https://portal.paratii.video/play/${id}`
  const embedUrl = `https://portal.paratii.video/embed/${id}`
  const height = `1080`
  const width = `1920`
  // this needs to be the has of a video - just as the thumbnail, we need to save these data from paratii-db
  const ipfSource = `https://gateway.paratii.video/ipfs/QmSs64S5J8C9H6ZFYR44YGEB6pLq2SRLYe3MZdUoyNX7EH`

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${video.title}</title>
        <link rel="stylesheet" type="text/css" href="/embed/index.css">

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <meta property="twitter:card" content="player" />
        <meta property="twitter:title" content="${video.title}" />
        <meta property="twitter:site" content="${url}">
        <meta property="twitter:player:width" content="490" />
        <meta property="twitter:player:height" content="280" />
        <meta property="twitter:image" content="${thumbnailUrl}" />
        <meta property="twitter:player:stream" content="${ipfSource}" />
        <meta property="twitter:player" content="${embedUrl}" />
        <meta property="og:video:url" content="${ipfSource}" />
        <meta property="og:video:secure_url" content="${ipfSource}" />
        <meta property="og:video:type" content="video/mp4">
        <meta property="og:video:width" content="${width}" />
        <meta property="og:video:height" content="${height}" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="${url}" />
        <meta property="og:title" content="${video.title}" />
        <meta property="og:image" content="${thumbnailUrl}" />
        <meta property="og:description" content="${video.description}" />
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/embed/bundle.js"></script>
      </body>
    </html>
  `)
}
