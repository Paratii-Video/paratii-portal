describe('Page title', function () {
  it('should be Paratii', function () {
    browser.url('http://localhost:8080')
    browser.waitUntil(() => {
      return browser.getTitle() === 'Paratii'
    })
  })
})
