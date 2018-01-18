module.exports = (req, res) => {
  const { id } = req.params

  res.render('video', {
    id,
    title: 'Great title',
    description: 'cool video, watch it.',
    thumbnailUrl: 'http://paratii.video/imagens/cropped-logo_colorido_horizontal.png',
    url: `https://portal.paratii.video/play/${id}`
  })
}
