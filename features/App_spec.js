describe('Page title @watch', function () {
  it('should be Paratii', function () {
    browser.url('http://localhost:8080')
    expect(browser.getTitle()).to.equal('Paratii')
  })
})
