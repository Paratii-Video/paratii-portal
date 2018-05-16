const { sendMail } = require('../../scripts/mailer')

module.exports = {
  send: (req, res, next) => {
    sendMail(
      req.query.to,
      req.query.subject,
      req.query.text,
      req.query.html,
      (err, info) => {
        if (err) {
          res.send(err)
        } else {
          res.send(info)
        }
      }
    )
    // .then((response) => {
    //   res.send(response)
    // }).catch((e) => {
    //   res.sendStatus(500).send(e)
    // })

    console.log(req.query)
  }
}
