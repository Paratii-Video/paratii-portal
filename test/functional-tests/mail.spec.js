import { nukeLocalStorage, nukeSessionStorage } from './test-utils/helpers'

describe('Mailer', function () {
  beforeEach(function () {
    browser.url(`http://localhost:8080`)
    browser.execute(nukeLocalStorage)
    browser.execute(nukeSessionStorage)
  })

  it('url should work', async function () {
    browser.url(`http://localhost:8080/mail/verify`)
  })
})
