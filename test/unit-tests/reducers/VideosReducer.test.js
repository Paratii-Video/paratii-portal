import Immutable from 'immutable'
import { createStore } from 'redux'

import {
  UPLOAD_REQUESTED,
  UPLOAD_PROGRESS,
  UPLOAD_LOCAL_SUCCESS
} from 'constants/ActionConstants'
import AsyncTaskStatusRecord from 'records/AsyncTaskStatusRecord'
import VideoRecord from 'records/VideoRecords'
import reducer from 'reducers/VideosReducer'

describe('Videos Reducer', () => {
  describe('upload requested', () => {
    it('should do nothing if there are no videos in the store', () => {
      const store = createStore(reducer, Immutable.Map())
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: 'foo',
          filename: 'baz.mp4'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({})
    })
    it('should do nothing if there is no video in the store with a matching id', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          baz: new VideoRecord({}),
          bee: new VideoRecord({})
        })
      )
      const originalStoreOutput = store.getState().toJS()
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: 'foo',
          filename: 'baz.mp4'
        }
      })
      expect(store.getState().toJS()).to.deep.equal(originalStoreOutput)
    })
    it('should update the matching video (based on id) appropriately', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          baz: new VideoRecord({}),
          foo: new VideoRecord({}),
          bee: new VideoRecord({})
        })
      )
      const originalStoreOutput = store.getState().toJS()
      store.dispatch({
        type: UPLOAD_REQUESTED,
        payload: {
          id: 'foo',
          filename: 'baz.mp4'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        ...originalStoreOutput,
        foo: {
          ...originalStoreOutput.foo,
          filename: 'baz.mp4',
          uploadStatus: {
            name: 'running',
            data: {
              progress: 0
            }
          }
        }
      })
    })
  })
  describe('upload progress', () => {
    it('should throw an error if there are no videos in the store', () => {
      const store = createStore(reducer, Immutable.Map())
      expect(() =>
        store.dispatch({
          type: UPLOAD_PROGRESS,
          payload: {
            id: 'foo',
            progress: 1
          }
        })
      ).to.throw()
    })
    it('should throw an error if there is no matching video id found', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          foo: new VideoRecord({})
        })
      )
      expect(() =>
        store.dispatch({
          type: UPLOAD_PROGRESS,
          payload: {
            id: 'baz',
            progress: 1
          }
        })
      ).to.throw()
    })
    it('should update the matching video (based on id) appropriately', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          baz: new VideoRecord({}),
          bee: new VideoRecord({}),
          foo: new VideoRecord({
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new Immutable.Map({
                progress: 12,
                baz: 'foobaz'
              })
            })
          })
        })
      )
      expect(
        store.getState().getIn(['foo', 'uploadStatus', 'data', 'progress'])
      ).to.equal(12)
      const originalStoreOutput = store.getState().toJS()
      store.dispatch({
        type: UPLOAD_PROGRESS,
        payload: {
          id: 'foo',
          progress: 99
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        ...originalStoreOutput,
        foo: {
          ...originalStoreOutput.foo,
          uploadStatus: {
            name: 'running',
            data: {
              progress: 99,
              baz: 'foobaz'
            }
          }
        }
      })
    })
  })
  describe('upload local success', () => {
    it('should throw an error if there are no videos in the store', () => {
      const store = createStore(reducer, Immutable.Map())
      expect(() =>
        store.dispatch({
          type: UPLOAD_LOCAL_SUCCESS,
          payload: {
            id: 'foo',
            progress: 1
          }
        })
      ).to.throw()
    })
    it('should throw an error if there is no matching video id found', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          foo: new VideoRecord({})
        })
      )
      expect(() =>
        store.dispatch({
          type: UPLOAD_LOCAL_SUCCESS,
          payload: {
            id: 'baz',
            progress: 1
          }
        })
      ).to.throw()
    })
    it('should update the matching video (based on id) appropriately', () => {
      const store = createStore(
        reducer,
        Immutable.Map({
          baz: new VideoRecord({}),
          bee: new VideoRecord({}),
          foo: new VideoRecord({
            uploadStatus: new AsyncTaskStatusRecord({
              name: 'running',
              data: new Immutable.Map({
                progress: 12,
                baz: 'foobaz'
              })
            }),
            price: 5
          })
        })
      )
      expect(
        store.getState().getIn(['foo', 'uploadStatus', 'data', 'progress'])
      ).to.equal(12)
      const originalStoreOutput = store.getState().toJS()
      store.dispatch({
        type: UPLOAD_LOCAL_SUCCESS,
        payload: {
          id: 'foo',
          hash: 'Q;LFKJA;F092'
        }
      })
      expect(store.getState().toJS()).to.deep.equal({
        ...originalStoreOutput,
        foo: {
          ...originalStoreOutput.foo,
          ipfsHashOrig: 'Q;LFKJA;F092',
          uploadStatus: {
            name: 'uploaded to local node',
            data: {
              ipfsHashOrig: 'Q;LFKJA;F092'
            }
          },
          price: 5
        }
      })
    })
  })
})
