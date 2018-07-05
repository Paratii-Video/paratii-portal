/**
 *  Use this script to send yourselve some PTI in the dev environament
 *  Usage:
 *      node dev/faucet.js
 *  The script will prompt you for the values
 *
 */
const { paratii, rl } = require('./paratii.js')

async function main () {
  const balance = await paratii.eth.balanceOf(
    paratii.config.account.address,
    'PTI'
  )
  console.log(
    `Balance of the main account is ${paratii.eth.web3.utils.fromWei(
      balance
    )} PTI (${balance})`
  )
  await rl.question(
    `How may PTI do you want to transfer (in PTI))? (choose 0 to cancel)`,
    async amount => {
      const amountInPTI = Number(amount)
      const amountInWei = paratii.eth.web3.utils.toWei(amount)
      console.log(amountInPTI)
      if (amountInPTI) {
        await rl.question(
          `Where do you want to send it? [provide an ETH address]`,
          async beneficiary => {
            console.log(
              `Now transfering ${amountInWei} (which is ${amountInPTI} PTI) to ${beneficiary}`
            )
            // await paratii.eth.transfer(contract.options.address, amount, 'PTI', 'Transfer to PTIDistributor contract')
            const tx = await paratii.eth.transfer(
              beneficiary,
              amountInWei,
              'PTI'
            )
            console.log(tx)
            console.log('Everything seems well; check your balance!')
            rl.close()
            process.exit()
          }
        )
      }
    }
  )
}

main().catch(console.error)
