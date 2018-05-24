'use strict'
const { Paratii } = require('paratii-js')
const nodemailer = require('nodemailer')
const { getParatiiConfig } = require('./utils/AppUtils.js')

const config = getParatiiConfig(process.env.NODE_ENV, 'server')
const paratii = new Paratii(config)

var transporter

function getTransporter () {
  return new Promise((resolve, reject) => {
    if (transporter) {
      resolve(transporter)
    } else {
      if (!process.env.MAIL_URL) {
        nodemailer.createTestAccount((err, account) => {
          if (err) {
            return reject(err)
          }
          transporter = nodemailer.createTransport({
            host: 'stmp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: account.user,
              pass: account.pass
            }
          })

          resolve(transporter)
        })
      } else {
        transporter = nodemailer.createTransport(process.env.MAIL_URL)
        resolve(transporter)
      }
    }
  })
}

module.exports = {
  sendMail: (to, subject, text, html, cb) => {
    getTransporter().then(transporter => {
      const mailOptions = {
        from: 'Paratii Video <we@paratii.video>',
        to: to,
        subject: subject,
        text: text,
        html: html
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return cb(err)
        return cb(null, info)
      })
    })
  },

  generateVoucher: async function (amount, reason) {
    const salt = paratii.eth.web3.utils.randomHex(32)
    const signature = await paratii.eth.distributor.generateSignature(
      amount,
      salt,
      reason,
      paratii.eth.getAccount()
    )

    return { salt, signature }
  },

  claimVoucher: async function (toAddress, amount, reason, salt, hash, v, r, s) {
    const opts = {
      address: toAddress,
      amount: amount,
      salt: salt,
      reason: reason,
      v: v,
      r: r,
      s: s
    }

    const tx = await paratii.eth.distributor.distribute(opts)
    return tx
  }
}
