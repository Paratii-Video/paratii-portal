const {
  sendMail,
  generateVoucher,
  claimVoucher
} = require('../../scripts/mailer')

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
  },

  sendVerificationEmail: (req, res, next) => {
    const amount = 20
    const reason = 'email_verification'

    generateVoucher(amount, reason)
      .then(result => {
        console.log(result)
        const url = `https://staging.paratii.video/verify?
        amount=${amount}&
        reason=${reason}&
        salt=${result.salt}&
        hash=${result.hash}&
        v=${result.signature.v}&
        r=${result.signature.r}&
        s=${result.signature.s}`

        console.log('url: ', url)
        // res.send(url)
        sendMail(
          req.query.to,
          'Verify your Paratii Account',
          `hello, please click the following link to verify your account ${url.replace(
            / /g,
            ''
          )}`,
          `<p> hello, please click the link to verify <a href="${url}">${url}</a></p>`,
          (err, info) => {
            if (err) {
              res.send(err)
            } else {
              res.send(info)
            }
          }
        )
      })
      .catch(e => {
        console.error(e)
        res.send(e)
      })
  },

  handleVerifyLink: (req, res, next) => {
    claimVoucher(
      req.query.to,
      req.query.amount,
      req.query.reason,
      req.query.salt,
      req.query.hash,
      req.query.v,
      req.query.r,
      req.query.s
    )
      .then(tx => {
        console.log('got tx: ', tx)
        res.send(tx)
      })
      .catch(e => {
        console.log('e:', e)
        res.send(e)
      })
  }
}
