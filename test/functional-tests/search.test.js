const [
  SCIENCE_VIDEO,
  ,
  DEVCON_VIDEO,
  ETHEREUM_VIDEO,
  SPORTS_VIDEO_1,
  SPORTS_VIDEO_2,
  SPORTS_VIDEO_3,
  SPORTS_VIDEO_4,
  SPORTS_VIDEO_5,
  SPORTS_VIDEO_6,
  SPORTS_VIDEO_7,
  SPORTS_VIDEO_8,
  SPORTS_VIDEO_9,
  SPORTS_VIDEO_10,
  SPORTS_VIDEO_11,
  SPORTS_VIDEO_12,
  SPORTS_VIDEO_13,
  SPORTS_VIDEO_14
] = require('./data/fixtures/videos')

describe.only('🔍 Search:', () => {
  const navigateToSearch = () => browser.url('http://localhost:8080/search')
  const searchResultsWrapperSelector = '[data-test-id="search-results"]'
  const enterKeywordsZeroStateSelector = `${searchResultsWrapperSelector} [data-test-id="enter-keywords-zero-state"]`
  const noResultsZeroStateSelector = `${searchResultsWrapperSelector} [data-test-id="no-results-zero-state"]`
  const searchNavFormSelector = '[data-test-id="search-nav-form"]'
  const searchNavInputSelector = `${searchNavFormSelector} [data-test-id="search-nav-input"]`
  const searchResultSelector = '[data-test-id="search-result"]'
  const searchResultThumbnailSelector = `${searchResultSelector} [data-test-id="search-result-thumbnail"]`
  const searchResultDurationSelector = `${searchResultSelector} [data-test-id="search-result-duration"]`
  const searchResultTitleSelector = `${searchResultSelector} [data-test-id="search-result-title"]`
  const searchResultAuthorSelector = `${searchResultSelector} [data-test-id="search-result-author"]`
  const searchResultDescriptionSelector = `${searchResultSelector} [data-test-id="search-result-description"]`
  const moreResultsButtonSelector = '[data-test-id="more-results-button"]'

  before(async () => {
    browser.addCommand('waitUntilIsOnSearchRoute', ({ query = '' } = {}) => {
      browser.waitUntil(
        () =>
          browser.execute(() => window.location.pathname === '/search').value,
        2000,
        'Could not confirm that browser is at the search route'
      )
    })

    browser.addCommand(
      'waitUntilNoResultsZeroStateIsVisible',
      ({ query = '' } = {}) => {
        browser.waitForVisible(noResultsZeroStateSelector)
        browser.waitUntil(
          () =>
            browser.getText(noResultsZeroStateSelector) ===
            `No results found for "${query}"`,
          2000,
          'No results zero state text is incorrect'
        )
      }
    )

    browser.addCommand('validateSearchResults', ({ results }) =>
      browser.waitUntil(
        () =>
          browser.execute(
            (
              searchResultSelector,
              searchResultThumbnailSelector,
              searchResultDurationSelector,
              searchResultTitleSelector,
              searchResultAuthorSelector,
              searchResultDescriptionSelector,
              results
            ) => {
              const resultsData = JSON.parse(results)
              const searchResults = document.querySelectorAll(
                searchResultSelector
              )

              if (searchResults.length !== resultsData.length) {
                return false
              }

              for (let i = 0; i < searchResults.length; i++) {
                const searchResult = searchResults[i]

                const thumbnailEl = searchResult.querySelector(
                  searchResultThumbnailSelector
                )
                const thumbnailOk =
                  thumbnailEl.getAttribute('src') ===
                  `https://gateway.paratii.video/ipfs/${
                    resultsData[i].ipfsHash
                  }/${resultsData[i].thumbnails[0]}`

                const durationEl = searchResult.querySelector(
                  searchResultDurationSelector
                )
                const durationOk =
                  durationEl.textContent === resultsData[i].duration

                const titleEl = searchResult.querySelector(
                  searchResultTitleSelector
                )
                const titleOk = titleEl.textContent === resultsData[i].title

                const authorEl = searchResult.querySelector(
                  searchResultAuthorSelector
                )
                const authorOk = (authorEl.textContent = resultsData[i].author)

                const descriptionEl = searchResult.querySelector(
                  searchResultDescriptionSelector
                )
                const descriptionOk =
                  descriptionEl.textContent === resultsData[i].description

                if (
                  !thumbnailOk ||
                  !durationOk ||
                  !titleOk ||
                  !descriptionOk ||
                  !authorOk
                ) {
                  return false
                }
              }

              return true
            },
            searchResultSelector,
            searchResultThumbnailSelector,
            searchResultDurationSelector,
            searchResultTitleSelector,
            searchResultAuthorSelector,
            searchResultDescriptionSelector,
            JSON.stringify(results)
          ).value,
        undefined,
        'Could not verify that search results were rendered correctly'
      )
    )
  })

  it('should show placeholder text when arriving at the /search route', () => {
    navigateToSearch()

    browser.waitForVisible(enterKeywordsZeroStateSelector)
    expect(browser.getText(enterKeywordsZeroStateSelector)).to.equal(
      'Enter some keywords above to search!'
    )
  })

  it('should navigate to the /search route after searching on another page and render no results', () => {
    const query = 'doesnotexist'

    browser.url('http://localhost:8080')

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    browser.waitUntilIsOnSearchRoute()

    browser.waitUntilNoResultsZeroStateIsVisible({ query })
  })

  it('should navigate to the /search route after searching on another page and render results', () => {
    const query = 'science'

    browser.url('http://localhost:8080')

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    browser.waitUntilIsOnSearchRoute()

    expect(browser.isVisible(enterKeywordsZeroStateSelector)).to.equal(false)
    expect(browser.isVisible(noResultsZeroStateSelector)).to.equal(false)

    browser.waitUntil(
      () =>
        browser.execute(
          searchResultSelector =>
            document.querySelectorAll(searchResultSelector).length === 2,
          searchResultSelector
        ).value,
      undefined,
      'Could not verify that two search results appeared'
    )
    browser.waitUntil(() => !browser.isVisible(moreResultsButtonSelector))
  })

  it('should render info about each search result', () => {
    const query = 'ethereum'

    navigateToSearch()

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    expect(browser.isVisible(enterKeywordsZeroStateSelector)).to.equal(false)
    expect(browser.isVisible(noResultsZeroStateSelector)).to.equal(false)

    browser.validateSearchResults({ results: [ETHEREUM_VIDEO, DEVCON_VIDEO] })
    browser.waitUntil(() => !browser.isVisible(moreResultsButtonSelector))
  })

  it('should render a default thumbnail url for a search result that is missing thumbnails', () => {
    const query = 'science'

    navigateToSearch()

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    expect(browser.isVisible(enterKeywordsZeroStateSelector)).to.equal(false)
    expect(browser.isVisible(noResultsZeroStateSelector)).to.equal(false)

    browser.waitUntil(
      () =>
        browser.execute(
          (searchResultSelector, searchResultThumbnailSelector) => {
            const searchResults = document.querySelectorAll(
              searchResultSelector
            )

            if (searchResults.length !== 2) {
              return false
            }

            const searchResult = searchResults[1]

            const thumbnailEl = searchResult.querySelector(
              searchResultThumbnailSelector
            )
            return (
              thumbnailEl.getAttribute('src') ===
              'https://paratii.video/public/images/paratii-src.png'
            )
          },
          searchResultSelector,
          searchResultThumbnailSelector
        ).value,
      undefined,
      'Could not verify that search results were rendered correctly'
    )
  })

  it("should take you to the video's page when a search result is clicked on", () => {
    const query = 'science'

    navigateToSearch()

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    browser.waitAndClick(searchResultSelector)
    browser.waitUntil(
      () =>
        browser.execute(
          videoId => window.location.pathname === `/play/${videoId}`,
          SCIENCE_VIDEO._id
        ).value
    )
  })

  it('should fetch additional search results when there are more results present', () => {
    const query = 'sports'

    browser.url('http://localhost:8080')

    browser.waitForEnabled(searchNavInputSelector)
    browser.setValue(searchNavInputSelector, query)
    browser.submitForm(searchNavFormSelector)

    browser.waitUntilIsOnSearchRoute()

    expect(browser.isVisible(enterKeywordsZeroStateSelector)).to.equal(false)
    expect(browser.isVisible(noResultsZeroStateSelector)).to.equal(false)

    browser.validateSearchResults({
      results: [
        SPORTS_VIDEO_1,
        SPORTS_VIDEO_2,
        SPORTS_VIDEO_3,
        SPORTS_VIDEO_4,
        SPORTS_VIDEO_5,
        SPORTS_VIDEO_6,
        SPORTS_VIDEO_7,
        SPORTS_VIDEO_8,
        SPORTS_VIDEO_9,
        SPORTS_VIDEO_10,
        SPORTS_VIDEO_11,
        SPORTS_VIDEO_12
      ]
    })

    const browserHeight = browser.execute(
      () => document.body.getBoundingClientRect().height
    ).value

    browser.scroll(0, browserHeight)

    browser.waitAndClick(moreResultsButtonSelector)

    browser.validateSearchResults({
      results: [
        SPORTS_VIDEO_1,
        SPORTS_VIDEO_2,
        SPORTS_VIDEO_3,
        SPORTS_VIDEO_4,
        SPORTS_VIDEO_5,
        SPORTS_VIDEO_6,
        SPORTS_VIDEO_7,
        SPORTS_VIDEO_8,
        SPORTS_VIDEO_9,
        SPORTS_VIDEO_10,
        SPORTS_VIDEO_11,
        SPORTS_VIDEO_12,
        SPORTS_VIDEO_13,
        SPORTS_VIDEO_14
      ]
    })

    browser.waitUntil(() => !browser.isVisible(moreResultsButtonSelector))
  })
})
