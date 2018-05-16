'use strict'
const env = process.env.NODE_ENV || 'development'
const path = require('path')

const { Paratii } = require('paratii-js')
const nodemailer = require('nodemailer')
const ethUtil = require('ethereumjs-util')

const configFilename = path.join(__dirname, `/../../config/${env}.json`)
const config = require(configFilename)
const paratii = new Paratii(config)

const transporter = nodemailer.createTransport(process.env.MAIL_URL)

module.exports = {
  sendMail: (to, subject, text, html, cb) => {
    const mailOptions = {
      from: 'Yahya Paratii <ya7yaz@paratii.video>',
      to: to,
      subject: subject,
      text: text,
      html: html
    }

    console.log('sending mail to ', to)

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return cb(err)
      return cb(null, info)
    })
    // try {
    //   response = await transporter.sendMail(mailOptions)
    // } catch (e) {
    //   throw e
    // }
    //
    // return reponse
  },

  generateVoucher: (amount, reason) => {
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
    const signature = paratii.eth.web3.eth.sign(hash, paratii.eth.getAccount())

    return { salt, hash, signature }
  },

  claimVoucher: async function (
    toAddress,
    amount,
    reason,
    salt,
    hash,
    signature
  ) {
    const ptiDistributor = await paratii.eth.getContract('PTIDistributor')
    const signatureData = ethUtil.fromRpcSig(signature)
    const tx = await ptiDistributor.methods
      .distribute(
        toAddress,
        amount,
        salt,
        reason,
        signatureData.v,
        signatureData.r,
        signatureData.s
      )
      .send()

    return tx
  }
}
