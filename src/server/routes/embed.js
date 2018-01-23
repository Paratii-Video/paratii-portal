/* @flow */

import type { $Request, $Response } from 'express'

module.exports = (req: $Request, res: $Response) => {
  const { id } = req.params
  const title = 'Great title'
  const description = 'Cool video, please watch it.'
  const thumbnailUrl = 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png'
  const url = `https://portal.paratii.video/play/${id}`

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="/embed/index.css">
        <meta name="og:title" content="${title}"/>
        <meta name="og:image" content="${thumbnailUrl}"/>
        <meta name="og:description" content="${description}"/>
        <meta name="og:url" content="${url}"/>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/javascript" src="/embed/bundle.js"></script>
      </body>
    </html>
  `)
}
