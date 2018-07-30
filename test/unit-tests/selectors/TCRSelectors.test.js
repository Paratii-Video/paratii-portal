// /* @flow */
//
// import { Map } from 'immutable'
// import { expect } from 'chai'
//
// import mockGetState from 'unit-tests/test-utils/mockGetState'
//
// import { REQUEST_STATUS } from 'constants/ApplicationConstants'
// import SearchRecord from 'records/SearchRecords'
// import Player from 'records/PlayerRecords'
// import * as TCRSelectors from 'selectors/TCRSelectors'
//
// import { Video, VoteStatusRecord } from 'records/VideoRecords'
//
// import * as PlayerSelectors from 'selectors/PlayerSelectors'
// //
// const defaultVideosMap = Map({
//   '987': new Video({
//     voteStatus: new VoteStatusRecord({
//       name: 'xxx',
//       data2: {
//         numTokens: 12445
//       }
//     })
//   })
// })
//
// describe('TCR Selectors', () => {
//   describe('getVoteStatusRecord', () => {
//     it('should return the vote status record', () => {
//       expect(
//         TCRSelectors.getVoteStatusRecord(
//           mockGetState({
//             player: new Player({
//               currentTimeSeconds: 120,
//               selectedVideoId: '987'
//             }),
//             videos: defaultVideosMap
//           })()
//         )
//       ).to.equal(true)
//     })
//   })
// })
