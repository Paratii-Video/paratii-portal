describe('Page title', function () {
  it('should be Paratii', function () {
    browser.url('http://localhost:8080')
    expect(browser.getTitle()).toEqual('Paratii')
  })
})
