/* @flow */

import { expect } from 'chai'

import mockGetState from 'unit-tests/test-utils/mockGetState'

import { REQUEST_STATUS } from 'constants/ApplicationConstants'
import SearchRecord from 'records/SearchRecords'
import * as SearchSelectors from 'selectors/SearchSelectors'

describe('Search Selectors', () => {
  describe('getSearchResultsLoading', () => {
    it('should return true if the search results request status is pending', () => {
      expect(
        SearchSelectors.getSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              searchRequestStatus: REQUEST_STATUS.PENDING
            })
          })()
        )
      ).to.equal(true)
    })

    it('should return false if the search results request status is not started', () => {
      expect(
        SearchSelectors.getSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              searchRequestStatus: REQUEST_STATUS.NOT_STARTED
            })
          })()
        )
      ).to.equal(false)
    })

    it('should return false if the search results request status is failed', () => {
      expect(
        SearchSelectors.getSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              searchRequestStatus: REQUEST_STATUS.FAILED
            })
          })()
        )
      ).to.equal(false)
    })

    it('should return false if the search results request status is succeeded', () => {
      expect(
        SearchSelectors.getSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              searchRequestStatus: REQUEST_STATUS.SUCCEEDED
            })
          })()
        )
      ).to.equal(false)
    })
  })

  describe('getAdditionalSearchResultsLoading', () => {
    it('should return true if the search results request status is pending', () => {
      expect(
        SearchSelectors.getAdditionalSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              additionalSearchRequestStatus: REQUEST_STATUS.PENDING
            })
          })()
        )
      ).to.equal(true)
    })

    it('should return false if the search results request status is not started', () => {
      expect(
        SearchSelectors.getAdditionalSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              additionalSearchRequestStatus: REQUEST_STATUS.NOT_STARTED
            })
          })()
        )
      ).to.equal(false)
    })

    it('should return false if the search results request status is failed', () => {
      expect(
        SearchSelectors.getAdditionalSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              additionalSearchRequestStatus: REQUEST_STATUS.FAILED
            })
          })()
        )
      ).to.equal(false)
    })

    it('should return false if the search results request status is succeeded', () => {
      expect(
        SearchSelectors.getAdditionalSearchResultsLoading(
          mockGetState({
            search: new SearchRecord({
              additionalSearchRequestStatus: REQUEST_STATUS.SUCCEEDED
            })
          })()
        )
      ).to.equal(false)
    })
  })
})
