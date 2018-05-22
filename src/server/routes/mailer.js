const querystring = require('querystring')

const {
  sendMail,
  generateVoucher,
  claimVoucher
} = require('../../scripts/mailer')

const { getAppRootUrl } = require('../../scripts/utils/AppUtils')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
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
        const obj = {
          toETH: req.query.toETH,
          amount: amount.toString(),
          reason: reason.toString(),
          salt: result.salt,
          hash: result.hash,
          v: result.signature.v,
          r: result.signature.r,
          s: result.signature.s
        }

        const url = `${getAppRootUrl(
          process.env.NODE_ENV
        )}/verify?${querystring.stringify(obj)}`

        // const url =
        // `${getAppRootUrl(process.env.NODE_ENV)}/verify?toETH=${req.query.toETH}&
        // amount=${amount}&
        // reason=${reason}&
        // salt=${result.salt}&
        // hash=${result.hash}&
        // v=${result.signature.v}&
        // r=${result.signature.r}&
        // s=${result.signature.s}`

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
        if (tx.events.LogDistribute) {
          res.send(
            `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Verify</title>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
                <link rel="stylesheet" type="text/css" href="/embed/index.css">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
              </head>
              <body>
                <noscript>
                  You need to enable JavaScript to run this app.
                </noscript>
                <div id="root">
                  <span class="app-loader paratii-loader" style="width: 50px; height: 50px;"></span>
                </div>
                <script type="text/javascript" src="/bundle.js"></script>
              </body>
            </html>
          `
          )
        }
      })
      .catch(e => {
        console.log('e:', e)
        res.send('errore')
      })
  }
}
