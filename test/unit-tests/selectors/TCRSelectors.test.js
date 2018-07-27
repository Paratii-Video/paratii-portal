// /* @flow */
//
// import { expect } from 'chai'
//
// import mockGetState from 'unit-tests/test-utils/mockGetState'
//
// import { REQUEST_STATUS } from 'constants/ApplicationConstants'
// import SearchRecord from 'records/SearchRecords'
// import * as TCRSelectors from 'selectors/TCRSelectors'
//
// describe('TCR Selectors', () => {
//   describe('getTcrState', () => {
//     it('should return true if the search results request status is pending', () => {
//       expect(
//         TCRSelectors.getSearchResultsLoading(
//           mockGetState({
//             search: new SearchRecord({
//               searchRequestStatus: REQUEST_STATUS.PENDING
//             })
//           })()
//         )
//       ).to.equal(true)
//     })
//   })
// })
