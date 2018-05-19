import { Paratii } from 'paratii-js/dist/paratii'
import { getParatiiConfig } from 'utils/AppUtils'

const paratiiConfig = getParatiiConfig(process.env.NODE_ENV)
const paratii = new Paratii(paratiiConfig)
const registryAddress = paratii.eth.getRegistryAddress()
if (!registryAddress) {
  paratii.eth
    .deployContracts()
    .then(deployed => {
      console.log('contracts deployed2')
    })
    .catch(e => {
      throw e
    })
}

module.exports = {
  send: (req, res, next) => {
    // console.log(req)
    const dist = {}

    dist.address = req.query.toAddress
    dist.amount = req.query.amount
    dist.salt = req.query.salt
    dist.reason = req.query.reason
    dist.v = req.query.v
    dist.r = req.query.r
    dist.s = req.query.s

    paratii.eth.distributor
      .distribute(dist)
      .then(tx => {
        console.log('got tx: ', tx)
        res.send(tx)
      })
      .catch(e => {
        console.log('got e: ', e)
        res.send(e)
      })
  }
}
