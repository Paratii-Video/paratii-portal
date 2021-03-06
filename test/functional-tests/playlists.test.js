/* eslint-disable */
//
// Note for devs: WORK IN PROGRESS
// https://github.com/Paratii-Video/paratii-portal/issues/28
//
//
// MIGRATING FROM paratii-player/tests/
//
//
//
//
//
//
//
//
//
//
//
//
import {
  assertUserIsLoggedIn,
  createVideo,
  createUserAndLogin,
  getEthAccountFromApp
} from './test-utils/helpers.js'
import { assert } from 'chai'

function createPlaylist() {
  const playlist = {
    id: '98765',
    title: 'Around the block IPFS',
    description: 'A super playlist about blockchain!',
    url: 'around-the-block',
    videos: ['12345']
  }
  Meteor.call('playlists.create', playlist)
}

function fakeVideoUnlock(address) {
  // TODO: this function need to call the Contract instead of insert the transactin in Mongo
  // const transaction = {
  //   from: address,
  //   _id: '5000',s
  //   videoid: '12345',
  //   blockNumber: 1
  // }
  // const { Transactions } = require('/imports/api/transactions')
  // Transactions.insert(transaction)
}

describe('Price tag status', function() {
  it.skip('when the video has no price', () => {
    createUserAndLogin(browser)
    server.execute(createVideo, '12345', 'Test 1', '', '', [''], 0)
    server.execute(createPlaylist)
    browser.waitUntilRequestHasStatus(
      'http://localhost:3000/playlists/98765',
      200
    )
    browser.url('http:localhost:3000/playlists/98765')
    browser.waitForExist('.thumbs-list-item')

    // .videoCardPrice should not exists
    const priceTag = browser.waitForExist('.thumbs-list-price', null, true)
    assert.isTrue(priceTag)
  })

  it.skip("when the video has a price  and wasn't bought", () => {
    createUserAndLogin(browser)
    assertUserIsLoggedIn(browser)
    server.execute(createVideo, '12345', 'Test 1', '', '', [''], 10)
    server.execute(createPlaylist)
    browser.waitUntilRequestHasStatus(
      'http://localhost:3000/playlists/98765',
      200
    )
    browser.url('http:localhost:3000/playlists/98765')
    browser.waitForExist('.thumbs-list-item')
    browser.moveToObject('.thumbs-list-item')
    browser.waitUntil(function() {
      return browser.getText('.thumbs-list-price') === '10 PTI'
    })
  })

  it.skip('when the video was bought', () => {
    createUserAndLogin(browser)
    browser.pause(5000)
    const address = getEthAccountFromApp()
    server.execute(createVideo, '12345', 'Test 1', '', '', [''], 10)
    server.execute(createPlaylist)
    server.execute(fakeVideoUnlock, address)
    browser.waitUntilRequestHasStatus(
      'http://localhost:3000/playlists/98765',
      200
    )
    browser.url('http:localhost:3000/playlists/98765')
    browser.waitForExist('.thumbs-list-item')
  })
})
