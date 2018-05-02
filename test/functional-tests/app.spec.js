describe('Portal application', () => {
  describe('Page title', function () {
    it('should be Paratii', () => {
      browser.url('http://localhost:8080')
      browser.waitUntil(() => {
        return browser.getTitle() === 'Paratii'
      })
    })
  })
  // describe('Nav bar', () => {
  //   it("should render the user's PTI balance", () => {
  //     browser.url('http://localhost:8080')
  //     browser.waitUntil(() =>
  //       browser.getText('[data-test-id="nav-pti-balance"]').includes('PTI')
  //     )
  //   })
  // })
})
