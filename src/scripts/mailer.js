'use strict'
const env = process.env.NODE_ENV || 'development'
const path = require('path')

const { Paratii } = require('paratii-js')
const nodemailer = require('nodemailer')
// const ethUtil = require('ethereumjs-util')

const configFilename = path.join(__dirname, `/../../config/${env}.json`)
const config = require(configFilename)

if (env === 'development') {
  const registryFilename = require('/tmp/registry.json')
  const registryAddress = registryFilename.registryAddress
  config.eth.registryAddress = registryAddress
  console.log('#########################REGISTRY', registryAddress)
}
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
// -----------------------------------------------------------------------------

module.exports = {
  sendMail: (to, subject, text, html, cb) => {
    getTransporter().then(transporter => {
      const mailOptions = {
        from: 'Paratii Video <ya7yaz@paratii.video>',
        to: to,
        subject: subject,
        text: text,
        html: html
      }
      // console.log(config)
      // console.log(env)

      // console.log('sending mail to ', to)

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return cb(err)
        return cb(null, info)
      })
    })
  },

  generateVoucher: async function (amount, reason) {
    // TODO
    // 1. hook up to web3
    // 2. generateRandomSalt
    // 3. sign it with key.
    // 4. create a url with signedNonce, amount, to, and signature.
    // 5. profit.
    const salt = paratii.eth.web3.utils.randomHex(32)
    const hash = paratii.eth.web3.utils.soliditySha3(
      amount,
      salt,
      String(reason)
    )
    // const signature = paratii.eth.web3.eth.sign(hash, paratii.eth.getAccount())
    const signature = await paratii.eth.distributor.generateSignature(
      amount,
      salt,
      reason,
      paratii.eth.getAccount()
    )

    return { salt, hash, signature }
  },

  claimVoucher: async function (toAddress, amount, reason, salt, hash, v, r, s) {
    // const ptiDistributor = await paratii.eth.getContract('PTIDistributor')
    // const signatureData = ethUtil.fromRpcSig(signature)
    console.log('claiming Voucher: ', toAddress)
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

    // const tx = await ptiDistributor.methods
    //   .distribute(
    //     toAddress,
    //     amount,
    //     salt,
    //     reason,
    //     signatureData.v,
    //     signatureData.r,
    //     signatureData.s
    //   )
    //   .send()

    return tx
  }
}
