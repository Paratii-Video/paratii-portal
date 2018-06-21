/* @flow */

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { paratii, address } from './test-utils/helpers'

// declare var browser: Object

chai.use(chaiAsPromised)

describe('TCR:', function () {
  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    // browser.execute(nukeLocalStorage)
    // browser.execute(nukeSessionStorage)
  })

  it('you can challenge a publish video @watch', async function () {
    // Create a publish video
    const videoid = 'tcrtest'
    await paratii.vids.create({
      id: videoid,
      owner: address,
      title: 'Paratii Test Video',
      ipfsHash: 'QmQP5SJzEBKy1uAGASDfEPqeFJ3HUbEp4eZzxvTLdZZYwB'
    })

    await browser.url(`http://localhost:8080/play/${videoid}`)
  })
})
