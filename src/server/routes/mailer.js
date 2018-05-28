const { getParatiiConfig, getAppRootUrl } = require('utils/AppUtils')
const { Paratii } = require('paratii-js')
const paratiiConfig = getParatiiConfig(process.env.NODE_ENV, 'server')
const paratii = new Paratii(paratiiConfig)

const querystring = require('querystring')

const {
  sendMail,
  generateVoucher,
  claimVoucher
} = require('../../scripts/mailer')

module.exports = {
  // send mail url looks like this
  // http://localhost:8080/mail/send?toETH=0xCbe4f07b343171ac37055B25a5266f48f6945b7d&to=jellegerbrandy@gmail.com
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
  },

  sendVerificationEmail: (req, res, next) => {
    const amount = paratii.eth.web3.utils.toWei('25')
    const reason = 'email_verification'
    generateVoucher(req.query.toETH, amount, reason)
      .then(result => {
        console.log(result)
        const obj = {
          toETH: req.query.toETH,
          amount: amount.toString(),
          reason: reason.toString(),
          salt: result.salt,
          v: result.signature.v,
          r: result.signature.r,
          s: result.signature.s
        }

        const url = `${getAppRootUrl(
          process.env.NODE_ENV
        )}/verify?${querystring.stringify(obj)}`
        console.log(url)

        sendMail(
          req.query.to,
          'Verify your Paratii Account',
          'Thank you for registering at Paratii! Click the link below to confirm your e-mail and earn 25 PTI, enough to upload 5 videos.' +
            '\n\n' +
            `${url.replace(/ /g, '')}`,
          '<p>' +
            'Thank you for registering at Paratii! Click the link below to confirm your e-mail and earn 25 PTI, enough to upload 5 videos.' +
            '</p>' +
            '\n\n' +
            `<p><a href="${url}">confirm your e-mail</a></p>`,
          (err, info) => {
            if (err) {
              res.send(err)
            } else {
              if (info && info.accepted && info.accepted.length > 0) {
                res.send(info.response)
              } else {
                res.statusCode(500).send(info)
              }
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
      req.query.toETH,
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
        if (tx && tx.events) {
          console.log('LogDistribute: ', tx.events.LogDistribute)
        }
        res.setHeader('Content-Type', 'application/json')
        res.send(tx)
      })
      .catch(e => {
        console.log('e:', e)
        res.send({ error: e.message })
      })
  }
}
