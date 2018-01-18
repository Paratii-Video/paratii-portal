const React = require('react')
const { renderToString } = require('react-dom/server')
const Play = require('../../../components/Play')

module.exports = (req, res) => {
  const { id } = req.params
  const title = 'Great title'
  const description = 'Cool video, please watch it.'
  const thumbnailUrl = 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png'
  const url = `https://portal.paratii.video/play/${id}`

  res.write('<!DOCTYPE html>')
  res.write(`
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="/embed.css">
        <script src="/bundle.js"></script>
        <meta name="og:title" content="${title}"/>
        <meta name="og:image" content="${thumbnailUrl}"/>
        <meta name="og:description" content="${description}"/>
        <meta name="og:url" content="${url}"/>
      </head>
    <body>
  `)
  res.write(
    renderToString(
      <Play
        embed
        description={description}
        id={{
          params: { id }
        }}
        thumbnailUrl={thumbnailUrl}
        url={url}
      />
    )
  )
  res.write('</body>')
  res.end()
}
